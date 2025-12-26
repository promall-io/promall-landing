"use client"

import { Package, ShoppingCart, Warehouse, CreditCard, Printer, BarChart3, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  index: number
}

function FeatureCard({ title, description, icon: Icon, index }: FeatureCardProps) {
  return (
    <div
      className="group relative p-8 rounded-2xl card-feature hover-lift opacity-0 animate-fade-in-up"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards"
      }}
    >
      {/* Icon */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-110">
          <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="text-base text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-primary/20 pointer-events-none" />
    </div>
  )
}

export function BentoSection() {
  const t = useTranslations("features")

  const features: { title: string; description: string; icon: LucideIcon }[] = [
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
    <section id="features-section" className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 opacity-0 animate-fade-in-up"
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
            <span className="block text-muted-foreground">{t("title.line2")}</span>
          </h2>

          {/* Description */}
          <p
            className="text-body-large text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {t("description")}
            <span className="text-primary font-medium"> {t("descriptionHighlight")}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
