"use client"

import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"
import { WordsPullUp } from "@/components/cinema"
import { Instagram, Package, Rocket, type LucideIcon } from "@/components/icons"
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"

const STEPS: { key: string; icon: LucideIcon }[] = [
  { key: "create", icon: Rocket },
  { key: "stock", icon: Package },
  { key: "sell", icon: Instagram },
]

export function HowItWorksSection() {
  const t = useTranslations("howItWorks")
  const reduced = useReducedMotion()

  return (
    <section className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-16 max-w-2xl md:mb-24">
          <Reveal>
            <span className="mb-4 block text-[10px] font-bold text-gold ltr:tracking-widest sm:text-xs">
              {t("badge")}
            </span>
          </Reveal>
          <WordsPullUp
            as="h2"
            text={t("title")}
            className="text-3xl font-medium leading-[0.95] text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          />
        </div>

        <div className="relative">
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-1 top-[4.5px] hidden h-px origin-left bg-cream/10 md:block rtl:origin-right"
            initial={{ scaleX: reduced ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          />
          <Stagger
            className="grid gap-12 md:grid-cols-3 md:gap-10"
            staggerChildren={0.15}
          >
            {STEPS.map((step, index) => (
              <StaggerItem key={step.key} className="relative ps-9 md:ps-0">
                <span
                  aria-hidden="true"
                  className="absolute start-0 top-1 block size-2.5 rounded-full bg-gold md:relative md:top-0 md:mb-10"
                />
                {index < STEPS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-14 start-[4.5px] top-4 w-px bg-cream/10 md:hidden"
                  />
                ) : null}
                <div className="relative mb-5 flex h-20 items-end md:h-24">
                  <span
                    aria-hidden="true"
                    className="ghost-numeral pointer-events-none absolute -top-3 start-0 text-[5.5rem] md:text-[6.5rem]"
                  >
                    {t(`steps.${step.key}.number`)}
                  </span>
                  <span className="relative flex size-12 items-center justify-center rounded-2xl bg-panel">
                    <step.icon variant="bold" className="size-5 text-gold" />
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="mt-3 max-w-xs text-pretty text-sm leading-7 text-muted-cream">
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
