"use client"

import { Package, ShoppingCart, Warehouse, CreditCard, Printer, BarChart3, type LucideIcon, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  index: number
  featured?: boolean
}

function FeatureCard({ title, description, icon: Icon, index, featured }: FeatureCardProps) {
  return (
    <div
      className={`
        group relative rounded-3xl overflow-hidden cursor-pointer
        ${featured ? "md:col-span-2 md:row-span-2" : ""}
        opacity-0 animate-fade-in-up
      `}
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "forwards"
      }}
    >
      {/* Card Background with Glass Effect */}
      <div className={`
        absolute inset-0 card-feature transition-all duration-500
        group-hover:border-primary/20
      `} />

      {/* Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-accent/5 transition-all duration-500 rounded-3xl" />

      {/* Content */}
      <div className={`relative p-8 ${featured ? "md:p-10" : ""} h-full flex flex-col`}>
        {/* Icon Container */}
        <div className="mb-6">
          <div className={`
            inline-flex items-center justify-center rounded-2xl
            bg-gradient-to-br from-primary/10 to-accent/5
            border border-primary/10
            transition-all duration-500
            group-hover:scale-110 group-hover:border-primary/20 group-hover:shadow-glow
            ${featured ? "w-16 h-16" : "w-14 h-14"}
          `}>
            <Icon className={`text-primary transition-transform duration-500 group-hover:scale-110 ${featured ? "w-8 h-8" : "w-6 h-6"}`} strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <h3 className={`
          font-semibold text-foreground mb-3 tracking-tight
          transition-colors duration-300 group-hover:text-primary
          ${featured ? "text-2xl" : "text-xl"}
        `}>
          {title}
        </h3>
        <p className={`
          text-muted-foreground leading-relaxed flex-1
          ${featured ? "text-lg" : "text-base"}
        `}>
          {description}
        </p>

        {/* Bottom decoration line */}
        <div className="mt-6">
          <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary/50 to-accent/50 transition-all duration-500 group-hover:w-24" />
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

export function BentoSection() {
  const t = useTranslations("features")

  const features: { title: string; description: string; icon: LucideIcon; featured?: boolean }[] = [
    {
      title: t("cards.productManagement.title"),
      description: t("cards.productManagement.description"),
      icon: Package,
      featured: true,
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
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-primary/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-primary/20 mb-8 opacity-0 animate-fade-in-up"
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
            <span className="block text-muted-foreground">{t("title.line2")}</span>
          </h2>

          {/* Description */}
          <p
            className="text-body-large text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {t("description")}
            <span className="gradient-text font-medium"> {t("descriptionHighlight")}</span>
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 divider-glow" />
    </section>
  )
}
