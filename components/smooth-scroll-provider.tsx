"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScrollProvider() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const lenis = new Lenis({
      lerp: 0.105,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      anchors: false,
    })
    window.__lenis = lenis

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return null
}
