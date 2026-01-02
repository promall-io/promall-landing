"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {/* Subtle spotlight effect */}
        <div className="absolute inset-0 bg-spotlight" />

        {/* Premium Aurora glows */}
        <div className="aurora-container">
          <div className="aurora-glow aurora-glow-1" />
          <div className="aurora-glow aurora-glow-2" />
          <div className="aurora-glow aurora-glow-3" />
        </div>

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-mesh opacity-50" />

        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/3 right-[10%] w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Badge with gradient border */}
          <div
            className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 opacity-0 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            {/* Glass background */}
            <div className="absolute inset-0 rounded-full glass" />
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-full glow-border" />
            {/* Content */}
            <div className="relative flex items-center gap-2.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </span>
              <span className="text-sm font-medium text-foreground">
                {t("badge")}
              </span>
            </div>
          </div>

          {/* Main Heading - Apple style with gradient text */}
          <h1
            className="text-display text-foreground mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <span className="block">{t("title.line1")}</span>
            <span className="block gradient-text">{t("title.line2")}</span>
          </h1>

          {/* Description */}
          <p
            className="text-body-large text-muted-foreground max-w-2xl mb-5 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {t("description")}
          </p>

          <p
            className="text-caption text-muted-foreground/70 mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
          >
            {t("subDescription")}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 mb-20 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
          >
            <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
              <Button
                className="group relative h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base overflow-hidden transition-all duration-300 shadow-glow hover:shadow-glow-strong"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer opacity-30" />
                <span className="relative flex items-center">
                  {t("cta.primary")}
                  <ArrowRight className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="group h-14 px-6 rounded-2xl text-foreground hover:bg-primary/5 font-medium text-base transition-all duration-300 border border-border/50 hover:border-primary/30"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 ml-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <Play className="h-4 w-4 text-primary fill-primary" />
              </div>
              {t("cta.secondary")}
            </Button>
          </div>

          {/* Stats with glass cards */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
          >
            {/* Stat Card 1 */}
            <div className="group relative px-8 py-6 rounded-2xl card-feature hover-lift cursor-pointer">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight block mb-1">
                  {t("stats.activeStores")}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("stats.activeStoresLabel")}
                </span>
              </div>
            </div>

            {/* Divider - Hidden on mobile */}
            <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent" />

            {/* Stat Card 2 */}
            <div className="group relative px-8 py-6 rounded-2xl card-feature hover-lift cursor-pointer">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight block mb-1">
                  {t("stats.ordersProcessed")}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("stats.ordersProcessedLabel")}
                </span>
              </div>
            </div>

            {/* Divider - Hidden on mobile */}
            <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-border to-transparent" />

            {/* Stat Card 3 */}
            <div className="group relative px-8 py-6 rounded-2xl card-feature hover-lift cursor-pointer">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold gradient-text tracking-tight block mb-1">
                  {t("stats.uptime")}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("stats.uptimeLabel")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-primary animate-gentle-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
