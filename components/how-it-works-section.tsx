"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Instagram, Package, Rocket, type LucideIcon } from "@/components/icons"
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"

const STEPS: { key: string; icon: LucideIcon }[] = [
  { key: "create", icon: Rocket },
  { key: "stock", icon: Package },
  { key: "sell", icon: Instagram },
]

export function HowItWorksSection() {
  const t = useTranslations("howItWorks")

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <Reveal>
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {t("badge")}
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.08}>
            <span className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("title")}
            </span>
          </Reveal>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-[16%] top-10 hidden h-px origin-right bg-primary/20 md:block rtl:origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          />
          <Stagger
            className="grid gap-10 md:grid-cols-3 md:gap-8"
            staggerChildren={0.15}
          >
            {STEPS.map((step) => (
              <StaggerItem key={step.key} className="relative text-center">
                <div className="relative mx-auto mb-2 flex h-28 items-end justify-center">
                  <span
                    aria-hidden="true"
                    className="ghost-numeral pointer-events-none absolute inset-x-0 -top-2 text-[6.5rem]"
                  >
                    {t(`steps.${step.key}.number`)}
                  </span>
                  <span className="relative flex size-14 items-center justify-center rounded-2xl bg-card shadow-card">
                    <step.icon variant="bold" className="size-6 text-primary" />
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-pretty text-sm leading-7 text-muted-foreground">
                  {t(`steps.${step.key}.description`)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
