/**
 * preprocess-gerbers.mjs
 * Build-time script: Extract RAR archives → Parse Gerber RS-274X + Excellon → Output optimized JSON
 *
 * This runs BEFORE the Astro build. The browser never parses raw Gerber files.
 * Output: public/pcb-data/{board-id}.json
 */

import { createExtractorFromFile } from 'node-unrar-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GERBER_DIR = path.join(ROOT, 'media', 'Gerbers');
const OUTPUT_DIR = path.join(ROOT, 'public', 'pcb-data');
const TEMP_DIR = path.join(ROOT, '.gerber-temp');

// ─── Board Definitions ───────────────────────────────────────────────
const BOARDS = [
  {
    id: 'back-box-2026',
    name: 'Back-Box ECU 2026',
    archive: 'Back_Box_2026.zip', // actually RAR v5
    prefix: 'Back_box_v1',
  },
  {
    id: 'front-box-2026',
    name: 'Front-Box ECU 2026',
    archive: 'Front_Box_2026.rar',
    prefix: 'FRONTBOXFINAL',
  },
  // ── Added from media/gerbers.zip ──
  { id: 'abaja-main-2025',      name: 'aBAJA 2025 Main PCB',      archive: 'aBAJA_Main_PCB_2025.rar' },
  { id: 'abaja-tbu-2025',       name: 'aBAJA 2025 TBU',           archive: 'aBAJA_TBU_2025.rar' },
  { id: 'abaja-ssu-2025',       name: 'aBAJA 2025 SSU',           archive: 'aBAJA_SSU_2025.rar' },
  { id: 'abaja-dashboard-2025', name: 'aBAJA 2025 Dashboard PCB', archive: 'aBAJA_Dashboard_2025.rar' },
  { id: 'rail-agent',           name: 'Rail-Agent PCB',           archive: 'Rail_Agent.rar' },
  { id: 'atbots-v4',            name: 'Atbots v4 PCB',            archive: 'Atbots_v4.zip' },
];

// Optional CLI filter: `node scripts/preprocess-gerbers.mjs rail-agent atbots-v4`
const ONLY = process.argv.slice(2);

// ─── Layer file mapping (KiCad naming convention) ────────────────────
const LAYER_MAP = {
  '-F_Cu.gtl':         'F.Cu',
  '-B_Cu.gbl':         'B.Cu',
  '-F_Mask.gts':       'F.Mask',
  '-B_Mask.gbs':       'B.Mask',
  '-F_Silkscreen.gto': 'F.Silkscreen',
  '-B_Silkscreen.gbo': 'B.Silkscreen',
  '-F_Paste.gtp':      'F.Paste',
  '-B_Paste.gbp':      'B.Paste',
  '-Edge_Cuts.gm1':    'Edge.Cuts',
  '-PTH.drl':          'PTH',
  '-NPTH.drl':         'NPTH',
};

// Extension-agnostic layer match (KiCad can export everything as .gbr)
const LAYER_STEMS = {
  '-F_Cu': 'F.Cu', '-B_Cu': 'B.Cu',
  '-F_Mask': 'F.Mask', '-B_Mask': 'B.Mask',
  '-F_Silkscreen': 'F.Silkscreen', '-B_Silkscreen': 'B.Silkscreen',
  '-F_Paste': 'F.Paste', '-B_Paste': 'B.Paste',
  '-Edge_Cuts': 'Edge.Cuts',
  '-PTH': 'PTH', '-NPTH': 'NPTH',
};

function matchLayer(fname) {
  const base = path.basename(fname);
  for (const [suffix, layerName] of Object.entries(LAYER_MAP)) {
    if (base.endsWith(suffix)) return layerName;
  }
  const stem = base.replace(/\.[^.]+$/, '');
  for (const [suffix, layerName] of Object.entries(LAYER_STEMS)) {
    if (stem.endsWith(suffix)) return layerName;
  }
  return null;
}

function listFilesRecursive(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(p));
    else out.push(p);
  }
  return out;
}

function isZipFile(p) {
  const fd = fs.openSync(p, 'r');
  const buf = Buffer.alloc(4);
  fs.readSync(fd, buf, 0, 4, 0);
  fs.closeSync(fd);
  return buf[0] === 0x50 && buf[1] === 0x4b; // 'PK'
}

