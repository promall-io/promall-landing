"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"

const PLAN_KEYS = ["free", "professional", "enterprise"] as const

export function PricingSection() {
  const t = useTranslations("pricing")
  const [annual, setAnnual] = useState(false)
  const period: "annualPrice" | "monthlyPrice" = annual
    ? "annualPrice"
    : "monthlyPrice"

  return (
    <section id="pricing" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <Reveal>
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {t("badge")}
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.08}>
            <span className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              {t("title")}
            </span>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-5">
            <span className="text-pretty text-lg leading-8 text-muted-foreground">
              {t("subtitle")}
            </span>
          </Reveal>

          <Reveal delay={0.24} className="mt-8">
            <div className="inline-flex items-center rounded-full border border-border bg-background p-1">
              {(["monthly", "annual"] as const).map((option) => {
                const selected = annual === (option === "annual")
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnnual(option === "annual")}
                    className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      selected ? "text-white" : "text-muted-foreground"
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="pricing-toggle"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    ) : null}
                    <span className="relative flex items-center gap-1.5">
                      {t(`toggle.${option}`)}
                      {option === "annual" ? (
                        <span
                          className={`rounded-full px-2 py-px text-[10px] font-bold ${
                            selected
                              ? "bg-gold text-ink"
                              : "bg-primary/10 text-primary"
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
                  className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 ${
                    popular
                      ? "border-ink bg-gradient-to-b from-ink to-ink-deep text-white shadow-ink md:-translate-y-3"
                      : "border-border bg-background hover:-translate-y-1 hover:shadow-card"
                  }`}
                >
                  {popular ? (
                    <span className="absolute -top-3.5 right-8 rounded-full bg-gold px-4 py-1 text-xs font-bold text-ink ltr:left-8 ltr:right-auto">
                      {t("popularLabel")}
                    </span>
                  ) : null}

                  <h3
                    className={`text-lg font-bold ${popular ? "text-white" : "text-ink"}`}
                  >
                    {t(`plans.${plan}.name`)}
                  </h3>
                  <p
                    className={`mt-1.5 text-sm ${popular ? "text-white/60" : "text-muted-foreground"}`}
                  >
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
                        className={`text-4xl font-bold tracking-tight ${popular ? "text-white" : "text-ink"}`}
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                    {showCurrency ? (
                      <span
                        className={`text-sm ${popular ? "text-white/60" : "text-muted-foreground"}`}
                      >
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
                              ? "bg-gold/20 text-gold"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Check className="size-3" />
                        </span>
                        <span
                          className={`text-sm leading-6 ${popular ? "text-white/80" : "text-foreground/80"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://app.promall.io"
                    className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 ${
                      popular
                        ? "bg-gold text-ink hover:bg-gold-deep"
                        : "border border-ink/15 bg-white text-ink hover:border-ink hover:bg-ink hover:text-white"
                    }`}
                  >
                    {t(`plans.${plan}.cta`)}
                  </a>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">{t("footnote")}</p>
        </Reveal>
      </div>
    </section>
  )
}
