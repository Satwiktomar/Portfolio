import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FlowingBlobs() {
  const meshRef1 = useRef()
  const meshRef2 = useRef()
  const meshRef3 = useRef()
  const meshRef4 = useRef()

  const material1 = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#ffffff'),
    transparent: true,
    opacity: 0.04,
  }), [])

  const material2 = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#6366f1'),
    transparent: true,
    opacity: 0.03,
  }), [])

  const material3 = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#a78bfa'),
    transparent: true,
    opacity: 0.025,
  }), [])

  const material4 = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#e2e8f0'),
    transparent: true,
    opacity: 0.035,
  }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (meshRef1.current) {
      meshRef1.current.position.x = Math.sin(t * 0.3) * 3.5
      meshRef1.current.position.y = Math.cos(t * 0.2) * 2.0
      meshRef1.current.position.z = Math.sin(t * 0.15) * 1.5 - 3
      meshRef1.current.rotation.x = t * 0.1
      meshRef1.current.rotation.z = t * 0.08
      meshRef1.current.scale.setScalar(2.5 + Math.sin(t * 0.4) * 0.3)
    }

    if (meshRef2.current) {
      meshRef2.current.position.x = Math.cos(t * 0.25 + 2) * 4
      meshRef2.current.position.y = Math.sin(t * 0.35 + 1) * 2.5
      meshRef2.current.position.z = Math.cos(t * 0.2) * 1 - 4
      meshRef2.current.rotation.y = t * 0.12
      meshRef2.current.rotation.x = t * 0.06
      meshRef2.current.scale.setScalar(3 + Math.cos(t * 0.3) * 0.4)
    }

    if (meshRef3.current) {
      meshRef3.current.position.x = Math.sin(t * 0.2 + 4) * 3
      meshRef3.current.position.y = Math.cos(t * 0.3 + 3) * 1.8
      meshRef3.current.position.z = Math.sin(t * 0.25 + 1) * 2 - 5
      meshRef3.current.rotation.z = t * 0.09
      meshRef3.current.rotation.y = t * 0.07
      meshRef3.current.scale.setScalar(2.8 + Math.sin(t * 0.35 + 2) * 0.35)
    }

    if (meshRef4.current) {
      meshRef4.current.position.x = Math.cos(t * 0.18 + 1) * 2.5
      meshRef4.current.position.y = Math.sin(t * 0.22 + 5) * 3
      meshRef4.current.position.z = Math.cos(t * 0.12 + 3) * 1.5 - 3.5
      meshRef4.current.rotation.x = t * 0.11
      meshRef4.current.rotation.z = t * 0.05
      meshRef4.current.scale.setScalar(2.2 + Math.cos(t * 0.28 + 1) * 0.25)
    }
  })

  return (
    <>
      <mesh ref={meshRef1} material={material1}>
        <icosahedronGeometry args={[1, 3]} />
      </mesh>
      <mesh ref={meshRef2} material={material2}>
        <icosahedronGeometry args={[1, 3]} />
      </mesh>
      <mesh ref={meshRef3} material={material3}>
        <icosahedronGeometry args={[1, 2]} />
      </mesh>
      <mesh ref={meshRef4} material={material4}>
        <icosahedronGeometry args={[1, 2]} />
      </mesh>
    </>
  )
}

function ParticleField() {
  const particlesRef = useRef()
  const count = 150

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        posArray[i3 + 1] += Math.sin(t * 0.5 + i * 0.1) * 0.002
        posArray[i3] += Math.cos(t * 0.3 + i * 0.05) * 0.001
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.y = t * 0.02
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
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function AnimatedBackground() {
  return (
    <div className="three-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <FlowingBlobs />
        <ParticleField />
      </Canvas>
    </div>
  )
}
