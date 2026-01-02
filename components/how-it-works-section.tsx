"use client"

import { useTranslations } from "next-intl"
import { Upload, Palette, Rocket, ArrowLeft } from "lucide-react"

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
    <section id="how-it-works-section" className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-primary/5 via-accent/8 to-primary/5 rounded-full blur-[150px]" />

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/0.03)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-primary/20 mb-8 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-gentle-pulse" />
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
            <span className="block gradient-text">{t("title.line2")}</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
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
                {/* Connection Arrow (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-16 left-full w-full items-center justify-center z-10 -translate-x-1/2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-px bg-gradient-to-r from-primary/50 to-primary/20" />
                      <ArrowLeft className="w-4 h-4 text-primary/50 rotate-180" />
                    </div>
                  </div>
                )}

                {/* Step Card */}
                <div className="relative h-full rounded-3xl card-elevated hover-lift p-8 lg:p-10 text-center transition-all duration-500 group-hover:border-primary/20">
                  {/* Step Number - Background */}
                  <div className="absolute top-6 right-6 text-7xl font-bold text-primary/5 tracking-tighter select-none transition-colors duration-500 group-hover:text-primary/10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 mb-8 transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow group-hover:border-primary/30">
                    <Icon className="w-9 h-9 text-primary transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  </div>

                  {/* Text content */}
                  <h3 className="text-xl font-semibold text-foreground mb-4 tracking-tight transition-colors duration-300 group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-8">
                    <div className="mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-20" />
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
