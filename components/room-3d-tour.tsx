"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, PerspectiveCamera, useProgress } from "@react-three/drei"
import { Suspense, useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface Room {
  name: string
  position: [number, number, number]
  color: string
}

const rooms: Room[] = [
  { name: "Living Room", position: [0, 0, 0], color: "#f5f5dc" },
  { name: "Kitchen", position: [6, 0, 0], color: "#e8e8e8" },
  { name: "Master Bedroom", position: [0, 0, -6], color: "#f0e6d3" },
  { name: "Bathroom", position: [6, 0, -6], color: "#ffffff" },
]

function RoomGeometry({ room, isActive, onClick }: { room: Room; isActive: boolean; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <group position={room.position}>
      {/* Floor */}
      <mesh 
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        onClick={onClick}
        receiveShadow
      >
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial 
          color={room.color} 
          roughness={0.8}
        />
      </mesh>

      {/* Walls */}
      {/* Back Wall */}
      <mesh position={[0, 1.5, -2.5]} castShadow>
        <boxGeometry args={[5, 3, 0.1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-2.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[5, 3, 0.1]} />
        <meshStandardMaterial color="#fafafa" roughness={0.9} />
      </mesh>

      {/* Room Label */}
      <Html position={[0, 0.1, 0]} center distanceFactor={10}>
        <div 
          className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all ${
            isActive 
              ? "bg-primary text-primary-foreground scale-110" 
              : "bg-card/90 text-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
          onClick={onClick}
        >
          {room.name}
        </div>
      </Html>

      {/* Furniture based on room type */}
      {room.name === "Living Room" && <LivingRoomFurniture />}
      {room.name === "Kitchen" && <KitchenFurniture />}
      {room.name === "Master Bedroom" && <BedroomFurniture />}
      {room.name === "Bathroom" && <BathroomFurniture />}
    </group>
  )
}

function LivingRoomFurniture() {
  return (
    <group>
      {/* Sofa */}
      <mesh position={[0, 0.3, -1.5]} castShadow>
        <boxGeometry args={[2.5, 0.6, 0.8]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      {/* Sofa Back */}
      <mesh position={[0, 0.6, -1.85]} castShadow>
        <boxGeometry args={[2.5, 0.6, 0.15]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>
      {/* Coffee Table */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>
      {/* TV Stand */}
      <mesh position={[0, 0.3, 1.8]} castShadow>
        <boxGeometry args={[2, 0.5, 0.4]} />
        <meshStandardMaterial color="#2d3748" roughness={0.4} />
      </mesh>
      {/* TV */}
      <mesh position={[0, 0.9, 1.7]} castShadow>
        <boxGeometry args={[1.8, 1, 0.1]} />
        <meshStandardMaterial color="#1a202c" roughness={0.2} />
      </mesh>
    </group>
  )
}

function KitchenFurniture() {
  return (
    <group>
      {/* Counter */}
      <mesh position={[0, 0.45, -2]} castShadow>
        <boxGeometry args={[4, 0.9, 0.6]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
      </mesh>
      {/* Counter Top */}
      <mesh position={[0, 0.92, -2]} castShadow>
        <boxGeometry args={[4.1, 0.05, 0.65]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Island */}
      <mesh position={[0, 0.45, 0.5]} castShadow>
        <boxGeometry args={[2, 0.9, 1]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
      </mesh>
      {/* Island Top */}
      <mesh position={[0, 0.92, 0.5]} castShadow>
        <boxGeometry args={[2.1, 0.05, 1.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Stools */}
      {[-0.6, 0.6].map((x, i) => (
        <group key={i} position={[x, 0, 1.3]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.7, 16]} />
            <meshStandardMaterial color="#718096" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            <meshStandardMaterial color="#2d3748" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function BedroomFurniture() {
  return (
    <group>
      {/* Bed Frame */}
      <mesh position={[0, 0.2, -1]} castShadow>
        <boxGeometry args={[2.2, 0.4, 2.2]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.5, -1]} castShadow>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
      </mesh>
      {/* Pillows */}
      <mesh position={[-0.5, 0.7, -1.8]} castShadow>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.7, -1.8]} castShadow>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
      </mesh>
      {/* Headboard */}
      <mesh position={[0, 1.2, -2.05]} castShadow>
        <boxGeometry args={[2.2, 1, 0.1]} />
        <meshStandardMaterial color="#4a3728" roughness={0.5} />
      </mesh>
      {/* Nightstands */}
      {[-1.4, 1.4].map((x, i) => (
        <mesh key={i} position={[x, 0.3, -1.5]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.5]} />
          <meshStandardMaterial color="#5D4037" roughness={0.6} />
        </mesh>
      ))}
      {/* Lamps */}
      {[-1.4, 1.4].map((x, i) => (
        <group key={i} position={[x, 0.7, -1.5]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.08, 0.2, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <coneGeometry args={[0.12, 0.15, 16]} />
            <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function BathroomFurniture() {
  return (
    <group>
      {/* Vanity */}
      <mesh position={[-1.5, 0.45, -2]} castShadow>
        <boxGeometry args={[1.5, 0.9, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      {/* Sink */}
      <mesh position={[-1.5, 0.95, -2]}>
        <cylinderGeometry args={[0.3, 0.25, 0.1, 32]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Mirror */}
      <mesh position={[-1.5, 1.6, -2.45]}>
        <boxGeometry args={[1, 0.8, 0.05]} />
        <meshStandardMaterial color="#87CEEB" roughness={0} metalness={0.9} />
      </mesh>
      {/* Toilet */}
      <mesh position={[1.5, 0.25, -2]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      <mesh position={[1.5, 0.55, -2.15]} castShadow>
        <boxGeometry args={[0.45, 0.1, 0.4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* Tank */}
      <mesh position={[1.5, 0.6, -2.35]} castShadow>
        <boxGeometry args={[0.45, 0.5, 0.2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* Bathtub */}
      <mesh position={[0, 0.35, 1.5]} castShadow>
        <boxGeometry args={[1.8, 0.7, 0.9]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
    </group>
  )
}

function Scene({ activeRoom, setActiveRoom }: { activeRoom: string; setActiveRoom: (room: string) => void }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const targetPosition = useRef(new THREE.Vector3(8, 8, 12))
  
  const activeRoomData = rooms.find(r => r.name === activeRoom)
  
  useFrame(() => {
    if (cameraRef.current && activeRoomData) {
      const target = new THREE.Vector3(
        activeRoomData.position[0] + 5,
        6,
        activeRoomData.position[2] + 8
      )
      cameraRef.current.position.lerp(target, 0.02)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[8, 8, 12]} fov={50} />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2.1}
      />
      <Environment preset="apartment" />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[0, 3, 0]} intensity={0.5} />
      <pointLight position={[6, 3, 0]} intensity={0.5} />
      <pointLight position={[0, 3, -6]} intensity={0.3} />
      <pointLight position={[6, 3, -6]} intensity={0.3} />

      {rooms.map((room) => (
        <RoomGeometry
          key={room.name}
          room={room}
          isActive={activeRoom === room.name}
          onClick={() => setActiveRoom(room.name)}
        />
      ))}

      {/* Base/Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -0.01, -3]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d3748" roughness={1} />
      </mesh>
    </>
  )
}

function Loader() {
  const { progress } = useProgress()
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading 3D Tour... {progress.toFixed(0)}%</p>
      </div>
    </div>
  )
}

export function Room3DTour() {
  const [activeRoom, setActiveRoom] = useState("Living Room")

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene activeRoom={activeRoom} setActiveRoom={setActiveRoom} />
        </Suspense>
      </Canvas>
      
      {/* Room Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-card/90 backdrop-blur-sm rounded-full p-2 border border-border">
        {rooms.map((room) => (
          <button
            key={room.name}
            onClick={() => setActiveRoom(room.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeRoom === room.name
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary text-foreground"
            }`}
          >
            {room.name}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-border">
        <p className="text-sm text-muted-foreground">
          Drag to rotate • Scroll to zoom • Click room labels to navigate
        </p>
      </div>
    </div>
  )
}