// ═══════════════════════════════════════════════════════════════════════
// GERBER RS-274X PARSER
// ═══════════════════════════════════════════════════════════════════════

class GerberParser {
  constructor() {
    this.apertures = {};        // D-code → aperture definition
    this.apertureMacros = {};   // macro name → macro body (for RoundRect etc.)
    this.currentAperture = null;
    this.x = 0;
    this.y = 0;
    this.interpolation = 'linear'; // linear | cw | ccw
    this.polarity = 'dark';     // dark | clear
    this.regionMode = false;
    this.formatSpec = { xInt: 4, xDec: 6, yInt: 4, yDec: 6 };
    this.unit = 'mm';

    // Output
    this.draws = [];     // line segments / arcs
    this.flashes = [];   // pad flashes
    this.regions = [];   // filled regions (copper pours, etc.)
    this.currentRegion = null;
  }

  parse(content) {
    let inExtended = false;
    let extBuffer = '';
    let stdBuffer = '';

    for (let i = 0; i < content.length; i++) {
      const ch = content[i];

      if (ch === '%') {
        if (!inExtended) {
          inExtended = true;
          extBuffer = '';
        } else {
          inExtended = false;
          this._processExtended(extBuffer);
          extBuffer = '';
        }
      } else if (inExtended) {
        extBuffer += ch;
      } else {
        if (ch === '*') {
          const cmd = stdBuffer.trim();
          stdBuffer = '';
          if (cmd.length > 0) {
            this._processCommand(cmd);
          }
        } else if (ch !== '\r' && ch !== '\n') {
          stdBuffer += ch;
        }
      }
    }

    return {
      draws: this.draws,
      flashes: this.flashes,
      regions: this.regions,
      apertures: this.apertures,
    };
  }

  _processCommand(cmd) {
    // Strip any lingering % characters
    cmd = cmd.replace(/^%+/, '').replace(/%+$/, '').trim();
    if (!cmd) return;

    // G-codes
    if (cmd.startsWith('G04')) return; // Comment
    if (cmd === 'G01' || cmd.startsWith('G01')) {
      this.interpolation = 'linear';
      const rest = cmd.substring(3);
      if (rest.length > 0) this._processCoordCommand(rest);
      return;
    }
    if (cmd === 'G02' || cmd.startsWith('G02')) {
      this.interpolation = 'cw';
      const rest = cmd.substring(3);
      if (rest.length > 0) this._processCoordCommand(rest);
      return;
    }
    if (cmd === 'G03' || cmd.startsWith('G03')) {
      this.interpolation = 'ccw';
      const rest = cmd.substring(3);
      if (rest.length > 0) this._processCoordCommand(rest);
      return;
    }
    if (cmd === 'G36') {
      this.regionMode = true;
      this.currentRegion = [];
      return;
    }
    if (cmd === 'G37') {
      this.regionMode = false;
      if (this.currentRegion && this.currentRegion.length > 0) {
        this.regions.push({
          polarity: this.polarity,
          points: [...this.currentRegion],
        });
      }
      this.currentRegion = null;
      return;
    }
    if (cmd === 'G75') return; // Multi-quadrant mode (default for arcs)
    if (cmd === 'G74') return; // Single-quadrant mode

    // D-code select aperture
    const dSelect = cmd.match(/^D(\d+)$/);
    if (dSelect) {
      const dCode = parseInt(dSelect[1], 10);
      if (dCode >= 10) {
        this.currentAperture = dCode;
      }
      return;
    }

    // Coordinate commands with D-codes
    if (cmd.match(/^[XY]/i) || cmd.match(/^G0[123].*[XY]/i)) {
      this._processCoordCommand(cmd);
      return;
    }

    // M02 = end of file
    if (cmd === 'M02' || cmd === 'M00') return;
  }

  _processExtended(block) {
    // Sub-commands inside extended block are separated by *
    const parts = block.split('*').map(p => p.trim().replace(/^%+/, '').replace(/%+$/, '')).filter(p => p.length > 0);
    for (const part of parts) {
      this._processSingleExtended(part);
    }
  }

