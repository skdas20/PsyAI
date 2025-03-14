"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function BrainAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#111827")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Brain model (simplified with particles)
    const brainParticles = new THREE.Group()

    // Create brain shape with particles
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8,
    })

    // Create a brain-like shape with particles
    const brainRadius = 2
    const particleCount = 500

    for (let i = 0; i < particleCount; i++) {
      // Create a somewhat brain-shaped distribution
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi

      // Add some randomness to make it more organic
      const x = brainRadius * Math.sin(phi) * Math.cos(theta) * (0.9 + Math.random() * 0.2)
      const y = brainRadius * Math.sin(phi) * Math.sin(theta) * (0.8 + Math.random() * 0.4)
      const z = brainRadius * Math.cos(phi) * (0.7 + Math.random() * 0.6)

      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone())
      particle.position.set(x, y, z)
      particle.scale.setScalar(0.5 + Math.random() * 1.5)
      brainParticles.add(particle)
    }

    scene.add(brainParticles)

    // Add connections between particles (neural network effect)
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.2,
    })

    // Connect some particles with lines to simulate neural connections
    const maxConnections = 300
    const maxDistance = 1.2

    for (let i = 0; i < maxConnections; i++) {
      const particleIndex1 = Math.floor(Math.random() * particleCount)
      const particleIndex2 = Math.floor(Math.random() * particleCount)

      if (particleIndex1 !== particleIndex2) {
        const particle1 = brainParticles.children[particleIndex1]
        const particle2 = brainParticles.children[particleIndex2]

        const distance = particle1.position.distanceTo(particle2.position)

        if (distance < maxDistance) {
          const geometry = new THREE.BufferGeometry().setFromPoints([particle1.position, particle2.position])

          const line = new THREE.Line(geometry, connectionMaterial)
          brainParticles.add(line)
        }
      }
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point lights to make the brain glow
    const pointLight1 = new THREE.PointLight(0x8b5cf6, 1, 10)
    pointLight1.position.set(2, 2, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x6366f1, 1, 10)
    pointLight2.position.set(-2, -2, -2)
    scene.add(pointLight2)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the brain
      brainParticles.rotation.y += 0.001

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      particleGeometry.dispose()
      particleMaterial.dispose()
      connectionMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}

