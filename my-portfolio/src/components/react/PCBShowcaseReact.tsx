// PCBShowcaseReact Component — Interactive 3D PCB Inspector using React Three Fiber
// Supports two modes:
// 1. Decorative showcase (for boards without Gerber data)
// 2. Real Gerber-derived 3D viewer (for boards with actual fabrication data)

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { pcbArtifacts } from '../../data/pcbArtifacts';
import GerberPCBViewer from './GerberPCBViewer';

function ShowcaseRenderTrigger({ isInView }: { isInView: boolean }) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (isInView) invalidate();
  }, [isInView, invalidate]);
  return null;
}

interface PCBBoardData {
  id: string;
  name: string;
  layerCount: string;
  testPoints: { id: string; x: number; y: number; label: string; desc: string }[];
  gerberDataFile?: string;
  gerberArchive?: string;
}

interface PCBShowcaseReactProps {
  initialBoardIndex?: number;
}

export default function PCBShowcaseReact({ initialBoardIndex = 0 }: PCBShowcaseReactProps) {
  const [currentBoardIndex, setCurrentBoardIndex] = useState(initialBoardIndex);
  const currentBoard = pcbArtifacts[currentBoardIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const initiallyVisible = rect.top < window.innerHeight + 300 && rect.bottom > -300;
    setIsInView(initiallyVisible);
    if (typeof window !== 'undefined' && (window as any).__PERF_METRICS__) {
      (window as any).__PERF_METRICS__.pcb3dRunning = initiallyVisible;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      setIsInView(visible);
      if (typeof window !== 'undefined' && (window as any).__PERF_METRICS__) {
        (window as any).__PERF_METRICS__.pcb3dRunning = visible;
      }
    }, { rootMargin: '300px 0px', threshold: 0 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  
  // Listen for board change events from parent
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (typeof e.detail?.index === 'number') {
        setCurrentBoardIndex(e.detail.index);
      }
    };
    window.addEventListener('pcb-board-change', handler as EventListener);
    return () => window.removeEventListener('pcb-board-change', handler as EventListener);
  }, []);

  // Listen for explicit gerber3d view requests from Astro
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (typeof e.detail?.boardIndex === 'number') {
        setCurrentBoardIndex(e.detail.boardIndex);
      }
    };
    window.addEventListener('pcb-view-gerber3d', handler as EventListener);
    return () => window.removeEventListener('pcb-view-gerber3d', handler as EventListener);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '440px', position: 'relative', height: '100%' }}>
      {currentBoard.gerberDataFile ? (
        <GerberPCBViewer
          key={currentBoard.id}
          gerberDataFile={currentBoard.gerberDataFile}
          boardName={currentBoard.name}
          gerberArchive={currentBoard.gerberArchive}
        />
      ) : (
        <Canvas
          frameloop={isInView ? 'always' : 'never'}
          camera={{ position: [0, 0, 3.5], fov: 42 }}
          gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
          style={{ width: '100%', height: '100%', display: 'block', minHeight: '440px' }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
            gl.setClearColor(0x0E1117, 1);
          }}
        >
          <ShowcaseRenderTrigger isInView={isInView} />
          <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={42} />
          
          <ambientLight intensity={1.2} color={0xFFFAF0} />
          <directionalLight position={[3, 4, 3]} intensity={1.8} color={0xFFF6E6} />
          <directionalLight position={[-3, -2, 2]} intensity={0.9} color={0xD8E6F5} />
        <directionalLight position={[0, 0, 4]} intensity={1.0} color={0xFFFFFF} />
        
        <PCBBoard board={currentBoard} />
        
        <OrbitControls
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          enableDamping={true}
          dampingFactor={0.08}
          autoRotate={true}
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={0.05}
          minZoom={0.5}
          maxZoom={5}
          rotateSpeed={0.8}
          zoomSpeed={1.1}
          panSpeed={0.8}
        />
        
        <gridHelper args={[4, 20, 0x1E2430, 0x141822]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]} />
      </Canvas>
      )}
    </div>
  );
}

// ── Decorative PCB Board (existing showcase) ────────────────────────

function PCBBoard({ board }: { board: PCBBoardData }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!groupRef.current) return;
  }, [board.id]);

  return (
    <group ref={groupRef}>
      {/* PCB Substrate */}
      <PCBSubstrate />
      
      {/* Copper Traces */}
      <PCBTraces />
      
      {/* Mounting Holes & Annular Rings */}
      <PCBMountingHoles />
      
      {/* Test Points */}
      {board.testPoints.map((tp) => (
        <TestPoint
          key={tp.id}
          tp={tp}
        />
      ))}
      
      {/* Silkscreen Labels */}
      <PCBSilkscreen />
    </group>
  );
}

