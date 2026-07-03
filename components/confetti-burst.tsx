"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

const COLORS = [
  "#415a77",
  "#778da9",
  "#aebbd0",
  "#d9d0b8",
  "#c4b894",
  "#1b263b",
  "#f3a0c2",
  "#ffffff",
]

const DURATION_MS = 2600
const PARTICLES_PER_CANNON = 68

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  spin: number
  wobble: number
  wobbleSpeed: number
  shape: "rect" | "circle"
  drift: number
}

function createCannon(
  originX: number,
  originY: number,
  direction: number,
  width: number,
): Particle[] {
  return Array.from({ length: PARTICLES_PER_CANNON }, () => {
    const angle = (-Math.PI / 2) + direction * (0.15 + Math.random() * 0.5)
    const velocity = (0.55 + Math.random() * 0.65) * Math.min(width, 900) * 0.016
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      size: 5 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.08 + Math.random() * 0.12,
      shape: Math.random() > 0.35 ? "rect" : "circle",
      drift: (Math.random() - 0.5) * 0.14,
    }
  })
}

export function ConfettiBurst({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!active || reduced) return
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = window.innerWidth
    const height = window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    context.scale(dpr, dpr)

    const particles = [
      ...createCannon(width * 0.12, height * 0.62, 1, width),
      ...createCannon(width * 0.88, height * 0.62, -1, width),
      ...createCannon(width * 0.5, height * 0.5, 0, width),
    ]

    const start = performance.now()
    let frame = 0

    const render = (now: number) => {
      const elapsed = now - start
      context.clearRect(0, 0, width, height)

      if (elapsed > DURATION_MS) return

      const fade = elapsed > DURATION_MS * 0.6
        ? 1 - (elapsed - DURATION_MS * 0.6) / (DURATION_MS * 0.4)
        : 1

      for (const particle of particles) {
        particle.vy += 0.42
        particle.vx *= 0.985
        particle.vy *= 0.985
        particle.wobble += particle.wobbleSpeed
        particle.x += particle.vx + Math.cos(particle.wobble) * 1.6 + particle.drift
        particle.y += particle.vy
        particle.rotation += particle.spin

        context.save()
        context.globalAlpha = Math.max(fade, 0)
        context.translate(particle.x, particle.y)
        context.rotate(particle.rotation)
        context.fillStyle = particle.color
        if (particle.shape === "rect") {
          context.scale(1, Math.sin(particle.wobble) * 0.6 + 0.7)
          context.fillRect(-particle.size / 2, -particle.size / 3.2, particle.size, particle.size / 1.6)
        } else {
          context.beginPath()
          context.arc(0, 0, particle.size / 2.4, 0, Math.PI * 2)
          context.fill()
        }
        context.restore()
      }

      frame = requestAnimationFrame(render)
    }

    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      context.clearRect(0, 0, width, height)
    }
  }, [active, reduced])

  if (!active || reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] h-full w-full"
    />
  )
}
