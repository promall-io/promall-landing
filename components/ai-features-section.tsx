"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, ArrowUpRight, ShoppingBag, Sparkles, ArrowRight, Zap, Bot } from "lucide-react"

export function AIFeaturesSection() {
  const t = useTranslations("aiFeatures")

  const capabilities = [
    {
      key: "instantResponses",
      icon: MessageSquare,
      gradient: "from-primary/20 to-accent/10",
    },
    {
      key: "smartEscalation",
      icon: ArrowUpRight,
      gradient: "from-accent/20 to-primary/10",
    },
    {
      key: "orderCreation",
      icon: ShoppingBag,
      gradient: "from-primary/15 to-accent/15",
    },
    {
      key: "brandVoice",
      icon: Sparkles,
      gradient: "from-accent/15 to-primary/20",
    },
  ]

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-mesh opacity-60" />

        {/* Top and bottom lines */}
        <div className="absolute top-0 left-0 right-0 divider-glow" />
        <div className="absolute bottom-0 left-0 right-0 divider-glow" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 left-[10%] w-80 h-80 rounded-full bg-accent/5 blur-[100px] animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-primary/20 mb-8 opacity-0 animate-fade-in-up"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent">
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
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
              className="text-body-large text-muted-foreground mb-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              {t("description")}
            </p>

            {/* CTA */}
            <div
              className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
                <Button
                  className="group h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base transition-all duration-300 shadow-glow hover:shadow-glow-strong"
                >
                  {t("cta")}
                  <ArrowRight className="ms-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="h-12 px-6 rounded-xl text-foreground hover:bg-primary/5 font-medium text-base border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <Zap className="me-2 h-4 w-4 text-primary" />
                {t("badge")}
              </Button>
            </div>
          </div>

          {/* Right side - Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <div
                  key={capability.key}
                  className="group relative rounded-2xl overflow-hidden opacity-0 animate-fade-in-up cursor-pointer"
                  style={{
                    animationDelay: `${400 + index * 100}ms`,
                    animationFillMode: "forwards"
                  }}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 card-feature transition-all duration-500 group-hover:border-primary/20" />

                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Icon */}
                    <div className="mb-5">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/15 transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow group-hover:border-primary/25">
                        <Icon className="w-5 h-5 text-primary transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight transition-colors duration-300 group-hover:text-primary">
                      {t(`capabilities.${capability.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`capabilities.${capability.key}.description`)}
                    </p>

                    {/* Animated arrow */}
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs font-medium text-primary">{t("cta")}</span>
                      <ArrowRight className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
