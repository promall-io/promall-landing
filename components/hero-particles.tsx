"use client"

import { useEffect, useRef } from "react"
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from "three"

const PARTICLE_COUNT = 90
const FIELD = { x: 22, y: 13, z: 7 }

function createGlowTexture() {
  const size = 64
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext("2d")
  if (!context) return null
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  )
  gradient.addColorStop(0, "rgba(255,255,255,1)")
  gradient.addColorStop(0.35, "rgba(255,255,255,0.45)")
  gradient.addColorStop(1, "rgba(255,255,255,0)")
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)
  return new CanvasTexture(canvas)
}

export function HeroParticles({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const scene = new Scene()
    const camera = new PerspectiveCamera(50, 1, 0.1, 60)
    camera.position.z = 16

    const renderer = new WebGLRenderer({ alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const speeds = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)
    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * FIELD.x
      positions[index * 3 + 1] = (Math.random() - 0.5) * FIELD.y
      positions[index * 3 + 2] = (Math.random() - 0.5) * FIELD.z
      speeds[index] = 0.12 + Math.random() * 0.3
      phases[index] = Math.random() * Math.PI * 2
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute("position", new BufferAttribute(positions, 3))

    const texture = createGlowTexture()
    const material = new PointsMaterial({
      size: 0.34,
      map: texture ?? undefined,
      color: new Color("#dfe9ff"),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    })

    const points = new Points(geometry, material)
    scene.add(points)

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5
      pointer.y = event.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    const resize = () => {
      const { clientWidth, clientHeight } = host
      if (!clientWidth || !clientHeight) return
      renderer.setSize(clientWidth, clientHeight)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)

    let frame = 0
    let running = true
    const startedAt = performance.now()

    const tick = () => {
      if (!running) return
      const elapsed = (performance.now() - startedAt) / 1000
      const attribute = geometry.getAttribute("position") as BufferAttribute

      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        let y = attribute.getY(index) + speeds[index] * 0.016
        if (y > FIELD.y / 2) y = -FIELD.y / 2
        attribute.setY(index, y)
        attribute.setX(
          index,
          attribute.getX(index) +
            Math.sin(elapsed * 0.6 + phases[index]) * 0.0035,
        )
      }
      attribute.needsUpdate = true

      points.rotation.y += (pointer.x * 0.28 - points.rotation.y) * 0.04
      points.rotation.x += (-pointer.y * 0.18 - points.rotation.x) * 0.04

      renderer.render(scene, camera)
      frame = requestAnimationFrame(tick)
    }

    if (reduced) {
      renderer.render(scene, camera)
    } else {
      frame = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frame)
      } else if (!reduced) {
        running = true
        frame = requestAnimationFrame(tick)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointerMove)
      resizeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      texture?.dispose()
      renderer.dispose()
      host.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={hostRef} className={className} aria-hidden="true" />
}
