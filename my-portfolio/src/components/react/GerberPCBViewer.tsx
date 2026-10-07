/**
 * GerberPCBViewer.tsx
 * Interactive 3D PCB Inspector supporting:
 * 1. 3D PHYSICAL BOARD ("What the physical board looks like") — populated with realistic components, connectors, and materials
 * 2. GERBER CAD LAYERS ("How the board is manufactured") — layer-by-layer fabrication geometry with toggleable masks & copper
 *
 * Uses React Three Fiber with real geometry parsed from actual manufacturing Gerbers.
 */

import { useEffect, useRef, useState, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import {
  buildLayerGeometry,
  buildBoardSubstrate,
  buildDrillGeometry,
  buildViaBarrels,
  getLayerZOffset,
  type PCBData,
} from '../../lib/gerber/gerberToGeometry';

// ─── Layer Display Config ────────────────────────────────────────────

const LAYER_CONFIG: Record<string, {
  label: string;
  color: number;
  roughness: number;
  metalness: number;
  opacity: number;
  emissive?: number;
  emissiveIntensity?: number;
  side?: THREE.Side;
}> = {
  'F.Cu': {
    label: 'Front Copper',
    color: 0xD4AF37,
    roughness: 0.2,
    metalness: 0.9,
    opacity: 1,
    emissive: 0x8C7020,
    emissiveIntensity: 0.08,
    side: THREE.DoubleSide,
  },
  'B.Cu': {
    label: 'Back Copper',
    color: 0xD4AF37,
    roughness: 0.2,
    metalness: 0.9,
    opacity: 1,
    emissive: 0x8C7020,
    emissiveIntensity: 0.08,
    side: THREE.DoubleSide,
  },
  'F.Mask': {
    label: 'Front Pads',
    color: 0xF3C958,
    roughness: 0.15,
    metalness: 0.95,
    opacity: 1,
    emissive: 0xB8924A,
    emissiveIntensity: 0.1,
    side: THREE.DoubleSide,
  },
  'B.Mask': {
    label: 'Back Pads',
    color: 0xF3C958,
    roughness: 0.15,
    metalness: 0.95,
    opacity: 1,
    emissive: 0xB8924A,
    emissiveIntensity: 0.1,
    side: THREE.DoubleSide,
  },
  'F.Silkscreen': {
    label: 'Front Silkscreen',
    color: 0xFAF8F2,
    roughness: 0.9,
    metalness: 0.0,
    opacity: 0.98,
    emissive: 0xFAF8F2,
    emissiveIntensity: 0.12,
    side: THREE.DoubleSide,
  },
  'B.Silkscreen': {
    label: 'Back Silkscreen',
    color: 0xFAF8F2,
    roughness: 0.9,
    metalness: 0.0,
    opacity: 0.98,
    emissive: 0xFAF8F2,
    emissiveIntensity: 0.12,
    side: THREE.DoubleSide,
  },
};

// ─── Camera Presets ──────────────────────────────────────────────────

const CAMERA_PRESETS = {
  isometric: { position: [1.6, 1.3, 1.8] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  top:       { position: [0, 0, 2.6] as [number, number, number],     target: [0, 0, 0] as [number, number, number] },
  bottom:    { position: [0, 0, -2.6] as [number, number, number],    target: [0, 0, 0] as [number, number, number] },
};

type LoadingPhase = 'idle' | 'fetching' | 'parsing' | 'rendering' | 'ready' | 'error';

const LOADING_MESSAGES: Record<LoadingPhase, string> = {
  idle: '',
  fetching: 'PARSING GERBER FABRICATION ARCHIVE',
  parsing: 'GENERATING 3D PCB GEOMETRY',
  rendering: 'INITIALIZING 3D BOARD SCENE',
  ready: '',
  error: '3D PREVIEW UNAVAILABLE',
};

// ─── Main Viewer Component ──────────────────────────────────────────

interface GerberPCBViewerProps {
  gerberDataFile: string;
  boardName: string;
  gerberArchive?: string;
  onClose?: () => void;
  /** Chrome-less tile mode for collages: fills parent height, no toolbars, canvas unmounts off-screen */
  compact?: boolean;
}

export default function GerberPCBViewer({
  gerberDataFile,
  boardName,
  gerberArchive,
  onClose,
  compact = false,
}: GerberPCBViewerProps) {
  const [pcbData, setPcbData] = useState<PCBData | null>(null);
  const [phase, setPhase] = useState<LoadingPhase>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Viewing mode: 'physical' = populated 3D board, 'cad' = manufacturing layer view
  const [viewMode, setViewMode] = useState<'physical' | 'cad'>('physical');

  const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>({
    board: true,
    'F.Cu': true,
    'B.Cu': true,
    'F.Mask': true,
    'B.Mask': true,
    'F.Silkscreen': true,
    'B.Silkscreen': true,
    drills: true,
  });
  const [cameraPreset, setCameraPreset] = useState<'isometric' | 'top' | 'bottom'>('isometric');
  const [presetTrigger, setPresetTrigger] = useState(0);

  // Viewport IntersectionObserver to pause R3F render loop when offscreen
  const containerRef = useRef<HTMLDivElement>(null);
  // Default to true so initial scene & geometry always compile & render without race condition
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    // Check immediate visibility on mount
    const rect = el.getBoundingClientRect();
    const initiallyVisible = rect.top < window.innerHeight + 300 && rect.bottom > -300;
    setIsInView(initiallyVisible);
    console.log(`PCB visible: ${initiallyVisible}`);
    if (typeof window !== 'undefined' && (window as any).__PERF_METRICS__) {
      (window as any).__PERF_METRICS__.pcb3dRunning = initiallyVisible;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      setIsInView(visible);
      console.log(`PCB visible: ${visible}`);
      if (typeof window !== 'undefined' && (window as any).__PERF_METRICS__) {
        (window as any).__PERF_METRICS__.pcb3dRunning = visible;
      }
    }, { rootMargin: '300px 0px', threshold: 0 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load PCB data only when component is scrolled into/near viewport
  useEffect(() => {
    if (!isInView || pcbData) return;
    let cancelled = false;
    async function loadData() {
      console.log(`[GerberPCBViewer] Fetching /pcb-data/${gerberDataFile}...`);
      setPhase('fetching');
      try {
        const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
        const resp = await fetch(`${basePath}/pcb-data/${gerberDataFile}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        console.log(`[GerberPCBViewer] Parsing JSON for ${gerberDataFile}...`);
        setPhase('parsing');
        const data: PCBData = await resp.json();
        if (cancelled) return;
        console.log(`[GerberPCBViewer] Data loaded successfully, layers:`, Object.keys(data.layers));
        setPcbData(data);
        setPhase('rendering');
        requestAnimationFrame(() => {
          if (!cancelled) setPhase('ready');
        });
      } catch (err) {
        if (cancelled) return;
        console.error(`[GerberPCBViewer] Load error:`, err);
        setPhase('error');
        setErrorMsg(err instanceof Error ? err.message : 'Failed to load PCB data');
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, [isInView, gerberDataFile, pcbData]);

  const toggleLayer = useCallback((layer: string) => {
    setLayerVisibility(prev => ({ ...prev, [layer]: !prev[layer] }));
  }, []);

  const setView = useCallback((preset: 'isometric' | 'top' | 'bottom') => {
    setCameraPreset(preset);
    setPresetTrigger(t => t + 1);
  }, []);

  const availableLayers = pcbData ? Object.keys(pcbData.layers).filter(l => {
    const ld = pcbData.layers[l];
    return ld.draws.length > 0 || ld.flashes.length > 0 || ld.regions.length > 0;
  }) : [];

  return (
    <div ref={containerRef} className="gerber-viewer-container" style={{
      width: '100%',
      height: compact ? '100%' : undefined,
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      position: 'relative',
      borderRadius: compact ? '0' : '8px',
      overflow: 'hidden',
      border: compact ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
      background: '#0E1117',
    }}>
      {/* ── Top Control Bar ── */}
      {!compact && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        background: '#141822',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        {/* Left: 3D Fabricated Board vs Gerber CAD Mode Switch */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setViewMode('physical')}
            style={{
              padding: '5px 12px',
              fontSize: '0.65rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: viewMode === 'physical' ? 700 : 500,
              color: viewMode === 'physical' ? '#141822' : '#E5C378',
              background: viewMode === 'physical' ? '#E5C378' : 'rgba(229, 195, 120, 0.1)',
              border: `1px solid ${viewMode === 'physical' ? '#E5C378' : 'rgba(229, 195, 120, 0.25)'}`,
              borderRadius: '4px',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.15s ease',
            }}
            title="Display fabricated PCB board with realistic solder mask, gold ENIG pads, copper traces, and silkscreen"
          >
            ● FABRICATED PCB
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cad')}
            style={{
              padding: '5px 12px',
              fontSize: '0.65rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: viewMode === 'cad' ? 700 : 500,
              color: viewMode === 'cad' ? '#141822' : '#38BDF8',
              background: viewMode === 'cad' ? '#38BDF8' : 'rgba(56, 189, 248, 0.1)',
              border: `1px solid ${viewMode === 'cad' ? '#38BDF8' : 'rgba(56, 189, 248, 0.25)'}`,
              borderRadius: '4px',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.15s ease',
            }}
            title="Display RS-274X manufacturing CAD layer geometry with individual layer toggles"
          >
            ■ CAD LAYERS
          </button>
        </div>

        {/* Center: Camera Presets */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {(['isometric', 'top', 'bottom'] as const).map(preset => (
            <button
              key={preset}
              type="button"
              onClick={() => setView(preset)}
              style={{
                padding: '4px 9px',
                fontSize: '0.62rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: cameraPreset === preset ? 700 : 500,
                color: cameraPreset === preset ? '#E4C87A' : '#9CA3AF',
                background: cameraPreset === preset ? 'rgba(184, 146, 74, 0.15)' : 'transparent',
                border: `1px solid ${cameraPreset === preset ? 'rgba(184, 146, 74, 0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.15s ease',
              }}
            >
              {preset === 'isometric' ? '3D' : preset.toUpperCase()}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setView('isometric')}
            style={{
              padding: '4px 9px',
              fontSize: '0.62rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#9CA3AF',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'all 0.15s ease',
            }}
            title="Reset to default isometric framing"
          >
            ⟲ RESET
          </button>
        </div>

        {/* Right: Board Dimensions & Specs */}
        <div style={{
          fontSize: '0.62rem',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#9CA3AF',
          letterSpacing: '0.04em',
        }}>
          {pcbData ? `${boardName} · ${pcbData.dimensions.width} × ${pcbData.dimensions.height} mm · ${pcbData.layerCount}L` : boardName}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              padding: '3px 8px',
              fontSize: '0.7rem',
              color: '#9CA3AF',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            title="Close 3D Viewer"
          >
            ✕
          </button>
        )}
      </div>
      )}

      {/* ── 3D Canvas Viewport ── */}
      <div style={{
        width: '100%',
        height: compact ? '100%' : 'clamp(320px, 46vh, 470px)',
        minHeight: compact ? '0' : '280px',
        flex: compact ? '1 1 auto' : undefined,
        position: 'relative',
        background: 'radial-gradient(circle at center, #151923 0%, #0B0E14 100%)',
      }}>
        {/* Loading Overlay */}
        {phase !== 'ready' && phase !== 'idle' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            background: phase === 'error' ? 'rgba(14, 17, 23, 0.95)' : 'rgba(14, 17, 23, 0.85)',
            backdropFilter: 'blur(4px)',
            gap: '12px',
          }}>
            {phase !== 'error' && (
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid rgba(184, 146, 74, 0.2)',
                borderTop: '2px solid #B8924A',
                borderRadius: '50%',
                animation: 'gerber-spin 0.8s linear infinite',
              }} />
            )}
            <span style={{
              fontSize: '0.7rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: phase === 'error' ? '#EF4444' : '#B8924A',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}>
              {errorMsg || LOADING_MESSAGES[phase]}
            </span>
          </div>
        )}

        {pcbData && (!compact || isInView) && (
          <Canvas
            frameloop={isInView ? 'always' : 'never'}
            gl={{ antialias: typeof window !== 'undefined' ? window.innerWidth >= 768 : true, alpha: false, preserveDrawingBuffer: true }}
            style={{ width: '100%', height: '100%', touchAction: 'none' }}
            onCreated={({ gl }) => {
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.1 : 1.75));
              gl.setClearColor(0x0E1117, 1);
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.05;
            }}
          >
            <RenderTrigger isInView={isInView} />
            <Suspense fallback={null}>
              <PCBScene
                data={pcbData}
                layerVisibility={layerVisibility}
                cameraPreset={cameraPreset}
                presetTrigger={presetTrigger}
                viewMode={viewMode}
              />
            </Suspense>
          </Canvas>
        )}

        {compact && pcbData && (
          <div style={{
            position: 'absolute',
            left: '10px',
            bottom: '10px',
            zIndex: 5,
            pointerEvents: 'none',
            fontSize: '0.58rem',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#E5C378',
            background: 'rgba(14, 17, 23, 0.72)',
            border: '1px solid rgba(229, 195, 120, 0.25)',
            borderRadius: '4px',
            padding: '3px 7px',
            letterSpacing: '0.05em',
            backdropFilter: 'blur(4px)',
          }}>
            ⬡ LIVE 3D · {pcbData.dimensions.width} × {pcbData.dimensions.height} mm · DRAG TO ROTATE
          </div>
        )}
      </div>

      {/* ── Bottom Controls Bar ── */}
      {!compact && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        background: '#141822',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        flexWrap: 'wrap',
      }}>
        {viewMode === 'physical' ? (
          // Physical Fabricated Board Engineering Parameters
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.58rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#E5C378',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}>
              FABRICATION SPECIFICATIONS:
            </span>
            <span style={{
              fontSize: '0.58rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#94A3B8',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 6px',
              borderRadius: '3px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              2-LAYER FR4 (1.6mm)
            </span>
            <span style={{
              fontSize: '0.58rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#94A3B8',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 6px',
              borderRadius: '3px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              ENIG GOLD FINISH (Au 0.05µm / Ni 3µm)
            </span>
            <span style={{
              fontSize: '0.58rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#94A3B8',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 6px',
              borderRadius: '3px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              ACTUAL RS-274X GERBER GEOMETRY
            </span>
            <span style={{
              fontSize: '0.58rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#94A3B8',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 6px',
              borderRadius: '3px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              CNC PLATED THROUGH-HOLES & VIAS
            </span>
          </div>
        ) : (
          // Gerber CAD Layer Visibility Toggles
          <>
            <span style={{
              fontSize: '0.58rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#38BDF8',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginRight: '4px',
            }}>
              CAD LAYERS:
            </span>

            <LayerToggle
              label="Board"
              checked={layerVisibility.board}
              color="#1A2B22"
              onChange={() => toggleLayer('board')}
            />

            {availableLayers.map(layer => {
              const cfg = LAYER_CONFIG[layer];
              if (!cfg) return null;
              return (
                <LayerToggle
                  key={layer}
                  label={cfg.label.replace('Front ', 'F.').replace('Back ', 'B.').replace('Solder ', '').replace(' Copper', '')}
                  checked={layerVisibility[layer] !== false}
                  color={`#${cfg.color.toString(16).padStart(6, '0')}`}
                  onChange={() => toggleLayer(layer)}
                />
              );
            })}

            <LayerToggle
              label="Drills"
              checked={layerVisibility.drills}
              color="#D4AF37"
              onChange={() => toggleLayer('drills')}
            />
          </>
        )}

        {/* Spacer & Gerber Download Link */}
        <div style={{ flex: 1 }} />
        {gerberArchive && (
          <a
            href={`${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/media/${gerberArchive}`}
            download
            style={{
              padding: '4px 10px',
              fontSize: '0.6rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#B8924A',
              background: 'rgba(184, 146, 74, 0.1)',
              border: '1px solid rgba(184, 146, 74, 0.3)',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 600,
              letterSpacing: '0.04em',
              transition: 'all 0.15s ease',
            }}
          >
            ↓ DOWNLOAD GERBER ARCHIVE
          </a>
        )}
      </div>
      )}

      <style>{`
        @keyframes gerber-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Layer Toggle Button ─────────────────────────────────────────────

function LayerToggle({ label, checked, color, onChange }: {
  label: string;
  checked: boolean;
  color: string;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 8px',
        fontSize: '0.58rem',
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        color: checked ? '#E8E4DA' : '#6B7280',
        background: checked ? 'rgba(255,255,255,0.06)' : 'transparent',
        border: `1px solid ${checked ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '3px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
      title={`Toggle ${label}`}
    >
      <span style={{
        width: '7px',
        height: '7px',
        borderRadius: '2px',
        background: checked ? color : 'transparent',
        border: `1px solid ${checked ? color : '#6B7280'}`,
        transition: 'all 0.15s ease',
      }} />
      {label}
    </button>
  );
}

// ─── R3F Invalidation Helper ────────────────────────────────────────

function RenderTrigger({ isInView }: { isInView: boolean }) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (isInView) {
      invalidate();
    }
  }, [isInView, invalidate]);
  return null;
}

// ─── 3D Scene ────────────────────────────────────────────────────────

function PCBScene({ data, layerVisibility, cameraPreset, presetTrigger, viewMode }: {
  data: PCBData;
  layerVisibility: Record<string, boolean>;
  cameraPreset: 'isometric' | 'top' | 'bottom';
  presetTrigger: number;
  viewMode: 'physical' | 'cad';
}) {
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const fit = getFitScale(data);

  // Smooth camera transitions on preset trigger
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const preset = CAMERA_PRESETS[cameraPreset];
    const cam = cameraRef.current;
    const controls = controlsRef.current;

    const startPos = cam.position.clone();
    const endPos = new THREE.Vector3(...preset.position).multiplyScalar(fit);
    const startTime = Date.now();
    const duration = 600;

    function animate() {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      cam.position.lerpVectors(startPos, endPos, eased);
      controls.target.set(...preset.target);
      controls.update();

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }
    animate();
  }, [cameraPreset, presetTrigger, fit]);

  // Subtle continuous auto-rotation with user interaction pause & resume
  const [isAutoRotating, setIsAutoRotating] = useState(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });
  const autoRotateTimeoutRef = useRef<number | null>(null);

  const handleControlStart = useCallback(() => {
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
      autoRotateTimeoutRef.current = null;
    }
    setIsAutoRotating(false);
  }, []);

  const handleControlEnd = useCallback(() => {
    if (autoRotateTimeoutRef.current) {
      clearTimeout(autoRotateTimeoutRef.current);
    }
    autoRotateTimeoutRef.current = window.setTimeout(() => {
      if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsAutoRotating(true);
      }
    }, 2500);
  }, []);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={CAMERA_PRESETS.isometric.position.map(v => v * fit) as [number, number, number]}
        fov={40}
        near={0.01}
        far={100}
      />

      {/* Engineering Studio Lighting */}
      <ambientLight intensity={1.3} color={0xFFFAF0} />
      <directionalLight position={[3, 5, 4]} intensity={2.0} color={0xFFF6E6} />
      <directionalLight position={[-3, -2, 3]} intensity={1.1} color={0xD8E6F5} />
      <directionalLight position={[0, 0, 5]} intensity={1.2} color={0xFFFFFF} />
      <directionalLight position={[0, -4, -3]} intensity={1.0} color={0xE4C87A} />

      {/* PCB Board Mesh (substrate, real copper traces, silkscreen, and drills) */}
      <PCBBoardMesh data={data} layerVisibility={layerVisibility} />

      {/* OrbitControls with auto-rotation */}
      <OrbitControls
        ref={controlsRef}
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        enableDamping={true}
        dampingFactor={0.08}
        autoRotate={isAutoRotating}
        autoRotateSpeed={0.6}
        onStart={handleControlStart}
        onEnd={handleControlEnd}
        minDistance={0.3}
        maxDistance={8}
        rotateSpeed={0.8}
        zoomSpeed={1.2}
        panSpeed={0.8}
      />

      {/* Subtle CAD floor reference grid */}
      <gridHelper
        args={[4, 20, 0x1E2430, 0x141822]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.025]}
      />
    </>
  );
}

