"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion"

const BASE_VELOCITY = -2.4

export function MarqueeBand() {
  const t = useTranslations("marquee")
  const reduced = useReducedMotion()
  const items = t.raw("items") as string[]
  const row = [...items, ...items]

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
    if (reduced) return
    const factor = velocityFactor.get()
    if (factor < 0) directionRef.current = -1
    else if (factor > 0) directionRef.current = 1

    let moveBy = directionRef.current * BASE_VELOCITY * (delta / 1000)
    moveBy += moveBy * Math.abs(factor)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="relative z-10 overflow-hidden bg-background">
      <div dir="ltr" className="overflow-hidden whitespace-nowrap py-7">
        <motion.div
          style={reduced ? {} : { x, skewX }}
          className="flex w-max items-center will-change-transform"
        >
          {row.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-10 px-10 text-[13px] font-semibold text-muted-foreground transition-colors duration-300 hover:text-muted-foreground"
            >
              {item}
              <span className="text-[9px] text-gold-deep/60">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
