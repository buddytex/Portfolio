/**
 * gerberToGeometry.ts
 * Converts preprocessed Gerber JSON data into Three.js geometry.
 * This runs in the browser — it does NOT parse raw Gerber files.
 * It interprets the optimized JSON produced by preprocess-gerbers.mjs.
 */

import * as THREE from 'three';

// ─── Types for preprocessed JSON ─────────────────────────────────────

export interface PCBData {
  id: string;
  name: string;
  dimensions: { width: number; height: number };
  origin: { x: number; y: number };
  layerCount: number;
  boardThickness: number;
  outline: number[][];
  layers: Record<string, LayerData>;
  drills: {
    pth: DrillHole[];
    npth: DrillHole[];
  };
}

export interface LayerData {
  draws: DrawCmd[];
  flashes: FlashCmd[];
  regions: RegionData[];
  apertures: Record<string, ApertureData>;
}

export interface DrawCmd {
  x1: number; y1: number;
  x2: number; y2: number;
  a: number;
  p?: 'c';
}

export interface FlashCmd {
  x: number; y: number;
  a: number;
  p?: 'c';
}

export interface RegionData {
  pts: number[][];
  p?: 'c';
}

export interface ApertureData {
  t: string;      // C = circle, R = rectangle, O = obround, or macro name
  p: number[];    // params
}

export interface DrillHole {
  x: number;
  y: number;
  d: number;      // diameter
}

// ─── Coordinate Transform ────────────────────────────────────────────
// Gerber uses bottom-left origin; Three.js is centered.
// We center the board at (0, 0) and flip Y for correct 3D orientation.

function createTransform(data: PCBData) {
  const cx = data.origin.x + data.dimensions.width / 2;
  const cy = data.origin.y + data.dimensions.height / 2;
  // Scale: 1mm = 0.01 units in Three.js (to keep the board a reasonable size)
  const scale = 0.01;
  return {
    x: (gx: number) => (gx - cx) * scale,
    y: (gy: number) => (gy - cy) * scale,
    s: (v: number) => v * scale,
    scale,
  };
}

// ─── Build Layer Geometry ────────────────────────────────────────────

