"use client"

import { useTranslations } from "next-intl"
import { Upload, Palette, Rocket } from "lucide-react"

export function HowItWorksSection() {
  const t = useTranslations("howItWorks")

  const steps = [
    {
      number: t("steps.connect.number"),
      title: t("steps.connect.title"),
      description: t("steps.connect.description"),
      icon: Upload,
    },
    {
      number: t("steps.customize.number"),
      title: t("steps.customize.title"),
      description: t("steps.customize.description"),
      icon: Palette,
    },
    {
      number: t("steps.grow.number"),
      title: t("steps.grow.title"),
      description: t("steps.grow.description"),
      icon: Rocket,
    },
  ]

  return (
    <section id="how-it-works-section" className="relative w-full py-24 md:py-32 lg:py-40">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
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
            <span className="block text-primary">{t("title.line2")}</span>
          </h2>

          {/* Description */}
          <p
            className="text-body-large text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {t("description")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative group opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${300 + index * 150}ms`,
                  animationFillMode: "forwards"
                }}
              >
                {/* Connection line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-60px)] h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}

                {/* Step content */}
                <div className="text-center lg:text-left">
                  {/* Number and Icon */}
                  <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
                    {/* Large number */}
                    <span className="text-6xl lg:text-7xl font-bold text-white/5 tracking-tighter select-none">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-105 group-hover:border-primary/30">
                      <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight transition-colors duration-300 group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
