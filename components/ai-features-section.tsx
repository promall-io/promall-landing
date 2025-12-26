"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, ArrowUpRight, ShoppingBag, Sparkles, ArrowRight } from "lucide-react"

export function AIFeaturesSection() {
  const t = useTranslations("aiFeatures")

  const capabilities = [
    {
      key: "instantResponses",
      icon: MessageSquare,
    },
    {
      key: "smartEscalation",
      icon: ArrowUpRight,
    },
    {
      key: "orderCreation",
      icon: ShoppingBag,
    },
    {
      key: "brandVoice",
      icon: Sparkles,
    },
  ]

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6 opacity-0 animate-fade-in-up"
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
              <span className="block text-primary">{t("title.line2")}</span>
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
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
            >
              <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
                <Button
                  className="group h-12 px-6 rounded-full bg-white/10 hover:bg-white/15 text-foreground font-medium text-base border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {t("cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <div
                  key={capability.key}
                  className="group p-6 rounded-2xl card-feature hover-lift opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${400 + index * 100}ms`,
                    animationFillMode: "forwards"
                  }}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight transition-colors duration-300 group-hover:text-primary">
                    {t(`capabilities.${capability.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`capabilities.${capability.key}.description`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