export function buildLayerGeometry(
  layerData: LayerData,
  data: PCBData,
  zOffset: number,
  thickness: number
): THREE.BufferGeometry {
  const t = createTransform(data);
  const geometries: THREE.BufferGeometry[] = [];

  // Process draws (traces)
  for (const draw of layerData.draws) {
    if (draw.p === 'c') continue; // skip clear polarity for now

    const aperture = layerData.apertures[draw.a];
    let width = t.s(0.2); // default trace width
    if (aperture) {
      if (aperture.t === 'C' && aperture.p[0]) {
        width = t.s(aperture.p[0]);
      } else if (aperture.t === 'R' && aperture.p[0]) {
        width = t.s(Math.min(aperture.p[0], aperture.p[1] || aperture.p[0]));
      } else if (aperture.p && aperture.p[0]) {
        width = t.s(aperture.p[0]);
      }
    }

    if (width < 0.0001) continue;

    const x1 = t.x(draw.x1), y1 = t.y(draw.y1);
    const x2 = t.x(draw.x2), y2 = t.y(draw.y2);

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 0.00001) continue;

    // Create box for trace segment
    const traceGeo = new THREE.BoxGeometry(len, width, thickness);
    const angle = Math.atan2(dy, dx);
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    const matrix = new THREE.Matrix4();
    matrix.makeRotationZ(angle);
    matrix.setPosition(mx, my, zOffset);
    traceGeo.applyMatrix4(matrix);

    geometries.push(traceGeo);
  }

  // Process flashes (pads)
  for (const flash of layerData.flashes) {
    if (flash.p === 'c') continue;

    const aperture = layerData.apertures[flash.a];
    const fx = t.x(flash.x);
    const fy = t.y(flash.y);
    let padGeo: THREE.BufferGeometry | null = null;

    if (!aperture) {
      const radius = t.s(0.6);
      padGeo = new THREE.CylinderGeometry(radius, radius, thickness, 12);
      padGeo.rotateX(Math.PI / 2);
    } else if (aperture.t === 'C') {
      const radius = t.s(aperture.p[0] || 1.0) / 2;
      if (radius > 0.0001) {
        padGeo = new THREE.CylinderGeometry(radius, radius, thickness, 12);
        padGeo.rotateX(Math.PI / 2);
      }
    } else if (aperture.t === 'R') {
      const w = t.s(aperture.p[0] || 1.0);
      const h = t.s(aperture.p[1] || aperture.p[0] || 1.0);
      if (w > 0.0001 && h > 0.0001) {
        padGeo = new THREE.BoxGeometry(w, h, thickness);
      }
    } else if (aperture.t === 'O') {
      const w = t.s(aperture.p[0] || 1.0);
      const h = t.s(aperture.p[1] || aperture.p[0] || 1.0);
      if (w > 0.0001 && h > 0.0001) {
        padGeo = new THREE.BoxGeometry(w, h, thickness);
      }
    } else {
      // RoundRect or custom macro
      let w = t.s(1.0);
      let h = t.s(1.0);
      if (aperture.p.length >= 5) {
        const xSpan = Math.abs(aperture.p[1] - (aperture.p[5] !== undefined ? aperture.p[5] : -aperture.p[1]));
        const ySpan = Math.abs(aperture.p[2] - (aperture.p[4] !== undefined ? aperture.p[4] : -aperture.p[2]));
        w = t.s(xSpan || 1.0);
        h = t.s(ySpan || 1.0);
      } else if (aperture.p.length >= 2) {
        w = t.s(aperture.p[0] || 1.0);
        h = t.s(aperture.p[1] || aperture.p[0] || 1.0);
      } else if (aperture.p.length === 1) {
        w = h = t.s(aperture.p[0] || 1.0);
      }
      padGeo = new THREE.BoxGeometry(w, h, thickness);
    }

    if (padGeo) {
      padGeo.translate(fx, fy, zOffset);
      geometries.push(padGeo);
    }
  }

  // Process regions (copper fills, ground planes)
  for (const region of layerData.regions) {
    if (region.p === 'c') continue;
    if (region.pts.length < 3) continue;

    try {
      const shape = new THREE.Shape();
      shape.moveTo(t.x(region.pts[0][0]), t.y(region.pts[0][1]));
      for (let i = 1; i < region.pts.length; i++) {
        shape.lineTo(t.x(region.pts[i][0]), t.y(region.pts[i][1]));
      }
      shape.closePath();

      const extrudeSettings = { depth: thickness, bevelEnabled: false };
      const regionGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      regionGeo.translate(0, 0, zOffset - thickness / 2);
      geometries.push(regionGeo);
    } catch {
      // Some region shapes may be degenerate — skip silently
    }
  }

  // Merge all geometries
  if (geometries.length === 0) {
    return new THREE.BufferGeometry();
  }

  return mergeGeometries(geometries);
}

// ─── Build Board Substrate ───────────────────────────────────────────

export function buildBoardSubstrate(data: PCBData): THREE.BufferGeometry {
  const t = createTransform(data);
  const w = t.s(data.dimensions.width);
  const h = t.s(data.dimensions.height);
  const depth = t.s(data.boardThickness);

  // If outline is a simple rect, use BoxGeometry
  if (data.outline.length <= 4) {
    return new THREE.BoxGeometry(w, h, depth);
  }

  // Complex outline: extrude the polygon
  const shape = new THREE.Shape();
  shape.moveTo(t.x(data.outline[0][0]), t.y(data.outline[0][1]));
  for (let i = 1; i < data.outline.length; i++) {
    shape.lineTo(t.x(data.outline[i][0]), t.y(data.outline[i][1]));
  }
  shape.closePath();

  const extrudeSettings = { depth, bevelEnabled: false };
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.translate(0, 0, -depth / 2);
  return geo;
}

// ─── Build Drill Holes ──────────────────────────────────────────────

export function buildDrillGeometry(
  holes: DrillHole[],
  data: PCBData,
  boardThickness: number
): THREE.BufferGeometry {
  const t = createTransform(data);
  const geometries: THREE.BufferGeometry[] = [];
  const depth = t.s(boardThickness) * 1.5; // extend through board

  for (const hole of holes) {
    const radius = t.s(hole.d) / 2;
    if (radius < 0.0001) continue;

    const geo = new THREE.CylinderGeometry(radius, radius, depth, 12);
    geo.rotateX(Math.PI / 2);
    geo.translate(t.x(hole.x), t.y(hole.y), 0);
    geometries.push(geo);
  }

  if (geometries.length === 0) return new THREE.BufferGeometry();
  return mergeGeometries(geometries);
}

// ─── Build Via Barrels (gold-plated through-hole cylinders) ──────────

