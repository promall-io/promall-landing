import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Check, Zap } from "lucide-react"
import { getTranslations } from "next-intl/server"

export async function CTASection() {
  const t = await getTranslations("cta")

  const trustIndicators = [
    t("trustIndicators.install"),
    t("trustIndicators.support"),
    t("trustIndicators.unlimited"),
  ]

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary/10 via-accent/8 to-primary/10 rounded-full blur-[200px]" />

        {/* Aurora effects */}
        <div className="aurora-container">
          <div className="absolute w-[500px] h-[500px] -top-32 -left-32 rounded-full bg-primary/10 blur-[120px] animate-float" />
          <div className="absolute w-[400px] h-[400px] -bottom-32 -right-32 rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: '-5s' }} />
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/0.02)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8">
        {/* CTA Card */}
        <div className="relative rounded-3xl card-elevated p-10 md:p-16 text-center overflow-hidden">
          {/* Card gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

          {/* Badge */}
          <div
            className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-primary/20 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent">
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-primary">
              {t("badge")}
            </span>
          </div>

          {/* Title */}
          <h2
            className="relative text-headline text-foreground mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <span className="block">{t("title.line1")}</span>
            <span className="block gradient-text">{t("title.line2")}</span>
          </h2>

          {/* Description */}
          <p
            className="relative text-body-large text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {t("description")} <span className="text-foreground font-medium">{t("descriptionHighlight")}</span> {t("descriptionEnd")}
          </p>

          {/* CTA Buttons */}
          <div
            className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
              <Button
                className="group relative h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base overflow-hidden transition-all duration-300 shadow-glow hover:shadow-glow-strong"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer opacity-30" />
                <span className="relative flex items-center">
                  {t("buttons.primary")}
                  <ArrowRight className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="h-14 px-8 rounded-2xl text-foreground hover:bg-primary/5 font-medium text-base border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <Sparkles className="ml-2 h-4 w-4 text-primary" />
              {t("buttons.secondary")}
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className="relative flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2.5 group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                  <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">{indicator}</span>
              </div>
            ))}
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/8 to-transparent rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-accent/8 to-transparent rounded-br-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
