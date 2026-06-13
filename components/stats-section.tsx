"use client"

import { useTranslations } from "next-intl"
import { Stagger, StaggerItem } from "@/components/motion"

const STAT_KEYS = ["alwaysOn", "dmToPay", "gateways", "trial"] as const

export function StatsSection() {
  const t = useTranslations("stats")

  return (
    <section className="relative bg-white">
      <Stagger
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-5 py-20 md:grid-cols-4 md:py-28"
        staggerChildren={0.08}
      >
        {STAT_KEYS.map((key, index) => (
          <StaggerItem
            key={key}
            className={`relative flex flex-col justify-end text-center ${
              index > 0 ? "md:border-s md:border-ink/10" : ""
            }`}
          >
            <p className="text-gradient-ink text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
              {t(`${key}.value`)}
            </p>
            <p className="mt-3 text-balance text-sm font-medium leading-6 text-muted-foreground md:text-base">
              <span className="me-2 text-gold-deep">✦</span>
              {t(`${key}.label`)}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