// ─── PCB Board Mesh (Raw Gerber Geometry) ───────────────────────────

/** Camera distance multiplier so every board fills the frame like a ~200 mm board. */
export function getFitScale(data: PCBData): number {
  const maxDim = Math.max(data.dimensions.width, data.dimensions.height);
  return Math.min(2, Math.max(0.35, maxDim / 200));
}

export { CAMERA_PRESETS };

export function PCBBoardMesh({ data, layerVisibility }: {
  data: PCBData;
  layerVisibility: Record<string, boolean>;
}) {
  const scale = 0.01;

  const boardGeo = useMemo(() => buildBoardSubstrate(data), [data]);

  const layerGeos = useMemo(() => {
    const result: Record<string, THREE.BufferGeometry> = {};
    for (const layerName of Object.keys(data.layers)) {
      const ld = data.layers[layerName];
      if (ld.draws.length === 0 && ld.flashes.length === 0 && ld.regions.length === 0) continue;
      const { z, thickness } = getLayerZOffset(layerName, data.boardThickness, scale);
      result[layerName] = buildLayerGeometry(ld, data, z, thickness);
    }
    return result;
  }, [data]);

  const drillGeo = useMemo(() => {
    const allHoles = [...data.drills.pth, ...data.drills.npth];
    return buildDrillGeometry(allHoles, data, data.boardThickness);
  }, [data]);

  const viaGeo = useMemo(() => {
    return buildViaBarrels(data.drills.pth, data, data.boardThickness);
  }, [data]);

  return (
    <group>
      {/* FR4 Board Substrate with realistic matte dark green solder mask */}
      {layerVisibility.board && (
        <mesh geometry={boardGeo}>
          <meshStandardMaterial
            color={0x133824}
            roughness={0.65}
            metalness={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Real Copper / Mask / Silkscreen Layers from Gerbers */}
      {Object.entries(layerGeos).map(([layerName, geo]) => {
        if (!layerVisibility[layerName]) return null;
        const cfg = LAYER_CONFIG[layerName];
        if (!cfg) return null;

        const posCount = geo.getAttribute('position')?.count || 0;
        if (posCount === 0) return null;

        return (
          <mesh key={layerName} geometry={geo}>
            <meshStandardMaterial
              color={cfg.color}
              roughness={cfg.roughness}
              metalness={cfg.metalness}
              transparent={cfg.opacity < 1}
              opacity={cfg.opacity}
              side={cfg.side || THREE.DoubleSide}
              emissive={cfg.emissive || 0x000000}
              emissiveIntensity={cfg.emissiveIntensity || 0}
            />
          </mesh>
        );
      })}

      {/* Drill Holes */}
      {layerVisibility.drills && (
        <mesh geometry={drillGeo}>
          <meshStandardMaterial
            color={0x0A0A0A}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      )}

      {/* Gold ENIG Plated Via Barrels */}
      {layerVisibility.drills && (
        <mesh geometry={viaGeo}>
          <meshStandardMaterial
            color={0xD4AF37}
            roughness={0.2}
            metalness={0.92}
            side={THREE.DoubleSide}
            emissive={0xD4AF37}
            emissiveIntensity={0.05}
          />
        </mesh>
      )}
    </group>
  );
}
