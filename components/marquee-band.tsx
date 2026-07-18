"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion"

const BASE_VELOCITY = -2.4

function MarqueeRow({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <span className="flex items-center" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center gap-10 px-10 text-[13px] font-semibold text-cream/75"
        >
          {item}
          <span
            aria-hidden="true"
            className="translate-y-[0.2em] text-[15px] leading-none text-gold"
          >
            *
          </span>
        </span>
      ))}
    </span>
  )
}

export function MarqueeBand() {
  const t = useTranslations("marquee")
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { margin: "120px" })
  const items = t.raw("items") as string[]

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  })
  const skewX = useSpring(
    useTransform(smoothVelocity, [-1500, 1500], [5, -5]),
    { damping: 40, stiffness: 300 },
  )
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`)
  const directionRef = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return
    const factor = velocityFactor.get()
    if (factor < 0) directionRef.current = -1
    else if (factor > 0) directionRef.current = 1

    let moveBy = directionRef.current * BASE_VELOCITY * (delta / 1000)
    moveBy += moveBy * Math.abs(factor)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      ref={containerRef}
      className="relative z-10 overflow-hidden border-y border-border bg-background"
    >
      <div
        aria-hidden="true"
        className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]"
      />
      <div dir="ltr" className="overflow-hidden whitespace-nowrap py-7">
        <motion.div
          style={reduced ? {} : { x, skewX }}
          className="flex w-max items-center will-change-transform"
        >
          <MarqueeRow items={items} />
          <MarqueeRow items={items} hidden />
        </motion.div>
      </div>
    </div>
  )
}
