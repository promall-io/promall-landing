"use client"

import { useLocale, useTranslations } from "next-intl"
import { Stagger, StaggerItem } from "@/components/motion"

const STAT_KEYS = ["alwaysOn", "dmToPay", "gateways", "trial"] as const

export function StatsSection() {
  const t = useTranslations("stats")
  const locale = useLocale()

  return (
    <section className="relative bg-background">
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />
      <Stagger
        className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-14 px-5 py-24 md:grid-cols-4 md:py-32"
        staggerChildren={0.08}
      >
        {STAT_KEYS.map((key, index) => (
          <StaggerItem
            key={key}
            className={`relative flex flex-col justify-end gap-4 text-center ${
              index > 0 ? "md:border-s md:border-cream/10" : ""
            }`}
          >
            <p
              className="text-balance text-4xl font-bold leading-[0.95] md:text-5xl lg:text-6xl"
              style={{ color: "#E1E0CC" }}
            >
              {t(`${key}.value`)}
            </p>
            <p
              className={`text-balance text-[10px] font-bold leading-6 text-gold sm:text-xs ${
                locale === "fa" ? "" : "uppercase tracking-widest"
              }`}
            >
              <span aria-hidden="true" className="me-2">
                ✦
              </span>
              {t(`${key}.label`)}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