function PCBSubstrate() {
  return (
    <mesh>
      <planeGeometry args={[4.6, 3.2]} />
      <meshStandardMaterial
        color={0x141e18}
        roughness={0.9}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function PCBTraces() {
  return (
    <group>
      {/* Major trace paths - simulated with thin boxes */}
      <mesh>
        <boxGeometry args={[0.8, 0.02, 0.02]} />
        <meshStandardMaterial color={0x264433} roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Differential CAN pair - gold traces */}
      <mesh>
        <boxGeometry args={[0.3, 0.015, 0.015]} />
        <meshStandardMaterial color={0xe5c158} roughness={0.2} metalness={0.8} emissive={0xe5c158} emissiveIntensity={0.2} />
      </mesh>
      
      {/* More traces */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 0.02, 0.02]} />
        <meshStandardMaterial color={0x264433} roughness={0.3} metalness={0.7} />
      </mesh>
      
      <mesh position={[-0.5, -0.5, 0]}>
        <boxGeometry args={[0.02, 1.0, 0.02]} />
        <meshStandardMaterial color={0x264433} roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

function PCBMountingHoles() {
  return (
    <group>
      {/* Mounting holes through substrate */}
      {[
        [-2.15, 1.45],
        [2.15, 1.45],
        [-2.15, -1.45],
        [2.15, -1.45],
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], 0.05]}>
          <cylinderGeometry args={[0.14, 0.14, 0.08, 16]} />
          <meshStandardMaterial color={0x243328} roughness={0.3} metalness={0.5} />
        </mesh>
      ))}
      
      {/* Mounting hole gold plated annular rings */}
      {[
        [-2.15, 1.45],
        [2.15, 1.45],
        [-2.15, -1.45],
        [2.15, -1.45],
      ].map((pos, i) => (
        <mesh key={`ring-${i}`} position={[pos[0], pos[1], 0.12]}>
          <ringGeometry args={[0.09, 0.14, 16]} />
          <meshStandardMaterial color={0xd4af37} side={THREE.DoubleSide} roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

interface TestPointProps {
  tp: { id: string; x: number; y: number; label: string; desc: string };
}

function TestPoint({ tp }: TestPointProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pulseRef = useRef(0);
  
  useFrame((_, dt) => {
    pulseRef.current += dt;
    const currentMesh = meshRef.current;
    if (currentMesh) {
      const scale = isHovered ? 1.5 : 1 + Math.sin(pulseRef.current * 2) * 0.15;
      currentMesh.scale.setScalar(scale);
      
      // Pulse ring animation
      const ring = currentMesh.children[0] as THREE.Mesh;
      if (ring) {
        ring.scale.setScalar(1 + Math.sin(pulseRef.current * 3) * 0.5);
        const ringMaterial = ring.material as THREE.MeshBasicMaterial;
        if (ringMaterial) {
          ringMaterial.opacity = 0.3 + Math.sin(pulseRef.current * 3) * 0.3;
        }
      }
    }
  });
  
  // Convert percentage positions to 3D coordinates
  const x = (tp.x / 100 - 0.5) * 4.6;
  const y = (0.5 - tp.y / 100) * 3.2;
  
  return (
    <mesh
      ref={meshRef}
      position={[x, y, 0.25]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('pcb-tp-hover', { detail: { tp, hovered: true } }));
        }
      }}
      onPointerOut={() => {
        setIsHovered(false);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('pcb-tp-hover', { detail: { tp, hovered: false } }));
        }
      }}
    >
      {/* Test point core */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
        <meshStandardMaterial 
          color={isHovered ? 0xe4c87a : 0xb8924a} 
          roughness={0.15} 
          metalness={0.95}
          emissive={isHovered ? 0xe4c87a : 0xb8924a}
          emissiveIntensity={isHovered ? 0.9 : 0.15}
        />
      </mesh>
      
      {/* Pulse ring */}
      <mesh position={[0, 0, 0.06]}>
        <ringGeometry args={[0.08, 0.15, 16]} />
        <meshBasicMaterial 
          color={isHovered ? 0xe4c87a : 0xb8924a} 
          transparent 
          opacity={isHovered ? 0.8 : 0.4} 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </mesh>
  );
}

function PCBSilkscreen() {
  return (
    <group>
      {/* Board label */}
      <mesh position={[-2.1, 1.3, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 0.15]} />
        <meshBasicMaterial 
          color={0xe4efe8} 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* Isolation barrier label */}
      <mesh position={[0, -0.2, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.1]} />
        <meshBasicMaterial 
          color={0x6ee7b7} 
          transparent 
          opacity={0.7} 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* CAN termination label */}
      <mesh position={[1.5, -1.2, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.08]} />
        <meshBasicMaterial 
          color={0xe4efe8} 
          transparent 
          opacity={0.7} 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}