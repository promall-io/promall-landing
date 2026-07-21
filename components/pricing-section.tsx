"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { WordsPullUp } from "@/components/cinema"
import { Check } from "@/components/icons"
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"
import { APP_URL } from "@/lib/site"

const PLAN_KEYS = ["free", "professional", "enterprise"] as const

export function PricingSection() {
  const t = useTranslations("pricing")
  const [annual, setAnnual] = useState(false)
  const period: "annualPrice" | "monthlyPrice" = annual
    ? "annualPrice"
    : "monthlyPrice"

  return (
    <section id="pricing" className="relative bg-background py-24 md:py-32">
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-14 max-w-2xl md:mb-20">
          <Reveal>
            <span className="mb-4 block text-[10px] font-bold text-gold ltr:tracking-widest sm:text-xs">
              {t("badge")}
            </span>
          </Reveal>
          <WordsPullUp
            as="h2"
            text={t("title")}
            showAsterisk
            className="text-3xl font-medium leading-[0.95] text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          />
          <Reveal as="p" delay={0.16} className="mt-6">
            <span className="text-pretty text-base leading-8 text-muted-cream sm:text-lg">
              {t("subtitle")}
            </span>
          </Reveal>

          <Reveal delay={0.24} className="mt-8">
            <div className="inline-flex items-center rounded-full border border-cream/15 bg-panel p-1">
              {(["monthly", "annual"] as const).map((option) => {
                const selected = annual === (option === "annual")
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setAnnual(option === "annual")}
                    className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      selected ? "text-black" : "text-muted-cream hover:text-cream"
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="pricing-toggle"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    ) : null}
                    <span className="relative flex items-center gap-1.5">
                      {t(`toggle.${option}`)}
                      {option === "annual" ? (
                        <span
                          className={`rounded-full px-2 py-px text-[10px] font-bold ${
                            selected
                              ? "bg-[#11192a] text-gold"
                              : "bg-gold/15 text-gold"
                          }`}
                        >
                          {t("toggle.discount")}
                        </span>
                      ) : null}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Stagger
          className="grid items-stretch gap-5 md:grid-cols-3"
          staggerChildren={0.1}
        >
          {PLAN_KEYS.map((plan) => {
            const popular = plan === "professional"
            const features = t.raw(`plans.${plan}.features`) as string[]
            const price = t(`plans.${plan}.${period}`)
            const showCurrency = t(`plans.${plan}.hasCurrency`) === "true"

            return (
              <StaggerItem key={plan} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-[2rem] border p-8 transition-all duration-500 ${
                    popular
                      ? "border-gold/40 bg-card shadow-ink md:-translate-y-3"
                      : "border-cream/10 bg-panel hover:-translate-y-1 hover:border-cream/20"
                  }`}
                >
                  {popular ? (
                    <span className="absolute -top-3.5 start-8 rounded-full bg-gold px-4 py-1 text-xs font-bold text-black">
                      {t("popularLabel")}
                    </span>
                  ) : null}

                  <h3 className="text-lg font-bold text-foreground">
                    {t(`plans.${plan}.name`)}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-cream">
                    {t(`plans.${plan}.description`)}
                  </p>

                  <div className="mt-6 flex h-12 items-baseline gap-2">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="text-4xl font-bold text-foreground"
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                    {showCurrency ? (
                      <span className="text-sm text-gold">
                        {t("currencySuffix")}
                      </span>
                    ) : null}
                  </div>

                  <ul className="mt-7 flex-1 space-y-3.5">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                            popular
                              ? "bg-gold/15 text-gold"
                              : "bg-cream/10 text-cream"
                          }`}
                        >
                          <Check className="size-3" />
                        </span>
                        <span className="text-sm leading-6 text-cream/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={APP_URL}
                    className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 ${
                      popular
                        ? "bg-primary text-black hover:bg-ink-deep"
                        : "border border-cream/20 text-cream hover:border-cream/50 hover:bg-cream/5"
                    }`}
                  >
                    {t(`plans.${plan}.cta`)}
                  </a>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal delay={0.2} className="mt-10">
          <p className="text-sm text-muted-cream">
            <span aria-hidden="true" className="me-1.5 text-gold">
              *
            </span>
            {t("footnote")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
