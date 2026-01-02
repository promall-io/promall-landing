"use client"

import { useState } from "react"
import { Check, Sparkles, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const t = useTranslations("pricing")

  const freePlanFeatures = t.raw("plans.free.features") as string[]
  const professionalPlanFeatures = t.raw("plans.professional.features") as string[]
  const enterprisePlanFeatures = t.raw("plans.enterprise.features") as string[]

  const plans = [
    {
      name: t("plans.free.name"),
      monthlyPrice: t("plans.free.monthlyPrice"),
      annualPrice: t("plans.free.annualPrice"),
      description: t("plans.free.description"),
      features: freePlanFeatures,
      buttonText: t("plans.free.buttonText"),
      popular: false,
      isEnterprise: false,
      icon: null,
    },
    {
      name: t("plans.professional.name"),
      monthlyPrice: t("plans.professional.monthlyPrice"),
      annualPrice: t("plans.professional.annualPrice"),
      description: t("plans.professional.description"),
      features: professionalPlanFeatures,
      buttonText: t("plans.professional.buttonText"),
      popular: true,
      popularLabel: t("plans.professional.popular"),
      isEnterprise: false,
      icon: Crown,
    },
    {
      name: t("plans.enterprise.name"),
      monthlyPrice: t("plans.enterprise.monthlyPrice"),
      annualPrice: t("plans.enterprise.annualPrice"),
      description: t("plans.enterprise.description"),
      features: enterprisePlanFeatures,
      buttonText: t("plans.enterprise.buttonText"),
      popular: false,
      isEnterprise: true,
      icon: Sparkles,
    },
  ]

  return (
    <section id="pricing-section" className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-primary/20 mb-8 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t("badge")}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-headline text-foreground mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <span className="block">{t("title.line1")}</span>
            <span className="block text-muted-foreground">{t("title.line2")}</span>
          </h2>

          {/* Description */}
          <p
            className="text-body-large text-muted-foreground max-w-xl mx-auto mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {t("description")}
          </p>

          {/* Toggle */}
          <div
            className="inline-flex items-center p-1.5 rounded-2xl glass border border-border/50 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                !isAnnual
                  ? "bg-foreground text-background shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("toggle.monthly")}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isAnnual
                  ? "bg-foreground text-background shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("toggle.annual")}
              <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {t("toggle.discount")}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const PlanIcon = plan.icon
            return (
              <div
                key={plan.name}
                className={`
                  relative group rounded-3xl flex flex-col overflow-hidden
                  opacity-0 animate-fade-in-up transition-all duration-500
                  ${plan.popular
                    ? "ring-2 ring-primary shadow-glow-primary scale-[1.02] z-10"
                    : "hover:ring-1 hover:ring-border/50"
                  }
                `}
                style={{
                  animationDelay: `${400 + index * 100}ms`,
                  animationFillMode: "forwards"
                }}
              >
                {/* Background */}
                <div className={`absolute inset-0 ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/10 via-card to-card"
                    : "card-feature"
                }`} />

                {/* Popular badge */}
                {plan.popular && plan.popularLabel && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div className="px-6 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-b-xl shadow-glow">
                      {plan.popularLabel}
                    </div>
                  </div>
                )}

                <div className="relative p-8 flex flex-col flex-1">
                  {/* Plan header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      {PlanIcon && (
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                          <PlanIcon className="w-5 h-5 text-primary" />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-foreground">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight text-foreground">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      {!plan.isEnterprise && (
                        <span className="text-base text-muted-foreground font-medium">
                          {t("currency")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer" className="mb-8">
                    <Button
                      className={`
                        w-full h-14 rounded-xl font-semibold text-base transition-all duration-300
                        ${plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-glow-strong"
                          : "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-border/50 hover:border-primary/30"
                        }
                      `}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>

                  {/* Features */}
                  <div className="space-y-4 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3 group/feature">
                        <div className={`
                          flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                          bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20
                          group-hover/feature:border-primary/40 transition-colors duration-300
                        `}>
                          <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm text-muted-foreground leading-relaxed group-hover/feature:text-foreground transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