  _processSingleExtended(cmd) {
    // Format specification
    const fsMatch = cmd.match(/^FSLAX(\d)(\d)Y(\d)(\d)/);
    if (fsMatch) {
      this.formatSpec = {
        xInt: parseInt(fsMatch[1]),
        xDec: parseInt(fsMatch[2]),
        yInt: parseInt(fsMatch[3]),
        yDec: parseInt(fsMatch[4]),
      };
      return;
    }

    // Unit
    if (cmd === 'MOMM') { this.unit = 'mm'; return; }
    if (cmd === 'MOIN') { this.unit = 'in'; return; }

    // Polarity
    if (cmd === 'LPD') { this.polarity = 'dark'; return; }
    if (cmd === 'LPC') { this.polarity = 'clear'; return; }

    // Aperture macro definition
    const macroMatch = cmd.match(/^AM(\w+)/);
    if (macroMatch) {
      this.apertureMacros[macroMatch[1]] = cmd;
      return;
    }

    // Aperture definition
    const adMatch = cmd.match(/^ADD(\d+)(\w+),?(.*)$/);
    if (adMatch) {
      const dCode = parseInt(adMatch[1]);
      const type = adMatch[2];
      const params = adMatch[3] ? adMatch[3].split('X').map(Number) : [];
      this.apertures[dCode] = { type, params, dCode };
      return;
    }

    // TF/TA/TD/TO attributes - skip (metadata only)
    if (cmd.startsWith('TF.') || cmd.startsWith('TA.') || cmd.startsWith('TD') || cmd.startsWith('TO.')) return;
  }

  _processCoordCommand(cmd) {
    // Remove leading G01/G02/G03 if present
    let cleaned = cmd.replace(/^G0[123]/, '');

    // Parse X, Y, I, J coordinates and D-code
    const xMatch = cleaned.match(/X(-?\d+)/);
    const yMatch = cleaned.match(/Y(-?\d+)/);
    const iMatch = cleaned.match(/I(-?\d+)/);
    const jMatch = cleaned.match(/J(-?\d+)/);
    const dMatch = cleaned.match(/D0([123])$/);

    const newX = xMatch ? this._parseCoord(xMatch[1], 'x') : this.x;
    const newY = yMatch ? this._parseCoord(yMatch[1], 'y') : this.y;
    const iVal = iMatch ? this._parseCoord(iMatch[1], 'x') : 0;
    const jVal = jMatch ? this._parseCoord(jMatch[1], 'y') : 0;

    const dCode = dMatch ? parseInt(dMatch[1]) : null;

    if (dCode === 1) {
      // D01: Draw (interpolate from current to new position)
      if (this.regionMode && this.currentRegion) {
        if (this.currentRegion.length === 0) {
          this.currentRegion.push([this.x, this.y]);
        }
        this.currentRegion.push([newX, newY]);
      } else {
        this.draws.push({
          x1: this.x, y1: this.y,
          x2: newX, y2: newY,
          aperture: this.currentAperture,
          interpolation: this.interpolation,
          i: iVal, j: jVal,
          polarity: this.polarity,
        });
      }
      this.x = newX;
      this.y = newY;
    } else if (dCode === 2) {
      // D02: Move (no draw)
      if (this.regionMode && this.currentRegion && this.currentRegion.length > 0) {
        // Close current contour, start new one
        this.regions.push({
          polarity: this.polarity,
          points: [...this.currentRegion],
        });
        this.currentRegion = [[newX, newY]];
      }
      this.x = newX;
      this.y = newY;
    } else if (dCode === 3) {
      // D03: Flash
      this.x = newX;
      this.y = newY;
      this.flashes.push({
        x: newX, y: newY,
        aperture: this.currentAperture,
        polarity: this.polarity,
      });
    } else {
      // No explicit D-code — use current mode context
      if (this.regionMode && this.currentRegion) {
        if (this.currentRegion.length === 0) {
          this.currentRegion.push([this.x, this.y]);
        }
        this.currentRegion.push([newX, newY]);
      }
      this.x = newX;
      this.y = newY;
    }
  }

