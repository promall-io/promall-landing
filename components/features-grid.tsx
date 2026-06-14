"use client"

import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"
import {
  BarChart3,
  BellRing,
  Boxes,
  ClipboardList,
  CreditCard,
  Printer,
  Shirt,
  Sparkles,
  Store,
  Users,
  type LucideIcon,
} from "@/components/icons"
import { AnimatedTitle, EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"

type Cell = {
  key: string
  icon: LucideIcon
  span?: boolean
  accent?: boolean
}

const CELLS: Cell[] = [
  { key: "instagramAi", icon: Sparkles, span: true, accent: true },
  { key: "products", icon: Shirt },
  { key: "orders", icon: ClipboardList },
  { key: "payments", icon: CreditCard },
  { key: "reports", icon: BarChart3 },
  { key: "storefront", icon: Store },
  { key: "inventory", icon: Boxes },
  { key: "customers", icon: Users },
  { key: "print", icon: Printer },
  { key: "realtime", icon: BellRing },
]

export function FeaturesGrid() {
  const t = useTranslations("bento")
  const reduced = useReducedMotion()

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <Reveal>
            <span className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {t("badge")}
            </span>
          </Reveal>
          <AnimatedTitle
            as="h2"
            text={t("title")}
            className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
          />
          <Reveal as="p" delay={0.16} className="mt-5">
            <span className="text-pretty text-lg leading-8 text-muted-foreground">
              {t("subtitle")}
            </span>
          </Reveal>
        </div>

        <Stagger
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerChildren={0.06}
        >
          {CELLS.map((cell) => {
            const Icon = cell.icon
            return (
              <StaggerItem
                key={cell.key}
                className={cell.span ? "lg:col-span-2" : ""}
              >
                <motion.div
                  whileHover={reduced ? {} : { y: -5 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`flex h-full flex-col rounded-3xl border p-7 ${
                    cell.accent
                      ? "border-ink bg-gradient-to-br from-ink to-ink-deep text-white shadow-ink"
                      : "border-border bg-card shadow-soft transition-colors duration-300 hover:border-ink/20"
                  }`}
                >
                  <span
                    className={`mb-5 flex size-12 items-center justify-center rounded-2xl ${
                      cell.accent ? "bg-white/10 text-gold" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon variant="bold" className="size-6" />
                  </span>
                  <h3
                    className={`text-lg font-bold ${cell.accent ? "text-white" : "text-foreground"}`}
                  >
                    {t(`cells.${cell.key}.title`)}
                  </h3>
                  <p
                    className={`mt-2.5 text-pretty text-sm leading-7 ${
                      cell.accent ? "text-white/65" : "text-muted-foreground"
                    }`}
                  >
                    {t(`cells.${cell.key}.description`)}
                  </p>
                </motion.div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
