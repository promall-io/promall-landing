"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const t = useTranslations("pricing")
  const locale = useLocale()

  const pricingPlans = [
    {
      key: "free",
      name: t("plans.free.name"),
      monthlyPrice: t("plans.free.monthlyPrice"),
      annualPrice: t("plans.free.annualPrice"),
      description: t("plans.free.description"),
      features: t.raw("plans.free.features") as string[],
      buttonText: t("plans.free.buttonText"),
      popular: false,
    },
    {
      key: "professional",
      name: t("plans.professional.name"),
      monthlyPrice: t("plans.professional.monthlyPrice"),
      annualPrice: t("plans.professional.annualPrice"),
      description: t("plans.professional.description"),
      features: t.raw("plans.professional.features") as string[],
      buttonText: t("plans.professional.buttonText"),
      popular: true,
      popularLabel: t("plans.professional.popular"),
    },
    {
      key: "enterprise",
      name: t("plans.enterprise.name"),
      monthlyPrice: t("plans.enterprise.monthlyPrice"),
      annualPrice: t("plans.enterprise.annualPrice"),
      description: t("plans.enterprise.description"),
      features: t.raw("plans.enterprise.features") as string[],
      buttonText: t("plans.enterprise.buttonText"),
      popular: false,
    },
  ]

  return (
    <section id="pricing-section" className="relative w-full py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/30 shadow-glow-primary animate-fade-in-up">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm md:text-base font-black text-primary tracking-tight">{t("badge")}</span>
          </div>

          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {t("title.line1")}
            <br />
            <span className="text-primary">{t("title.line2")}</span>
          </h2>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("description")}
          </p>

          {/* Toggle - Enhanced */}
          <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="inline-flex items-center p-1.5 bg-card/60 backdrop-blur-sm rounded-full border border-primary/30 shadow-medium">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                  !isAnnual
                    ? "bg-primary text-primary-foreground shadow-glow-primary scale-105"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("toggle.monthly")}
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  isAnnual
                    ? "bg-primary text-primary-foreground shadow-glow-primary scale-105"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{t("toggle.annual")}</span>
                <span className="text-xs bg-primary-foreground/30 px-2 py-0.5 rounded-full font-black">{t("toggle.discount")}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.key}
              className={`group relative rounded-3xl p-8 md:p-10 flex flex-col transition-all duration-500 hover-lift ${
                plan.popular
                  ? "bg-primary border-2 border-primary shadow-galaxy hover:shadow-galaxy-hover scale-105 hover:scale-110"
                  : "bg-card/50 backdrop-blur-sm border-2 border-border/60 hover:border-primary/50 shadow-medium hover:shadow-strong"
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
            >
              {/* Gradient Overlay for Non-Popular */}
              {!plan.popular && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}

              {plan.popular && plan.popularLabel && (
                <div
                  className="absolute -top-4 right-1/2 translate-x-1/2 px-6 py-2 bg-primary-foreground text-primary text-sm font-black rounded-full shadow-strong animate-bounce"
                  style={{ animationIterationCount: "3", animationDuration: "1s" }}
                >
                  {plan.popularLabel}
                </div>
              )}

              <div className="relative mb-8">
                <h3
                  className={`text-2xl md:text-3xl font-black mb-3 ${plan.popular ? "text-primary-foreground" : "text-foreground group-hover:text-primary transition-colors"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-base ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground group-hover:text-foreground/80 transition-colors"}`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="relative mb-8 md:mb-10">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-4xl md:text-5xl font-black transition-all duration-300 ${plan.popular ? "text-primary-foreground" : "text-foreground group-hover:text-primary"}`}
                  >
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.key !== "enterprise" && (
                    <span
                      className={`text-lg font-bold ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      {t("currency")}
                    </span>
                  )}
                </div>
              </div>

              <Button
                className={`relative w-full mb-10 py-7 rounded-full font-black text-lg overflow-hidden transition-all duration-500 ${
                  plan.popular
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-strong hover:scale-105"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary hover:shadow-galaxy-hover hover:scale-105"
                }`}
              >
                <span className="relative z-10">{plan.buttonText}</span>
                {!plan.popular && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                )}
              </Button>

              <div className="relative space-y-5">
                {plan.features.map((feature, idx) => (
                  <div
                    key={feature}
                    className="flex items-start gap-4 transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${plan.popular ? "bg-primary-foreground/20" : "bg-primary/15"}`}
                    >
                      <Check className={`w-4 h-4 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <span
                      className={`text-base font-medium ${plan.popular ? "text-primary-foreground/95" : "text-foreground/80"}`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
