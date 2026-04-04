import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Detect if running on a mobile-width viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function DataCore() {
  const groupRef = useRef()
  const materialRef = useRef()
  const meshRef = useRef()
  
  // Animation targets
  const targetScale = useRef(0.1)
  const targetDistort = useRef(0)
  const targetSpeed = useRef(0)

  useEffect(() => {
    // Staggered entrance
    setTimeout(() => { targetScale.current = 1 }, 500)
    setTimeout(() => { 
      targetDistort.current = 0.45
      targetSpeed.current = 2.5
    }, 800)
  }, [])

  useFrame((state) => {
    // 1. Group container handles pointing and bulging towards cursor
    if (groupRef.current) {
      // Parallax positioning
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.mouse.x * 0.8, 0.05)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.mouse.y * 0.8, 0.05)

      const dummy = new THREE.Object3D()
      dummy.position.copy(groupRef.current.position)
      
      // Crucial Fix: Point the Z-axis ACROSS the screen (Z = -4, same as object) 
      // rather than at the camera (Z = 10), so the stretch is visible in profile!
      // Multiply mouse by scalar to map standard screen space to world space coordinates
      dummy.lookAt(state.mouse.x * 10, state.mouse.y * 10, -4) 
      
      groupRef.current.quaternion.slerp(dummy.quaternion, 0.1)

      // Calculate total intensity based on how far mouse is from center for dynamic organic stretching
      const mouseDistance = Math.sqrt(state.mouse.x * state.mouse.x + state.mouse.y * state.mouse.y)
      // Increase stretch factor heavily for maximum visual feedback. Max stretch ~2.5x 
      const stretchFactor = 1.0 + (mouseDistance * 1.5) 
      
      // We scale the Z-axis of the container grouping, pulling the contained abstractly-tumbling mesh with it
      groupRef.current.scale.set(1, 1, stretchFactor)
    }

    // 2. Inner mesh handles base scale entrance and continuous infinite tumble!
    if (meshRef.current) {
      const baseLerp = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale.current, 0.03)
      meshRef.current.scale.setScalar(baseLerp)
      
      // Continuous tumbling regardless of container stretching
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.z += 0.001
    }

    if (materialRef.current) {
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort.current, 0.02)
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed.current, 0.02)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
      {/* Anchor Point Wrapper */}
      <group position={[2.5, 0, -4]}> 
        {/* Tracking Group: Bulging and pointing */}
        <group ref={groupRef}>
          {/* Constantly tumbling Mesh */}
          <Sphere ref={meshRef} args={[1.8, 64, 64]} scale={0.1}>
            <MeshDistortMaterial
              ref={materialRef}
              color="#0b0f19" // Deep dark core
              emissive="#6366f1" // Glowing indigo 
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.9}
              wireframe={true}
              transparent={true}
              opacity={0.4}
              distort={0} 
              speed={0}
            />
          </Sphere>
        </group>
      </group>
    </Float>
  )
}

function Starfield({ isMobile }) {
  const particlesRef = useRef()
  const count = isMobile ? 400 : 1200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Abstract cloud generation
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return pos
  }, [])

  const targetOpacity = useRef(0)

  useEffect(() => {
    setTimeout(() => { targetOpacity.current = 0.45 }, 1500)
  }, [])

  useFrame((state) => {
    const { clock, mouse } = state
    const t = clock.getElapsedTime()
    if (particlesRef.current) {
      // Entrance fade in
      particlesRef.current.material.opacity = THREE.MathUtils.lerp(particlesRef.current.material.opacity, targetOpacity.current, 0.01)
      
      // Gentle orbit mapping
      particlesRef.current.rotation.y = t * 0.015
      particlesRef.current.rotation.z = t * 0.005
      
      // Parallax displacement opposite to Core
      particlesRef.current.position.x = THREE.MathUtils.lerp(particlesRef.current.position.x, mouse.x * -1.5, 0.02)
      particlesRef.current.position.y = THREE.MathUtils.lerp(particlesRef.current.position.y, mouse.y * -1.5, 0.02)
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#06b6d4" // Cyan points
        transparent
        opacity={0} // Managed by animejs
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function GridFloor() {
  const gridRef = useRef()
  const targetOpacity = useRef(0)

  useEffect(() => {
    setTimeout(() => { targetOpacity.current = 0.03 }, 2000)
  }, [])

  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.material.opacity = THREE.MathUtils.lerp(gridRef.current.material.opacity, targetOpacity.current, 0.01)
    }
  })

  return (
    <mesh ref={gridRef} position={[0, -4.5, -5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 60, 40, 40]} />
      <meshBasicMaterial 
        color="#6366f1" 
        wireframe 
        transparent 
        opacity={0} 
      />
    </mesh>
  )
}

export default function AnimatedBackground() {
  const isMobile = useIsMobile()

  return (
    <div className="three-canvas">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, isMobile ? 1 : 2]}
        gl={{ antialias: !isMobile, alpha: true }} 
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#a855f7" />
        
        {/* Only render the heavy sphere on desktop */}
        {!isMobile && <DataCore />}
        
        <Starfield isMobile={isMobile} />
        {!isMobile && <GridFloor />}
        
        {/* Fewer sparkles on mobile for performance */}
        <Sparkles count={isMobile ? 60 : 200} scale={15} size={1.2} speed={0.3} opacity={0.15} color="#a855f7" noise={1} />
        {!isMobile && <Sparkles count={100} scale={20} size={2.5} speed={0.1} opacity={0.1} color="#06b6d4" noise={2} />}
      </Canvas>
    </div>
  )
}

