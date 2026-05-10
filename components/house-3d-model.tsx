"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D, Center, PerspectiveCamera } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function House() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main Building */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.2, 2]} />
        <meshStandardMaterial color="#faf5ee" roughness={0.8} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[2, 0.8, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.35, 1.01]}>
        <boxGeometry args={[0.4, 0.7, 0.05]} />
        <meshStandardMaterial color="#5D4037" roughness={0.5} />
      </mesh>

      {/* Door Handle */}
      <mesh position={[0.12, 0.35, 1.05]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Windows */}
      {/* Front Left Window */}
      <mesh position={[-0.7, 0.6, 1.01]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Front Right Window */}
      <mesh position={[0.7, 0.6, 1.01]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Side Windows */}
      <mesh position={[1.26, 0.6, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.4]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[-1.26, 0.6, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.4]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Chimney */}
      <mesh position={[0.8, 1.8, -0.5]} castShadow>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* Foundation/Steps */}
      <mesh position={[0, -0.05, 1.2]} receiveShadow>
        <boxGeometry args={[0.8, 0.1, 0.4]} />
        <meshStandardMaterial color="#9E9E9E" roughness={0.9} />
      </mesh>

      {/* Ground */}
      <mesh position={[0, -0.1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial color="#4CAF50" roughness={1} />
      </mesh>

      {/* Trees */}
      <Tree position={[-2, 0, -1]} scale={0.8} />
      <Tree position={[2.2, 0, 0.5]} scale={0.6} />
      <Tree position={[-1.8, 0, 1.5]} scale={0.5} />

      {/* Fence */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-2 + i * 0.5, 0.15, 2.2]}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 0.3, 2.2]}>
        <boxGeometry args={[4, 0.05, 0.05]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
    </group>
  )
}

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 1, 0]} castShadow>
        <coneGeometry args={[0.5, 1, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <coneGeometry args={[0.4, 0.8, 8]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[4, 3, 5]} fov={45} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
      />
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <House />
      </Float>
    </>
  )
}

export function House3DModel() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
