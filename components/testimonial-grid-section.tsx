"use client"

import { Smartphone, Zap, Shield, TrendingUp, Users, Sparkles, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export function TestimonialGridSection() {
  const t = useTranslations("testimonials")

  const benefits: { key: string; icon: LucideIcon }[] = [
    { key: "modernDesign", icon: Smartphone },
    { key: "speed", icon: Zap },
    { key: "security", icon: Shield },
    { key: "salesGrowth", icon: TrendingUp },
    { key: "support", icon: Users },
    { key: "updates", icon: Sparkles },
  ]

  return (
    <section className="w-full px-4 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.key}
                className="group relative flex flex-col p-6 md:p-8 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col gap-5">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-foreground text-xl md:text-2xl font-bold">
                      {t(`benefits.${benefit.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {t(`benefits.${benefit.key}.description`)}
                    </p>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
