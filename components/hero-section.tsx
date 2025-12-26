"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {/* Subtle spotlight effect */}
        <div className="absolute inset-0 bg-spotlight" />

        {/* Aurora glows */}
        <div className="aurora-container">
          <div className="aurora-glow aurora-glow-1" />
          <div className="aurora-glow aurora-glow-2" />
          <div className="aurora-glow aurora-glow-3" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-gentle-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              {t("badge")}
            </span>
          </div>

          {/* Main Heading - Apple style with tight letter spacing */}
          <h1
            className="text-display text-foreground mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <span className="block">{t("title.line1")}</span>
            <span className="block text-primary">{t("title.line2")}</span>
          </h1>

          {/* Description */}
          <p
            className="text-body-large text-muted-foreground max-w-2xl mb-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {t("description")}
          </p>

          <p
            className="text-caption text-muted-foreground/70 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
          >
            {t("subDescription")}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
          >
            <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
              <Button
                className="group h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-glow hover:shadow-glow-strong transition-all duration-300"
              >
                {t("cta.primary")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="group h-14 px-6 rounded-full text-foreground hover:bg-white/5 font-medium text-base transition-all duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mr-3 transition-all duration-300 group-hover:bg-white/15">
                <Play className="h-4 w-4 text-foreground fill-foreground" />
              </div>
              {t("cta.secondary")}
            </Button>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {t("stats.activeStores")}
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                {t("stats.activeStoresLabel")}
              </span>
            </div>

            <div className="hidden sm:block w-px h-12 bg-white/10" />

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {t("stats.ordersProcessed")}
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                {t("stats.ordersProcessedLabel")}
              </span>
            </div>

            <div className="hidden sm:block w-px h-12 bg-white/10" />

            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
                {t("stats.uptime")}
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                {t("stats.uptimeLabel")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
