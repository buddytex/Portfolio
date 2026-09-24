// HeroSculptureReact.tsx — Premium 3D Engineering Mechanical Assembly
// Renders dark gunmetal interlocking torus rings, floating metallic gold & dark spheres,
// glowing inner gold curves, and orbital measurement geometry matching the reference design.

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function TorusAssembly() {
  const groupRef = useRef<THREE.Group>(null);
  const innerGoldRef = useRef<THREE.Mesh>(null);
  const secondaryGoldRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  // Dark graphite/gunmetal material with subtle metallic sheen
  const darkMetalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#16191E'),
      roughness: 0.32,
      metalness: 0.88,
    });
  }, []);

  // Brushed gold rim material
  const goldGlowCurveMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F3DF9A'),
      roughness: 0.15,
      metalness: 0.95,
      emissive: new THREE.Color('#E5C46E'),
      emissiveIntensity: 0.95,
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Extremely slow, elegant mechanical rotation (spec §6)
    groupRef.current.rotation.y += delta * 0.045;
    groupRef.current.rotation.x += delta * 0.02;

    // Smooth subtle pointer parallax
    const targetRotX = 0.38 + pointer.y * 0.12;
    const targetRotY = 0.45 + pointer.x * 0.15;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;

    // Gentle luminous breathing on inner gold rims
    const time = state.clock.getElapsedTime();
    const intensity = 0.85 + Math.sin(time * 2.2) * 0.2;
    if (innerGoldRef.current) {
      (innerGoldRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
    if (secondaryGoldRef.current) {
      (secondaryGoldRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity * 0.8;
    }
  });

  return (
    <group ref={groupRef} position={[0.2, 0.1, 0]}>
      {/* Primary Heavy Dark Torus (Tilted exactly like the reference image) */}
      <mesh rotation={[0.42, 0.45, -0.3]} material={darkMetalMaterial} castShadow receiveShadow>
        <torusGeometry args={[1.55, 0.32, 64, 120]} />
      </mesh>

      {/* Secondary Interlocking Dark Torus */}
      <mesh rotation={[-0.38, 0.72, 0.65]} material={darkMetalMaterial} castShadow receiveShadow>
        <torusGeometry args={[1.4, 0.26, 64, 120]} />
      </mesh>

      {/* Inner Glowing Gold Accent Ring (Luminous line hugging inner curve) */}
      <mesh
        ref={innerGoldRef}
        rotation={[0.4, 0.46, -0.28]}
        position={[0.02, 0.02, 0.05]}
        material={goldGlowCurveMaterial}
      >
        <torusGeometry args={[1.28, 0.038, 32, 100]} />
      </mesh>

      {/* Secondary Gold Arc on Interlocking Torus */}
      <mesh
        ref={secondaryGoldRef}
        rotation={[-0.34, 0.76, 0.68]}
        position={[-0.02, -0.02, 0.02]}
        material={goldGlowCurveMaterial}
      >
        <torusGeometry args={[1.18, 0.028, 32, 100, Math.PI * 1.65]} />
      </mesh>
    </group>
  );
}

