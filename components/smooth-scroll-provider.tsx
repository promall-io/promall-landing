"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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

    lenis.on("scroll", ScrollTrigger.update)

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.off("scroll", ScrollTrigger.update)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return null
}
