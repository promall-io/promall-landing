"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function CTASection() {
  const t = useTranslations("cta")

  const trustIndicators = [
    t("trustIndicators.install"),
    t("trustIndicators.support"),
    t("trustIndicators.unlimited"),
  ]

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8 opacity-0 animate-fade-in-up"
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
          className="text-body-large text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          {t("description")} <span className="text-foreground font-medium">{t("descriptionHighlight")}</span> {t("descriptionEnd")}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
            <Button
              className="group h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-glow hover:shadow-glow-strong transition-all duration-300"
            >
              {t("buttons.primary")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            className="h-14 px-8 rounded-full text-foreground hover:bg-white/5 font-medium text-base border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            {t("buttons.secondary")}
          </Button>
        </div>

        {/* Trust indicators */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">{indicator}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