function FloatingElements() {
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);
  const sphere3Ref = useRef<THREE.Mesh>(null);
  const orbit1Ref = useRef<THREE.Group>(null);
  const orbit2Ref = useRef<THREE.Group>(null);
  const orbit3Ref = useRef<THREE.Group>(null);

  // Shiny champagne gold sphere material
  const goldSphereMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#DDBF70'),
        roughness: 0.12,
        metalness: 0.98,
        emissive: new THREE.Color('#A88538'),
        emissiveIntensity: 0.18,
      }),
    []
  );

  // Dark graphite sphere material
  const darkSphereMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1A1E24'),
        roughness: 0.28,
        metalness: 0.92,
      }),
    []
  );

  // Fine gold orbital wire
  const orbitWireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#D4AF37'),
        transparent: true,
        opacity: 0.5,
      }),
    []
  );

  const orbitWireDottedMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#E5C46E'),
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. Top-Left Gold Sphere bobbing
    if (sphere1Ref.current) {
      sphere1Ref.current.position.y = 1.4 + Math.sin(t * 1.3) * 0.07;
      sphere1Ref.current.position.x = -1.8 + Math.cos(t * 1.1) * 0.04;
    }

    // 2. Mid-Left Gunmetal Sphere bobbing
    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = 0.5 + Math.sin(t * 1.7 + 1.2) * 0.05;
      sphere2Ref.current.position.x = -1.45 + Math.cos(t * 1.4 + 0.8) * 0.03;
    }

    // 3. Lower-Right Gold Sphere bobbing
    if (sphere3Ref.current) {
      sphere3Ref.current.position.y = -0.65 + Math.sin(t * 1.5 + 2.5) * 0.06;
      sphere3Ref.current.position.x = 1.75 + Math.cos(t * 1.2 + 1.8) * 0.04;
    }

    // Orbitals rotation
    if (orbit1Ref.current) {
      orbit1Ref.current.rotation.z += delta * 0.07;
      orbit1Ref.current.rotation.y += delta * 0.03;
    }

    if (orbit2Ref.current) {
      orbit2Ref.current.rotation.z -= delta * 0.05;
      orbit2Ref.current.rotation.x += delta * 0.02;
    }

    if (orbit3Ref.current) {
      orbit3Ref.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <>
      {/* 1. Large Floating Gold Sphere (Upper-Left, exactly matching reference image) */}
      <mesh ref={sphere1Ref} position={[-1.8, 1.4, 0.5]} material={goldSphereMat}>
        <sphereGeometry args={[0.34, 36, 36]} />
      </mesh>

      {/* 2. Floating Dark Gunmetal Sphere (Mid-Left, matching reference image) */}
      <mesh ref={sphere2Ref} position={[-1.45, 0.5, 0.35]} material={darkSphereMat}>
        <sphereGeometry args={[0.24, 36, 36]} />
      </mesh>

      {/* 3. Floating Gold Sphere (Lower-Right, matching reference image) */}
      <mesh ref={sphere3Ref} position={[1.75, -0.65, 0.4]} material={goldSphereMat}>
        <sphereGeometry args={[0.2, 32, 32]} />
      </mesh>

      {/* Large Tilted Gold Orbital Ring */}
      <group ref={orbit1Ref} rotation={[0.62, 0.32, -0.45]}>
        <mesh material={orbitWireMat}>
          <torusGeometry args={[2.3, 0.012, 16, 140]} />
        </mesh>
        {/* Orbital Satellite Beads */}
        <mesh position={[2.3, 0, 0]} material={goldSphereMat}>
          <sphereGeometry args={[0.048, 16, 16]} />
        </mesh>
        <mesh position={[-2.3, 0, 0]} material={goldSphereMat}>
          <sphereGeometry args={[0.038, 16, 16]} />
        </mesh>
      </group>

      {/* Secondary Tilted Arc with Satellite Bead */}
      <group ref={orbit2Ref} rotation={[-0.45, 0.55, 0.72]}>
        <mesh material={orbitWireDottedMat}>
          <torusGeometry args={[1.95, 0.01, 16, 120, Math.PI * 1.55]} />
        </mesh>
        <mesh position={[0, 1.95, 0]} material={goldSphereMat}>
          <sphereGeometry args={[0.042, 16, 16]} />
        </mesh>
      </group>

      {/* Outer Fine HUD Measurement Arc */}
      <group ref={orbit3Ref} rotation={[0.2, -0.4, 0.2]}>
        <mesh material={orbitWireMat}>
          <torusGeometry args={[2.55, 0.008, 12, 120, Math.PI * 0.9]} />
        </mesh>
      </group>
    </>
  );
}

export default function HeroSculptureReact() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%',
        height: '120%',
        maxWidth: '850px',
        maxHeight: '850px',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5));
          gl.setClearColor(0x000000, 0);
        }}
      >
        {/* Warm Ambient Fill to match ivory background */}
        <ambientLight intensity={0.95} color="#F7F5F0" />

        {/* Primary Key Light from Top-Left */}
        <directionalLight position={[-3.5, 4.5, 3.5]} intensity={1.5} color="#FFFDF7" />

        {/* Golden Rim Light from Rear-Right (Crucial for metallic edge highlights) */}
        <directionalLight position={[4.5, 2.5, -2.8]} intensity={2.8} color="#F5E0A3" />

        {/* Subtle Low Fill */}
        <directionalLight position={[0, -3.5, 2]} intensity={0.45} color="#C4B594" />

        <TorusAssembly />
        <FloatingElements />
      </Canvas>
    </div>
  );
}
