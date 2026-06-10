"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { animate, useInView, useReducedMotion } from "framer-motion"
import { Stagger, StaggerItem } from "@/components/motion"

type StatConfig = {
  key: string
  value: number
  decimals?: number
  prefix?: { fa: string; en: string }
  suffix?: { fa: string; en: string }
  static?: { fa: string; en: string }
  sizeClass?: string
}

const STATS: StatConfig[] = [
  { key: "activeShops", value: 10000, prefix: { fa: "+", en: "+" } },
  {
    key: "ordersProcessed",
    value: 2,
    suffix: { fa: " میلیون", en: "M" },
    prefix: { fa: "+", en: "+" },
    sizeClass: "text-3xl md:text-3xl lg:text-4xl",
  },
  { key: "uptime", value: 99.9, decimals: 1, suffix: { fa: "٪", en: "%" } },
  { key: "support", value: 0, static: { fa: "۲۴/۷", en: "24/7" } },
]

function AnimatedNumber({ stat }: { stat: StatConfig }) {
  const locale = useLocale() as "fa" | "en"
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(stat.static ? stat.static[locale] : "")

  useEffect(() => {
    if (stat.static) return
    const format = (value: number) =>
      `${stat.prefix?.[locale] ?? ""}${value.toLocaleString(
        locale === "fa" ? "fa-IR" : "en-US",
        {
          minimumFractionDigits: stat.decimals ?? 0,
          maximumFractionDigits: stat.decimals ?? 0,
        },
      )}${stat.suffix?.[locale] ?? ""}`

    if (!inView) return
    if (reduced) {
      setDisplay(format(stat.value))
      return
    }
    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(format(value)),
    })
    return () => controls.stop()
  }, [inView, locale, reduced, stat])

  return (
    <span ref={ref} className="tabular-nums">
      {display || " "}
    </span>
  )
}

export function StatsSection() {
  const t = useTranslations("stats")

  return (
    <section className="relative bg-white">
      <Stagger
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-14 px-5 py-20 md:grid-cols-4 md:py-28"
        staggerChildren={0.08}
      >
        {STATS.map((stat, index) => (
          <StaggerItem
            key={stat.key}
            className={`relative flex flex-col justify-end text-center ${
              index > 0 ? "md:border-s md:border-ink/10" : ""
            }`}
          >
            <p
              className={`text-gradient-ink whitespace-nowrap font-extrabold tracking-tight ${
                stat.sizeClass ?? "text-3xl md:text-4xl lg:text-5xl"
              }`}
            >
              <AnimatedNumber stat={stat} />
            </p>
            <p className="mt-3 text-sm font-medium text-muted-foreground md:text-base">
              <span className="me-2 text-gold-deep">✦</span>
              {t(stat.key)}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
