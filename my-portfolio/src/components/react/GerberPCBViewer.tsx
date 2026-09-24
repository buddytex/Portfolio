/**
 * GerberPCBViewer.tsx
 * Interactive 3D PCB Inspector supporting:
 * 1. 3D PHYSICAL BOARD ("What the physical board looks like") — populated with realistic components, connectors, and materials
 * 2. GERBER CAD LAYERS ("How the board is manufactured") — layer-by-layer fabrication geometry with toggleable masks & copper
 *
 * Uses React Three Fiber with real geometry parsed from actual manufacturing Gerbers.
 */

import { useEffect, useRef, useState, useMemo, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
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
}

export default function GerberPCBViewer({
  gerberDataFile,
  boardName,
  gerberArchive,
  onClose,
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
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      setIsInView(visible);
      if (typeof window !== 'undefined' && (window as any).__PERF_METRICS__) {
        (window as any).__PERF_METRICS__.pcb3dRunning = visible;
      }
    }, { threshold: 0.05 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load PCB data
  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      setPhase('fetching');
      try {
        const resp = await fetch(`/pcb-data/${gerberDataFile}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        setPhase('parsing');
        const data: PCBData = await resp.json();
        if (cancelled) return;
        setPcbData(data);
        setPhase('rendering');
        requestAnimationFrame(() => {
          if (!cancelled) setPhase('ready');
        });
      } catch (err) {
        if (cancelled) return;
        setPhase('error');
        setErrorMsg(err instanceof Error ? err.message : 'Failed to load PCB data');
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, [gerberDataFile]);

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
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      background: '#0E1117',
    }}>
      {/* ── Top Control Bar ── */}
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
        {/* Left: 3D Physical vs Gerber CAD Mode Switch */}
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
            title="Display populated physical board with 3D components and realistic materials"
          >
            ● 3D PHYSICAL BOARD
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
            title="Display RS-274X manufacturing CAD layer geometry"
          >
            ■ GERBER CAD LAYERS
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

      {/* ── 3D Canvas Viewport ── */}
      <div style={{
        width: '100%',
        height: '470px',
        minHeight: '400px',
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

        {pcbData && (
          <Canvas
            frameloop={isInView ? 'always' : 'never'}
            gl={{ antialias: true, alpha: false, preserveDrawingBuffer: false }}
            style={{ width: '100%', height: '100%' }}
            onCreated={({ gl }) => {
              gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
              gl.setClearColor(0x0E1117, 1);
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.05;
            }}
          >
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
      </div>

      {/* ── Bottom Controls Bar ── */}
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
          // Physical Board Hardware Annotations
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.58rem',
              fontFamily: "'JetBrains Mono', monospace",
              color: '#E5C378',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}>
              VERIFIED POPULATED HARDWARE:
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
              DUAL ESP32 DevKits (TBW / SBW)
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
              DEUTSCH DT04-12P AUTOMOTIVE HEADER
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
              2.5kV OPTOCOUPLER BARRIER
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
              CAN 2.0B TRANSCEIVERS
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
            href={`/media/${gerberArchive}`}
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

  // Smooth camera transitions on preset trigger
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const preset = CAMERA_PRESETS[cameraPreset];
    const cam = cameraRef.current;
    const controls = controlsRef.current;

    const startPos = cam.position.clone();
    const endPos = new THREE.Vector3(...preset.position);
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
  }, [cameraPreset, presetTrigger]);

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
        position={CAMERA_PRESETS.isometric.position}
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

      {/* Populated 3D Components when in Physical Board Mode */}
      {viewMode === 'physical' && (
        <PopulatedComponents boardId={data.id} width={data.dimensions.width} height={data.dimensions.height} />
      )}

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

function PCBBoardMesh({ data, layerVisibility }: {
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

// ─── Populated 3D Components ─────────────────────────────────────────

function PopulatedComponents({ boardId, width, height }: { boardId: string; width: number; height: number }) {
  const isBackBox = boardId.includes('back-box') || boardId.includes('vehicle');
  const isFrontBox = boardId.includes('front-box');

  if (isBackBox) {
    return (
      <group>
        {/* Dual ESP32 Microcontroller DevKits for Steer-by-Wire & Throttle-by-Wire */}
        <ESP32DevKit position={[-0.45, 0.22, 0.008]} label="ESP32 TBW" />
        <ESP32DevKit position={[-0.45, -0.25, 0.008]} label="ESP32 SBW" />

        {/* Sealed Automotive Deutsch DT04 Connector Header */}
        <DeutschConnector position={[0.70, 0.25, 0.008]} />

        {/* 8-Position Heavy-Duty Power Terminal Strip for Steering Actuators */}
        <TerminalBlock position={[0.75, -0.28, 0.008]} pins={8} />

        {/* High-Current Form-C Automotive Relays */}
        <AutomotiveRelay position={[0.18, -0.24, 0.008]} />
        <AutomotiveRelay position={[0.18, -0.48, 0.008]} />

        {/* Power Filter Capacitors */}
        <ElectrolyticCap position={[0.28, 0.06, 0.008]} />
        <ElectrolyticCap position={[0.38, 0.06, 0.008]} />

        {/* CAN 2.0B Transceiver SOIC-8 & TVS Clamping Network */}
        <SOICPackage position={[0.18, 0.38, 0.008]} label="CAN 2.0B" />
        <SOICPackage position={[0.18, 0.24, 0.008]} label="TVS" />

        {/* Galvanic Isolation Barrier Optocouplers (2.5kV isolation) */}
        <SOICPackage position={[-0.05, 0.08, 0.008]} label="OPTO 1" />
        <SOICPackage position={[-0.05, -0.08, 0.008]} label="OPTO 2" />

        {/* Active Telemetry Status LEDs */}
        <StatusLED position={[-0.72, 0.48, 0.008]} color={0x10B981} glow={0x10B981} /> {/* 3.3V PWR - Green */}
        <StatusLED position={[0.08, 0.48, 0.008]} color={0xF59E0B} glow={0xF59E0B} />  {/* CAN ACT - Amber */}
        <StatusLED position={[-0.72, -0.48, 0.008]} color={0x38BDF8} glow={0x38BDF8} /> {/* SBW RDY - Cyan */}
      </group>
    );
  }

  if (isFrontBox) {
    return (
      <group>
        {/* Main Sensor Interface Compute Module */}
        <ESP32DevKit position={[0, 0.15, 0.008]} label="FRONT MCU" />

        {/* Multi-Channel Sensor Terminal Blocks (LiDAR, Camera, Wheel Speed) */}
        <TerminalBlock position={[-0.85, 0.25, 0.008]} pins={6} />
        <TerminalBlock position={[-0.85, -0.32, 0.008]} pins={6} />
        <TerminalBlock position={[0.85, 0.0, 0.008]} pins={8} />

        {/* Automotive Power Filter & Choke */}
        <ElectrolyticCap position={[-0.32, -0.45, 0.008]} />
        <ElectrolyticCap position={[-0.44, -0.45, 0.008]} />
        <AutomotiveRelay position={[0.35, -0.38, 0.008]} />

        {/* CAN Bus Controller & Transceivers */}
        <SOICPackage position={[0.22, 0.48, 0.008]} label="CAN 1" />
        <SOICPackage position={[0.36, 0.48, 0.008]} label="CAN 2" />

        {/* Status LEDs */}
        <StatusLED position={[-0.85, 0.65, 0.008]} color={0x10B981} glow={0x10B981} />
        <StatusLED position={[0.85, 0.65, 0.008]} color={0x38BDF8} glow={0x38BDF8} />
      </group>
    );
  }

  return null;
}

// ─── Component Model Details ─────────────────────────────────────────

function ESP32DevKit({ position, label }: { position: [number, number, number]; label: string }) {
  return (
    <group position={position}>
      {/* DevKit PCB base */}
      <mesh position={[0, 0, 0.006]}>
        <boxGeometry args={[0.52, 0.28, 0.012]} />
        <meshStandardMaterial color={0x181B20} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* ESP-WROOM-32 Metal RF Shield Can */}
      <mesh position={[-0.08, 0, 0.018]}>
        <boxGeometry args={[0.18, 0.16, 0.016]} />
        <meshStandardMaterial color={0xD1D5DB} roughness={0.25} metalness={0.9} />
      </mesh>
      {/* Meandered PCB Antenna */}
      <mesh position={[-0.21, 0, 0.013]}>
        <boxGeometry args={[0.06, 0.22, 0.002]} />
        <meshStandardMaterial color={0xB8924A} roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Micro-USB Port */}
      <mesh position={[0.24, 0, 0.016]}>
        <boxGeometry args={[0.07, 0.08, 0.015]} />
        <meshStandardMaterial color={0xE5E7EB} roughness={0.2} metalness={0.95} />
      </mesh>
      {/* Header Pin Strips (Top & Bottom) */}
      {[-0.12, 0.12].map((yOffset, row) => (
        <group key={row} position={[0, yOffset, 0.012]}>
          <mesh>
            <boxGeometry args={[0.46, 0.025, 0.018]} />
            <meshStandardMaterial color={0x111317} roughness={0.8} />
          </mesh>
        </group>
      ))}
      {/* Status LED Pip */}
      <mesh position={[0.08, 0.08, 0.014]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color={0x38BDF8} emissive={0x38BDF8} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function DeutschConnector({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main connector housing */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.24, 0.44, 0.12]} />
        <meshStandardMaterial color={0x2A2E39} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Silicone Weatherproof Gasket Collar */}
      <mesh position={[-0.02, 0, 0.06]}>
        <boxGeometry args={[0.03, 0.45, 0.125]} />
        <meshStandardMaterial color={0xEA580C} roughness={0.6} metalness={0.0} />
      </mesh>
      {/* Locking Clip Tab */}
      <mesh position={[0, 0, 0.13]}>
        <boxGeometry args={[0.12, 0.14, 0.03]} />
        <meshStandardMaterial color={0x374151} roughness={0.4} />
      </mesh>
      {/* Terminal Contact Pins inside */}
      {[-0.14, -0.07, 0, 0.07, 0.14].map((y, i) => (
        <mesh key={i} position={[0.08, y, 0.06]}>
          <cylinderGeometry args={[0.007, 0.007, 0.05, 8]} />
          <meshStandardMaterial color={0xD4AF37} roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function TerminalBlock({ position, pins = 8 }: { position: [number, number, number]; pins?: number }) {
  const height = pins * 0.075;
  return (
    <group position={position}>
      {/* Industrial Thermoplastic Housing */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.16, height, 0.10]} />
        <meshStandardMaterial color={0x1B4332} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Brass Clamp Screws */}
      {Array.from({ length: pins }).map((_, i) => {
        const y = -height / 2 + (i + 0.5) * (height / pins);
        return (
          <mesh key={i} position={[-0.02, y, 0.102]}>
            <cylinderGeometry args={[0.016, 0.016, 0.01, 12]} />
            <meshStandardMaterial color={0xD4AF37} roughness={0.25} metalness={0.85} />
          </mesh>
        );
      })}
    </group>
  );
}

function AutomotiveRelay({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.22, 0.18, 0.12]} />
        <meshStandardMaterial color={0x1E2024} roughness={0.35} metalness={0.15} />
      </mesh>
    </group>
  );
}

function ElectrolyticCap({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Aluminum Can with Black Sleeve */}
      <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 0.09, 16]} />
        <meshStandardMaterial color={0x1F242D} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Silver Top Vent Cross */}
      <mesh position={[0, 0, 0.091]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.036, 0.036, 0.002, 16]} />
        <meshStandardMaterial color={0xD1D5DB} roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

function SOICPackage({ position, label }: { position: [number, number, number]; label?: string }) {
  return (
    <group position={position}>
      {/* Molded Plastic Body */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[0.07, 0.06, 0.018]} />
        <meshStandardMaterial color={0x16181D} roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Pin 1 Notch */}
      <mesh position={[-0.025, 0.02, 0.02]}>
        <sphereGeometry args={[0.004, 6, 6]} />
        <meshStandardMaterial color={0x374151} roughness={0.8} />
      </mesh>
      {/* Silver Pins */}
      {[-0.02, 0, 0.02].map((y, i) => (
        <group key={i}>
          <mesh position={[-0.042, y, 0.006]}>
            <boxGeometry args={[0.016, 0.007, 0.004]} />
            <meshStandardMaterial color={0xE5E7EB} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0.042, y, 0.006]}>
            <boxGeometry args={[0.016, 0.007, 0.004]} />
            <meshStandardMaterial color={0xE5E7EB} roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StatusLED({ position, color, glow }: { position: [number, number, number]; color: number; glow: number }) {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0.006]}>
        <boxGeometry args={[0.022, 0.014, 0.01]} />
        <meshStandardMaterial color={0x1E222A} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[0.014, 0.01, 0.005]} />
        <meshStandardMaterial color={color} emissive={glow} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}
