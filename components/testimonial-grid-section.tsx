"use client"

import { Smartphone, Zap, Shield, TrendingUp, Users, Sparkles, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export function TestimonialGridSection() {
  const t = useTranslations("testimonials")

  const benefits: { key: string; icon: LucideIcon; gradient: string }[] = [
    { key: "modernDesign", icon: Smartphone, gradient: "from-primary/20 to-accent/10" },
    { key: "speed", icon: Zap, gradient: "from-accent/20 to-primary/10" },
    { key: "security", icon: Shield, gradient: "from-primary/15 to-accent/15" },
    { key: "salesGrowth", icon: TrendingUp, gradient: "from-accent/15 to-primary/20" },
    { key: "support", icon: Users, gradient: "from-primary/20 to-accent/15" },
    { key: "updates", icon: Sparkles, gradient: "from-accent/20 to-primary/15" },
  ]

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
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

          <h2
            className="text-headline text-foreground mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-body-large text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
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
                className="group relative rounded-3xl overflow-hidden opacity-0 animate-fade-in-up cursor-pointer"
                style={{
                  animationDelay: `${200 + index * 80}ms`,
                  animationFillMode: "forwards"
                }}
              >
                {/* Card Background */}
                <div className="absolute inset-0 card-feature transition-all duration-500 group-hover:border-primary/20" />

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/15 transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow group-hover:border-primary/25">
                      <Icon className="w-7 h-7 text-primary transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight transition-colors duration-300 group-hover:text-primary">
                    {t(`benefits.${benefit.key}.title`)}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t(`benefits.${benefit.key}.description`)}
                  </p>

                  {/* Bottom decoration */}
                  <div className="mt-6">
                    <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary/50 to-accent/50 transition-all duration-500 group-hover:w-20" />
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 divider-line" />
      <div className="absolute bottom-0 left-0 right-0 divider-line" />
    </section>
  )
}
