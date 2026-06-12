"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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

    gsap.registerPlugin(ScrollTrigger)
    lenis.on("scroll", ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return null
}