  _parseCoord(str, axis) {
    const dec = axis === 'x' ? this.formatSpec.xDec : this.formatSpec.yDec;
    return parseFloat(str) / Math.pow(10, dec);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// EXCELLON DRILL PARSER
// ═══════════════════════════════════════════════════════════════════════

class ExcellonParser {
  constructor() {
    this.tools = {};
    this.holes = [];
    this.currentTool = null;
    this.unit = 'mm';
    this.isHeader = true;
  }

  parse(content) {
    const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // Header commands
      if (line === 'M48') { this.isHeader = true; continue; }
      if (line === '%' || line === 'M95') { this.isHeader = false; continue; }
      if (line === 'M30' || line === 'M00') continue; // End of file
      if (line.startsWith(';')) continue; // Comment
      if (line === 'G90') continue; // Absolute mode (default)
      if (line === 'G05') continue; // Drill mode
      if (line === 'METRIC' || line === 'FMAT,2') {
        this.unit = 'mm';
        continue;
      }
      if (line === 'INCH') {
        this.unit = 'in';
        continue;
      }

      // Tool definition (in header)
      const toolDef = line.match(/^T(\d+)C([\d.]+)/);
      if (toolDef) {
        const toolNum = parseInt(toolDef[1]);
        let diameter = parseFloat(toolDef[2]);
        if (this.unit === 'in') diameter *= 25.4;
        this.tools[toolNum] = { diameter };
        continue;
      }

      // Tool select
      const toolSelect = line.match(/^T(\d+)$/);
      if (toolSelect) {
        this.currentTool = parseInt(toolSelect[1]);
        continue;
      }

      // Drill coordinate
      const coordMatch = line.match(/^X([-\d.]+)Y([-\d.]+)/);
      if (coordMatch && this.currentTool && this.tools[this.currentTool]) {
        let x = parseFloat(coordMatch[1]);
        let y = parseFloat(coordMatch[2]);
        if (this.unit === 'in') { x *= 25.4; y *= 25.4; }
        this.holes.push({
          x, y,
          diameter: this.tools[this.currentTool].diameter,
          tool: this.currentTool,
        });
      }
    }

    return this.holes;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// EDGE CUTS → BOARD OUTLINE
// ═══════════════════════════════════════════════════════════════════════

function extractBoardOutline(edgeCutsData) {
  // Edge cuts contain draw commands defining the board outline
  // For rectangular boards, there are 4 line segments
  const parser = new GerberParser();
  const result = parser.parse(edgeCutsData);

  // Collect all endpoints from draw commands
  const points = [];
  for (const draw of result.draws) {
    points.push([draw.x1, draw.y1]);
    points.push([draw.x2, draw.y2]);
  }

  if (points.length === 0) {
    return null;
  }

  // Find bounding box
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  // Build ordered outline polygon from draws
  const outline = [];
  const segments = result.draws.map(d => ({
    x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2
  }));

  if (segments.length > 0) {
    // Try to chain segments into ordered polygon
    outline.push([segments[0].x1, segments[0].y1]);
    outline.push([segments[0].x2, segments[0].y2]);
    const used = new Set([0]);

    for (let iter = 0; iter < segments.length; iter++) {
      const lastPt = outline[outline.length - 1];
      for (let i = 0; i < segments.length; i++) {
        if (used.has(i)) continue;
        const s = segments[i];
        const eps = 0.01; // 10 micron tolerance
        if (Math.abs(s.x1 - lastPt[0]) < eps && Math.abs(s.y1 - lastPt[1]) < eps) {
          outline.push([s.x2, s.y2]);
          used.add(i);
          break;
        }
        if (Math.abs(s.x2 - lastPt[0]) < eps && Math.abs(s.y2 - lastPt[1]) < eps) {
          outline.push([s.x1, s.y1]);
          used.add(i);
          break;
        }
      }
    }
  }

  return {
    minX, minY, maxX, maxY,
    width: maxX - minX,
    height: maxY - minY,
    outline: outline.length >= 3 ? outline : [
      [minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// GEOMETRY OPTIMIZER
// ═══════════════════════════════════════════════════════════════════════

/**
 * Reduce geometry data size for the browser.
 * Round coordinates to 3 decimal places (1 micron precision — more than enough for 3D vis).
 * Remove redundant fields.
 */
function optimizeLayerData(layerResult) {
  const r = (v) => Math.round(v * 1000) / 1000;

  const draws = layerResult.draws.map(d => ({
    x1: r(d.x1), y1: r(d.y1),
    x2: r(d.x2), y2: r(d.y2),
    a: d.aperture,       // aperture D-code (compact key)
    p: d.polarity === 'clear' ? 'c' : undefined,  // only store if clear
  })).filter(d => !(d.x1 === d.x2 && d.y1 === d.y2)); // skip zero-length

  const flashes = layerResult.flashes.map(f => ({
    x: r(f.x), y: r(f.y),
    a: f.aperture,
    p: f.polarity === 'clear' ? 'c' : undefined,
  }));

  const regions = layerResult.regions
    .filter(reg => reg.points.length >= 3)
    .map(reg => ({
      pts: reg.points.map(p => [r(p[0]), r(p[1])]),
      p: reg.polarity === 'clear' ? 'c' : undefined,
    }));

  // Compact aperture table
  const apertures = {};
  for (const [key, ap] of Object.entries(layerResult.apertures)) {
    apertures[key] = {
      t: ap.type === 'C' ? 'C' : ap.type === 'R' ? 'R' : ap.type === 'O' ? 'O' : ap.type,
      p: ap.params.map(v => r(v)),
    };
  }

  return { draws, flashes, regions, apertures };
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN PIPELINE
// ═══════════════════════════════════════════════════════════════════════

async function processBoard(boardDef) {
  console.log(`\n══════════════════════════════════════════════`);
  console.log(`  Processing: ${boardDef.name}`);
  console.log(`══════════════════════════════════════════════`);

  const archivePath = path.join(GERBER_DIR, boardDef.archive);
  if (!fs.existsSync(archivePath)) {
    console.error(`  ✗ Archive not found: ${archivePath}`);
    return null;
  }

  // Extract archive (RAR via node-unrar-js, real ZIP via system unzip)
  const extractDir = path.join(TEMP_DIR, boardDef.id);
  fs.mkdirSync(extractDir, { recursive: true });

  if (isZipFile(archivePath)) {
    execFileSync('unzip', ['-o', '-q', archivePath, '-d', extractDir]);
  } else {
    const extractor = await createExtractorFromFile({
      filepath: archivePath,
      targetPath: extractDir,
    });
    const { files } = extractor.extract();
    [...files]; // force iteration so files are written
  }
  const fileList = listFilesRecursive(extractDir);

  console.log(`  ✓ Extracted ${fileList.length} files`);

  // Map files to layers
  const layerFiles = {};
  for (const filePath of fileList) {
    const layerName = matchLayer(filePath);
    if (layerName) layerFiles[layerName] = filePath;
  }

  console.log(`  Layers found: ${Object.keys(layerFiles).join(', ')}`);

  // Parse Edge Cuts → Board outline (fallback derived later if empty)
  let outline = null;
  if (layerFiles['Edge.Cuts']) {
    const edgeCutsContent = fs.readFileSync(layerFiles['Edge.Cuts'], 'utf-8');
    outline = extractBoardOutline(edgeCutsContent);
  }
  if (outline) {
    console.log(`  ✓ Board outline: ${outline.width.toFixed(1)} × ${outline.height.toFixed(1)} mm`);
  } else {
    console.warn('  ⚠ Edge.Cuts empty/missing — will derive outline from geometry bounds');
  }

  // Parse each Gerber layer
  const layers = {};
  const gerberLayers = ['F.Cu', 'B.Cu', 'F.Mask', 'B.Mask', 'F.Silkscreen', 'B.Silkscreen', 'F.Paste', 'B.Paste'];
  const boundsPts = [];

  for (const layerName of gerberLayers) {
    if (!layerFiles[layerName]) continue;

    const content = fs.readFileSync(layerFiles[layerName], 'utf-8');
    const parser = new GerberParser();
    const result = parser.parse(content);
    layers[layerName] = optimizeLayerData(result);

    if (/Cu|Silkscreen/.test(layerName)) {
      for (const d of result.draws) boundsPts.push([d.x1, d.y1], [d.x2, d.y2]);
      for (const f of result.flashes) boundsPts.push([f.x, f.y]);
      for (const r of result.regions) boundsPts.push(...r.points);
    }

    const stats = `${result.draws.length} draws, ${result.flashes.length} flashes, ${result.regions.length} regions`;
    console.log(`  ✓ ${layerName}: ${stats}`);
  }

  // Parse drill files
  const drills = { pth: [], npth: [] };

  if (layerFiles['PTH']) {
    const content = fs.readFileSync(layerFiles['PTH'], 'utf-8');
    const parser = new ExcellonParser();
    drills.pth = parser.parse(content).map(h => ({
      x: Math.round(h.x * 1000) / 1000,
      y: Math.round(h.y * 1000) / 1000,
      d: Math.round(h.diameter * 1000) / 1000,
    }));
    console.log(`  ✓ PTH: ${drills.pth.length} holes`);
  }

  if (layerFiles['NPTH']) {
    const content = fs.readFileSync(layerFiles['NPTH'], 'utf-8');
    const parser = new ExcellonParser();
    drills.npth = parser.parse(content).map(h => ({
      x: Math.round(h.x * 1000) / 1000,
      y: Math.round(h.y * 1000) / 1000,
      d: Math.round(h.diameter * 1000) / 1000,
    }));
    console.log(`  ✓ NPTH: ${drills.npth.length} holes`);
  }

  let outlineDerived = false;
  if (!outline) {
    for (const h of [...drills.pth, ...drills.npth]) boundsPts.push([h.x - h.d, h.y - h.d], [h.x + h.d, h.y + h.d]);
    const pts = boundsPts.filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1]));
    if (pts.length === 0) {
      console.error('  ✗ No geometry to derive an outline from');
      return null;
    }
    const M = 2; // mm margin
    const minX = Math.min(...pts.map(p => p[0])) - M;
    const minY = Math.min(...pts.map(p => p[1])) - M;
    const maxX = Math.max(...pts.map(p => p[0])) + M;
    const maxY = Math.max(...pts.map(p => p[1])) + M;
    outline = {
      minX, minY, maxX, maxY,
      width: maxX - minX,
      height: maxY - minY,
      outline: [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]],
    };
    outlineDerived = true;
    console.log(`  ✓ Derived outline: ${outline.width.toFixed(1)} × ${outline.height.toFixed(1)} mm`);
  }

  // Determine layer count from available copper layers
  const copperLayers = Object.keys(layers).filter(l => l.endsWith('.Cu'));
  const layerCount = copperLayers.length;

  // Build output
  const boardData = {
    id: boardDef.id,
    name: boardDef.name,
    dimensions: {
      width: Math.round(outline.width * 100) / 100,
      height: Math.round(outline.height * 100) / 100,
    },
    origin: {
      x: Math.round(outline.minX * 100) / 100,
      y: Math.round(outline.minY * 100) / 100,
    },
    layerCount,
    boardThickness: 1.6,
    outline: outline.outline.map(p => [
      Math.round(p[0] * 1000) / 1000,
      Math.round(p[1] * 1000) / 1000,
    ]),
    layers,
    drills,
    ...(outlineDerived ? { outlineDerived: true } : {}),
  };

  return boardData;
}

async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  GERBER PREPROCESSING PIPELINE                   ║');
  console.log('║  Gerber RS-274X + Excellon → Optimized JSON       ║');
  console.log('╚══════════════════════════════════════════════════╝');

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  let successCount = 0;

  for (const board of BOARDS.filter(b => ONLY.length === 0 || ONLY.includes(b.id))) {
    try {
      const data = await processBoard(board);
      if (data) {
        const outPath = path.join(OUTPUT_DIR, `${board.id}.json`);
        const jsonStr = JSON.stringify(data);
        fs.writeFileSync(outPath, jsonStr);
        const sizeMB = (Buffer.byteLength(jsonStr) / (1024 * 1024)).toFixed(2);
        console.log(`  ✓ Written: ${outPath} (${sizeMB} MB)`);
        successCount++;
      }
    } catch (err) {
      console.error(`  ✗ Error processing ${board.name}:`, err.message);
    }
  }

  // Cleanup temp
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  console.log(`\n══════════════════════════════════════════════`);
  console.log(`  Done: ${successCount} boards processed`);
  console.log(`══════════════════════════════════════════════\n`);

  if (successCount === 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
