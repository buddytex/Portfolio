/**
 * HeroRobotViewer.tsx
 * Interactive 3D Technical Inspection Viewport for the HERO Swarm Robot
 * Generated directly from VeRLab/hero_common URDF & OBJ mesh geometry.
 * Features OrbitControls, touch/mouse orbit, CAD grid, and real-time telemetry HUD.
 */

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { resolveMediaUrl } from '../../utils/media';

interface HeroRobotViewerProps {
  modelUrl?: string;
}

function RobotMesh({
  wireframe,
  onLoaded,
}: {
  wireframe: boolean;
  onLoaded: () => void;
}) {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    let active = true;
    const loader = new GLTFLoader();
    const url = resolveMediaUrl('/models/hero_robot.glb');

    loader.load(
      url,
      (gltf) => {
        if (!active) return;
        const scene = gltf.scene;

        // Auto-fit into viewport
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.4 / maxDim;

        scene.scale.set(scale, scale, scale);
        scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

        scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
              mesh.material = mat;
            }
          }
        });

        setModel(scene);
        onLoaded();
      },
      undefined,
      (err) => {
        console.warn('Failed to load hero_robot.glb:', err);
      }
    );

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!model) return;
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      }
    });
  }, [wireframe, model]);

  if (!model) return null;

  return (
    <group rotation={[0.2, -0.4, 0]}>
      <primitive object={model} />
    </group>
  );
}

export default function HeroRobotViewer({ modelUrl }: HeroRobotViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const controlsRef = useRef<any>(null);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="hero-3d-viewer-container" style={{ position: 'relative', width: '100%', height: '480px', borderRadius: '14px', overflow: 'hidden', background: '#0B0E14', border: '1px solid rgba(184, 146, 74, 0.28)' }}>
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 1.2, 3.4], fov: 42 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x0A0D13, 1);
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1.2, 3.4]} fov={42} />

        <ambientLight intensity={1.1} color={0xFFFAF0} />
        <directionalLight position={[4, 5, 3]} intensity={1.9} color={0xFFF6E6} />
        <directionalLight position={[-4, -2, 2]} intensity={0.9} color={0xCBD5E1} />
        <directionalLight position={[0, -3, -2]} intensity={0.5} color={0x94A3B8} />

        <RobotMesh wireframe={wireframe} onLoaded={() => setIsLoaded(true)} />

        <OrbitControls
          ref={controlsRef}
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          enableDamping={true}
          dampingFactor={0.08}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
          minDistance={1.2}
          maxDistance={6.0}
        />

        {/* Technical Coordinate Ground Plane */}
        <gridHelper args={[4, 20, 0x2A3444, 0x141A24]} position={[0, -0.9, 0]} />
      </Canvas>

      {/* Top Telemetry Header Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '18px',
          right: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'none',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.72rem',
          letterSpacing: '0.06em',
          color: '#E2E8F0',
        }}
      >
        <div>
          <div style={{ color: '#D4AF37', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }}></span>
            <span>HERO SWARM ROBOT // 3D CAD INSPECTOR</span>
          </div>
          <div style={{ color: '#94A3B8', marginTop: '2px', fontSize: '0.66rem' }}>
            Authentic Geometry: VeRLab hero_common (URDF / OBJ Meshes)
          </div>
        </div>

        <div style={{ textAlign: 'right', color: '#CBD5E1', fontSize: '0.66rem' }}>
          <div>SCALE: 74 × 78 × 77 mm</div>
          <div style={{ color: '#D4AF37' }}>INTERACTIVE ORBIT ACTIVE</div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '18px',
          display: 'flex',
          gap: '8px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.68rem',
          zIndex: 10,
        }}
      >
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          style={{
            background: autoRotate ? 'rgba(212, 175, 55, 0.22)' : 'rgba(20, 26, 36, 0.75)',
            color: autoRotate ? '#F3E8C8' : '#94A3B8',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '6px',
            padding: '5px 11px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          {autoRotate ? 'PAUSE ROTATE' : 'AUTO ROTATE'}
        </button>

        <button
          type="button"
          onClick={() => setWireframe(!wireframe)}
          style={{
            background: wireframe ? 'rgba(212, 175, 55, 0.22)' : 'rgba(20, 26, 36, 0.75)',
            color: wireframe ? '#F3E8C8' : '#94A3B8',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '6px',
            padding: '5px 11px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          {wireframe ? 'SHADED' : 'WIREFRAME'}
        </button>

        <button
          type="button"
          onClick={resetView}
          style={{
            background: 'rgba(20, 26, 36, 0.75)',
            color: '#E2E8F0',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '6px',
            padding: '5px 11px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          RESET CAMERA
        </button>
      </div>

      {/* Bottom Right Instruction */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '18px',
          color: '#64748B',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.64rem',
          pointerEvents: 'none',
        }}
      >
        CLICK + DRAG TO ORBIT · SCROLL TO ZOOM
      </div>
    </div>
  );
}
