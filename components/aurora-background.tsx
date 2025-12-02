"use client"

import { useEffect, useMemo, useState } from "react"

interface ShootingStar {
  top: number
  left: number
  width: number
  delay: number
  duration: number
  angle: number
  translateX: number
  translateY: number
}

interface Star {
  left: number
  top: number
  animationDelay: number
  width: number
  height: number
}

const STAR_COUNT = 20

export function AuroraBackground() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])

  // Generate static stars once
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: STAR_COUNT }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 60,
        animationDelay: Math.random() * 3,
        width: Math.random() * 2 + 0.5,
        height: Math.random() * 2 + 0.5,
      })),
    []
  )

  // Generate random shooting stars
  useEffect(() => {
    const random = Math.random()
    let count = 1

    // 40% chance of 1 star, 40% chance of 2 stars, 20% chance of 0 stars
    if (random < 0.2) count = 0
    else if (random < 0.6) count = 1
    else count = 2

    const shootingStarsData = Array.from({ length: count }, () => {
      const angle = Math.random() * 40 - 50 // -50 to -10 degrees
      const distance = Math.random() * 300 + 600 // 600-900px

      return {
        top: Math.random() * 30 + 5, // 5-35%
        left: Math.random() * 70 + 20, // 20-90%
        width: Math.random() * 70 + 90, // 90-160px
        delay: Math.random() * 12, // 0-12s
        duration: Math.random() * 0.5 + 0.7, // 0.7-1.2s
        angle,
        translateX: Math.cos((angle * Math.PI) / 180) * distance,
        translateY: Math.sin((angle * Math.PI) / 180) * distance,
      }
    })

    setShootingStars(shootingStarsData)
  }, [])

  return (
    <div className="aurora-container">
      {/* Stars - Balanced */}
      <div className="stars-field">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.animationDelay}s`,
              width: `${star.width}px`,
              height: `${star.height}px`,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars - Random */}
      {shootingStars.map((star, i) => (
        <div
          key={i}
          className="shooting-star"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.width}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              "--shoot-angle": `${star.angle}deg`,
              "--shoot-x": `${star.translateX}px`,
              "--shoot-y": `${star.translateY}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Aurora Waves - Balanced */}
      <div className="aurora-wave aurora-wave-1" />
      <div className="aurora-wave aurora-wave-2" />
      <div className="aurora-wave aurora-wave-3" />

      {/* Dark overlay to blend with content */}
      <div className="aurora-overlay" />
    </div>
  )
}