export function buildViaBarrels(
  holes: DrillHole[],
  data: PCBData,
  boardThickness: number
): THREE.BufferGeometry {
  const t = createTransform(data);
  const geometries: THREE.BufferGeometry[] = [];

  for (const hole of holes) {
    const innerRadius = t.s(hole.d) / 2;
    const outerRadius = innerRadius * 1.5; // annular ring
    if (outerRadius < 0.0001) continue;

    // Via barrel: thin ring
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, 12);
    // Top
    const topGeo = geo.clone();
    topGeo.translate(t.x(hole.x), t.y(hole.y), t.s(boardThickness / 2) + 0.001);
    geometries.push(topGeo);
    // Bottom
    const botGeo = geo.clone();
    botGeo.translate(t.x(hole.x), t.y(hole.y), -t.s(boardThickness / 2) - 0.001);
    geometries.push(botGeo);
  }

  if (geometries.length === 0) return new THREE.BufferGeometry();
  return mergeGeometries(geometries);
}

// ─── Build Board Edge Highlight ──────────────────────────────────────

export function buildBoardEdge(data: PCBData): THREE.BufferGeometry {
  const t = createTransform(data);
  const points: THREE.Vector3[] = [];
  const depth = t.s(data.boardThickness);

  for (const pt of data.outline) {
    points.push(new THREE.Vector3(t.x(pt[0]), t.y(pt[1]), depth / 2));
  }
  // Close the loop
  if (data.outline.length > 0) {
    points.push(new THREE.Vector3(
      t.x(data.outline[0][0]),
      t.y(data.outline[0][1]),
      depth / 2
    ));
  }

  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
  return lineGeo;
}

// ─── Merge Geometries Utility ────────────────────────────────────────

function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  // Simple merge: concatenate all position/normal/index buffers
  if (geometries.length === 1) return geometries[0];

  let totalVerts = 0;
  let totalIdx = 0;
  const validGeos = geometries.filter(g => {
    const pos = g.getAttribute('position');
    return pos && pos.count > 0;
  });

  if (validGeos.length === 0) return new THREE.BufferGeometry();
  if (validGeos.length === 1) return validGeos[0];

  for (const g of validGeos) {
    const pos = g.getAttribute('position');
    totalVerts += pos.count;
    const idx = g.getIndex();
    totalIdx += idx ? idx.count : pos.count;
  }

  const mergedPositions = new Float32Array(totalVerts * 3);
  const mergedNormals = new Float32Array(totalVerts * 3);
  const mergedIndices: number[] = [];

  let vertOffset = 0;

  for (const g of validGeos) {
    const pos = g.getAttribute('position') as THREE.BufferAttribute;
    const norm = g.getAttribute('normal') as THREE.BufferAttribute | null;
    const idx = g.getIndex();

    // Copy positions
    for (let i = 0; i < pos.count * 3; i++) {
      mergedPositions[vertOffset * 3 + i] = pos.array[i];
    }
    // Copy normals
    if (norm) {
      for (let i = 0; i < norm.count * 3; i++) {
        mergedNormals[vertOffset * 3 + i] = norm.array[i];
      }
    }
    // Copy indices
    if (idx) {
      for (let i = 0; i < idx.count; i++) {
        mergedIndices.push(idx.array[i] + vertOffset);
      }
    } else {
      for (let i = 0; i < pos.count; i++) {
        mergedIndices.push(i + vertOffset);
      }
    }

    vertOffset += pos.count;
  }

  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(mergedPositions, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(mergedNormals, 3));
  merged.setIndex(mergedIndices);
  merged.computeVertexNormals();

  // Dispose originals
  for (const g of validGeos) g.dispose();

  return merged;
}

// Scale the stackup values to Three.js units relative to the board substrate surfaces
export function getLayerZOffset(layerName: string, boardThickness: number = 1.6, scale: number = 0.01) {
  const halfThickness = (boardThickness * scale) / 2;
  const isFront = layerName.startsWith('F.');
  const isBack = layerName.startsWith('B.');
  
  let offset = 0.0003;
  let thickness = 0.0002;

  if (layerName.includes('.Cu')) {
    offset = 0.0002;
    thickness = 0.00035;
  } else if (layerName.includes('.Mask')) {
    offset = 0.0005;
    thickness = 0.00025;
  } else if (layerName.includes('.Silkscreen')) {
    offset = 0.0008;
    thickness = 0.0003;
  } else if (layerName.includes('.Paste')) {
    offset = 0.0011;
    thickness = 0.0002;
  }

  const z = isFront ? (halfThickness + offset) : isBack ? (-halfThickness - offset) : 0;

  return { z, thickness };
}
