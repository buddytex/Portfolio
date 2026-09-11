// PCBShowcaseReact Component — Interactive 3D PCB Inspector using React Three Fiber
// Proper OrbitControls: Left drag = rotate, Wheel = zoom, Right drag = pan
// Touch: drag = rotate, pinch = zoom

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { pcbArtifacts } from '../../data/pcbArtifacts';

interface PCBBoardData {
  id: string;
  name: string;
  layerCount: string;
  testPoints: { id: string; x: number; y: number; label: string; desc: string }[];
}

interface PCBShowcaseReactProps {
  initialBoardIndex?: number;
}

export default function PCBShowcaseReact({ initialBoardIndex = 0 }: PCBShowcaseReactProps) {
  const [currentBoardIndex, setCurrentBoardIndex] = useState(initialBoardIndex);
  const currentBoard = pcbArtifacts[currentBoardIndex];
  
  // Listen for board change events from parent
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setCurrentBoardIndex(e.detail.index);
    };
    window.addEventListener('pcb-board-change', handler as EventListener);
    return () => window.removeEventListener('pcb-board-change', handler as EventListener);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        gl.setClearColor(0x0f1410, 1);
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={45} />
      
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1.2} />
      <directionalLight position={[-2, -1, 1.5]} intensity={0.4} />
      
      <PCBBoard board={currentBoard} />
      
      <OrbitControls
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        enableDamping={true}
        dampingFactor={0.06}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={0.05}
        minZoom={0.5}
        maxZoom={5}
        rotateSpeed={0.8}
        zoomSpeed={1}
        panSpeed={0.8}
      />
      
      <gridHelper args={[4, 4, 0x264433, 0x141e18]} />
    </Canvas>
  );
}

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
      
      {/* Components */}
      <PCBComponents />
      
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

function PCBComponents() {
  return (
    <group>
      {/* MCU - ARM Cortex M4 */}
      <mesh position={[-1.2, 0.3, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.2, 1.2, 0.2]} />
        <meshStandardMaterial color={0x0c140f} roughness={0.4} metalness={0.6} />
      </mesh>
      
      {/* Pin 1 indicator */}
      <mesh position={[-1.75, 0.85, 0.18]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial color={0xe5c158} roughness={0.2} metalness={0.9} />
      </mesh>
      
      {/* CAN Transceiver ISO1050 */}
      <mesh position={[1.8, 0.4, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.15]} />
        <meshStandardMaterial color={0x0c140f} roughness={0.4} metalness={0.6} />
      </mesh>
      
      {/* DC-DC Module */}
      <mesh position={[-1.8, -1.0, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.0, 0.7, 0.3]} />
        <meshStandardMaterial color={0x0c140f} roughness={0.4} metalness={0.5} />
      </mesh>
      
      {/* Terminal Header J1 (Deutsch) */}
      <mesh position={[2.2, 0.0, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.3, 1.5, 0.2]} />
        <meshStandardMaterial color={0x1b1e1c} roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Header pins */}
      {[0.6, 0.3, 0, -0.3, -0.6].map((y, i) => (
        <mesh key={i} position={[2.35, y, 0.22]}>
          <cylinderGeometry args={[0.06, 0.06, 0.15, 8]} />
          <meshStandardMaterial color={0xd4af37} roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      
      {/* Mounting holes with gold plating */}
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
      
      {/* Mounting hole gold rings */}
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
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* Test point core */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
        <meshStandardMaterial 
          color={0xd4af37} 
          roughness={0.15} 
          metalness={0.95}
          emissive={0xd4af37}
          emissiveIntensity={isHovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Pulse ring */}
      <mesh position={[0, 0, 0.06]}>
        <ringGeometry args={[0.08, 0.15, 16]} />
        <meshBasicMaterial 
          color={0xd4af37} 
          transparent 
          opacity={0.4} 
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      
      {/* Tooltip would be handled by HTML overlay in production */}
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