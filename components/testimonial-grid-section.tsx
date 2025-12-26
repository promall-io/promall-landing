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
    <section className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className="text-headline text-foreground mb-4 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-body-large text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            {t("description")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.key}
                className="group p-8 rounded-2xl card-feature hover-lift opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${200 + index * 80}ms`,
                  animationFillMode: "forwards"
                }}
              >
                {/* Icon */}
                <div className="mb-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {t(`benefits.${benefit.key}.title`)}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t(`benefits.${benefit.key}.description`)}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
