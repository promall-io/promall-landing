"use client"

import { Package, ShoppingCart, Warehouse, CreditCard, Printer, BarChart3, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

const BentoCard = ({ title, description, icon: Icon, index }: { title: string; description: string; icon: LucideIcon; index: number }) => (
  <div
    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-500 hover:shadow-strong hover:shadow-primary/20 hover-lift hover-shine"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* Shine Effect Border */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <div className="relative p-7 md:p-9 flex flex-col gap-6 h-full">
      {/* Icon Container - Enhanced */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-500 shadow-soft">
        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Icon className="relative w-7 h-7 md:w-8 md:h-8 text-primary group-hover:rotate-6 transition-transform duration-500" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
      </div>
    </div>
  </div>
)

export function BentoSection() {
  const t = useTranslations("features")

  const cards = [
    {
      title: t("cards.productManagement.title"),
      description: t("cards.productManagement.description"),
      icon: Package,
    },
    {
      title: t("cards.orderControl.title"),
      description: t("cards.orderControl.description"),
      icon: ShoppingCart,
    },
    {
      title: t("cards.inventoryManagement.title"),
      description: t("cards.inventoryManagement.description"),
      icon: Warehouse,
    },
    {
      title: t("cards.securePayment.title"),
      description: t("cards.securePayment.description"),
      icon: CreditCard,
    },
    {
      title: t("cards.autoPrinting.title"),
      description: t("cards.autoPrinting.description"),
      icon: Printer,
    },
    {
      title: t("cards.completeReports.title"),
      description: t("cards.completeReports.description"),
      icon: BarChart3,
    },
  ]

  return (
    <section id="features-section" className="relative w-full py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/30 shadow-glow-primary animate-fade-in-up">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm md:text-base font-black text-primary tracking-tight">{t("badge")}</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t("title.line1")}
            <br />
            <span className="text-primary">{t("title.line2")}</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t("description")}
            <span className="text-primary font-bold"> {t("descriptionHighlight")}</span>
          </p>
        </div>

        {/* Cards Grid - Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {cards.map((card, index) => (
            <BentoCard key={card.title} {...card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
