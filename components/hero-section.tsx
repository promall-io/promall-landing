"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, Sparkles, Clock, Code, Headphones, Play } from "lucide-react"
import { AuroraBackground } from "@/components/aurora-background"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center bg-background">
      {/* Real Aurora Borealis Background */}
      <div className="absolute inset-0 overflow-hidden">
        <AuroraBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-32">
        <div className="flex flex-col items-center text-center gap-12">
          {/* Enhanced Badge - Balanced */}
          <div className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-md hover:border-primary/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <Sparkles className="w-4 h-4 text-primary relative z-10" />
            <span className="text-sm font-semibold text-foreground relative z-10">
              {t("badge")}
            </span>
          </div>

          {/* Enhanced Heading - Balanced */}
          <div className="relative max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.15] tracking-tight animate-fade-in-up">
              <span className="text-foreground block drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                {t("title.line1")}
              </span>
              <span className="relative inline-block mt-2">
                <span className="text-primary block drop-shadow-[0_4px_20px_rgba(163,230,53,0.4)]">
                  {t("title.line2")}
                </span>
                <div className="absolute -inset-2 bg-primary/10 blur-2xl -z-10" />
              </span>
            </h1>
          </div>

          {/* Enhanced Description */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground/90 leading-relaxed max-w-3xl font-medium animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            {t("description")}
            <span className="block mt-2 text-base sm:text-lg text-muted-foreground/70">
              {t("subDescription")}
            </span>
          </p>

          {/* Enhanced CTA Buttons - Balanced */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
              <Button className="group relative inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(163,230,53,0.25)] hover:shadow-[0_0_45px_rgba(163,230,53,0.4)] transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Zap className="h-5 w-5 relative z-10" />
                <span className="relative z-10">{t("cta.primary")}</span>
              </Button>
            </Link>
            <Link href="#features-section">
              <Button variant="ghost" className="group relative inline-flex items-center gap-3 text-foreground hover:text-foreground px-6 py-6 rounded-full font-medium text-lg transition-all duration-300 hover:ring-2 hover:ring-primary/50">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 transition-all duration-300">
                  <Play className="h-4 w-4 text-primary fill-primary" />
                </div>
                <span className="relative">{t("cta.secondary")}</span>
              </Button>
            </Link>
          </div>

          {/* Stats - Subtle */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mt-12 animate-fade-in-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <div className="flex items-center gap-1.5 text-muted-foreground/40">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{t("stats.quickSetup")}</span>
            </div>
            <div className="w-0.5 h-0.5 rounded-full bg-primary/20" />
            <div className="flex items-center gap-1.5 text-muted-foreground/40">
              <Code className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{t("stats.noCoding")}</span>
            </div>
            <div className="w-0.5 h-0.5 rounded-full bg-primary/20" />
            <div className="flex items-center gap-1.5 text-muted-foreground/40">
              <Headphones className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{t("stats.dedicatedSupport")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
