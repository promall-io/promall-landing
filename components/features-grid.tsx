"use client"

import { useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  BarChart3,
  BellRing,
  Boxes,
  Check,
  ClipboardList,
  CreditCard,
  Printer,
  Shirt,
  Sparkles,
  Store,
  Users,
  type LucideIcon,
} from "@/components/icons"
import { Reveal } from "@/components/motion"
import { LearnMoreLink, WordsPullUpMultiStyle } from "@/components/cinema"

const EASE_CARDS = [0.22, 1, 0.36, 1] as const

type Cell = {
  key: string
  icon: LucideIcon
  href: string
  span?: boolean
  accent?: boolean
}

const CELLS: Cell[] = [
  { key: "instagramAi", icon: Sparkles, href: "#instagram-ai", span: true, accent: true },
  { key: "products", icon: Shirt, href: "#features" },
  { key: "orders", icon: ClipboardList, href: "#features" },
  { key: "payments", icon: CreditCard, href: "#features" },
  { key: "reports", icon: BarChart3, href: "#features" },
  { key: "storefront", icon: Store, href: "#two-tracks" },
  { key: "inventory", icon: Boxes, href: "#features" },
  { key: "customers", icon: Users, href: "#features" },
  { key: "print", icon: Printer, href: "#features" },
  { key: "realtime", icon: BellRing, href: "#features" },
]

function FeatureCard({ cell, index }: { cell: Cell; index: number }) {
  const t = useTranslations("bento")
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = cell.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{
        duration: 0.7,
        ease: EASE_CARDS,
        delay: (index % 3) * 0.15,
      }}
      className={`flex h-full flex-col rounded-2xl bg-panel p-6 sm:p-7 ${
        cell.span ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
            cell.accent ? "bg-gold/15 text-gold" : "bg-cream/10 text-primary"
          }`}
        >
          <Icon variant="bold" className="size-5" />
        </span>
        <span aria-hidden="true" className="pt-1 text-xs font-bold text-muted-cream">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-foreground">
        {t(`cells.${cell.key}.title`)}
      </h3>
      <div className="mt-3 flex flex-1 items-start gap-2.5">
        <Check aria-hidden="true" className="mt-1.5 size-3.5 shrink-0 text-primary" />
        <p className="text-pretty text-sm leading-7 text-muted-cream">
          {t(`cells.${cell.key}.description`)}
        </p>
      </div>
      <LearnMoreLink href={cell.href} label={t("learnMore")} className="mt-6" />
    </motion.div>
  )
}

export function FeaturesGrid() {
  const t = useTranslations("bento")
  const locale = useLocale()

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <Reveal>
            <span
              className={`mb-6 inline-block text-[10px] font-bold text-gold sm:text-xs ${
                locale === "fa" ? "" : "uppercase tracking-widest"
              }`}
            >
              {t("badge")}
            </span>
          </Reveal>
          <WordsPullUpMultiStyle
            as="h2"
            segments={[
              { text: t("titleLine1") },
              { text: t("titleLine2"), className: "text-muted-cream" },
            ]}
            className="text-balance text-3xl font-bold leading-[0.95] text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          />
          <Reveal as="p" delay={0.16} className="mt-6">
            <span className="text-pretty text-base leading-8 text-muted-cream sm:text-lg">
              {t("subtitle")}
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CELLS.map((cell, index) => (
            <FeatureCard key={cell.key} cell={cell} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
