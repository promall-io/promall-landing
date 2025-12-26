"use client"

import { useState } from "react"
import { Check } from "lucide-react"
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
    },
  ]

  return (
    <section id="pricing-section" className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
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
            className="text-body-large text-muted-foreground max-w-xl mx-auto mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {t("description")}
          </p>

          {/* Toggle */}
          <div
            className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !isAnnual
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("toggle.monthly")}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isAnnual
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("toggle.annual")}
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {t("toggle.discount")}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col opacity-0 animate-fade-in-up transition-all duration-300 ${
                plan.popular
                  ? "bg-foreground text-background border-2 border-foreground"
                  : "card-feature border border-white/10 hover:border-white/20"
              }`}
              style={{
                animationDelay: `${400 + index * 100}ms`,
                animationFillMode: "forwards"
              }}
            >
              {/* Popular badge */}
              {plan.popular && plan.popularLabel && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {plan.popularLabel}
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? "text-background" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-4xl font-bold tracking-tight ${plan.popular ? "text-background" : "text-foreground"}`}>
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                {!plan.isEnterprise && (
                  <span className={`text-sm ml-1 ${plan.popular ? "text-background/70" : "text-muted-foreground"}`}>
                    {t("currency")}
                  </span>
                )}
              </div>

              {/* CTA Button */}
              <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer" className="mb-8">
                <Button
                  className={`w-full h-12 rounded-full font-medium transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-white/10 text-foreground hover:bg-white/15 border border-white/10"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>

              {/* Features */}
              <div className="space-y-4 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? "bg-primary/20" : "bg-primary/10"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-primary" : "text-primary"}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-background/90" : "text-muted-foreground"}`}>
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
