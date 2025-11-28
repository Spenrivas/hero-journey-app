'use client'

import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false })
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false })
const Text = dynamic(() => import('@react-three/drei').then(mod => mod.Text), { ssr: false })
const Sphere = dynamic(() => import('@react-three/drei').then(mod => mod.Sphere), { ssr: false })
const Line = dynamic(() => import('@react-three/drei').then(mod => mod.Line), { ssr: false })

// Import THREE only when needed
let THREE: any = null
if (typeof window !== 'undefined') {
  THREE = require('three')
}

function JourneyPath({ completedStages }: { completedStages: number[] }) {
  const points: THREE.Vector3[] = []
  const totalStages = 12
  const radius = 5

  for (let i = 0; i <= totalStages; i++) {
    const angle = (i / totalStages) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius * 0.3
    const z = Math.sin(angle) * radius * 0.5
    points.push(new THREE.Vector3(x, y, z))
  }

  return (
    <Line
      points={points}
      color={completedStages.length === 12 ? '#10b981' : '#8b5cf6'}
      lineWidth={3}
    />
  )
}

function StageMarker({
  stage,
  position,
  completed,
  current,
}: {
  stage: number
  position: [number, number, number]
  completed: boolean
  current: boolean
}) {
  const color = completed ? '#10b981' : current ? '#8b5cf6' : '#6b7280'
  const scale = current ? 1.5 : 1

  return (
    <group position={position}>
      <Sphere args={[0.3, 32, 32]} scale={scale}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {stage}
      </Text>
    </group>
  )
}

export default function Journey3DScene({ completedStages }: { completedStages: number[] }) {
  const totalStages = 12
  const radius = 5
  const currentStage = completedStages.length === 12 
    ? 12 
    : completedStages.length === 0 
    ? 1 
    : Math.max(...completedStages) + 1

  const stagePositions: [number, number, number][] = []
  for (let i = 0; i < totalStages; i++) {
    const angle = (i / totalStages) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius * 0.3
    const z = Math.sin(angle) * radius * 0.5
    stagePositions.push([x, y, z])
  }

  if (!THREE) {
    return <div className="flex items-center justify-center h-full text-white">Loading 3D libraries...</div>
  }

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <JourneyPath completedStages={completedStages} />
      {stagePositions.map((pos, index) => (
        <StageMarker
          key={index}
          stage={index + 1}
          position={pos}
          completed={completedStages.includes(index + 1)}
          current={index + 1 === currentStage}
        />
      ))}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </Canvas>
  )
}

