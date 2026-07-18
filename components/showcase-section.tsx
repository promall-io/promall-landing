"use client"

import { useRef, type ReactNode } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { WordsPullUp } from "@/components/cinema"
import {
  ChatMini,
  InventoryMini,
  OrdersMini,
  PaymentMini,
  PrintMini,
  ReportsMini,
} from "@/components/bento-cards"

const CARD_EASE = [0.22, 1, 0.36, 1] as const

type Panel = {
  key: string
  visual: ReactNode
}

function VisualCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-panel p-6 shadow-float md:p-8">
      {children}
    </div>
  )
}

function InsightVisual() {
  const t = useTranslations("showcase")
  return (
    <div dir="rtl" className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-card px-3 py-1 text-xs font-bold text-gold">
          {t("panels.insight.chipSample")}
        </span>
        <span className="rounded-full bg-card px-3 py-1 text-xs font-bold text-muted-cream">
          {t("panels.insight.chipLive")}
        </span>
      </div>
      <ReportsMini />
    </div>
  )
}

const PANELS: Panel[] = [
  {
    key: "direct",
    visual: (
      <VisualCard>
        <ChatMini />
      </VisualCard>
    ),
  },
  {
    key: "orders",
    visual: (
      <VisualCard>
        <div className="space-y-4">
          <OrdersMini />
          <PaymentMini />
        </div>
      </VisualCard>
    ),
  },
  {
    key: "logistics",
    visual: (
      <VisualCard>
        <div className="space-y-6">
          <InventoryMini />
          <PrintMini />
        </div>
      </VisualCard>
    ),
  },
  {
    key: "insight",
    visual: (
      <VisualCard>
        <InsightVisual />
      </VisualCard>
    ),
  },
]

function SectionHeading() {
  const t = useTranslations("showcase")
  const locale = useLocale()
  return (
    <div>
      <p
        className={`mb-4 text-[10px] font-bold text-gold sm:text-xs ${
          locale === "fa" ? "" : "uppercase tracking-widest"
        }`}
      >
        {t("kicker")}
      </p>
      <WordsPullUp
        as="h2"
        text={t("heading")}
        showAsterisk
        className="text-3xl font-bold leading-[0.95] text-cream sm:text-4xl md:text-5xl"
      />
    </div>
  )
}

function PanelContent({ panel }: { panel: Panel }) {
  const t = useTranslations("showcase")
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, scale: reduced ? 1 : 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: CARD_EASE }}
      className="relative overflow-hidden rounded-[2rem] bg-card p-7 sm:p-9 md:p-12"
    >
      <div
        aria-hidden="true"
        className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]"
      />
      <div className="relative grid w-full items-center gap-10 md:grid-cols-2 md:gap-6">
        <div className="relative">
          <span
            aria-hidden="true"
            className="ghost-numeral pointer-events-none absolute -top-10 start-0 text-[6rem] md:-top-20 md:text-[10rem]"
          >
            {t(`panels.${panel.key}.number`)}
          </span>
          <WordsPullUp
            as="h3"
            text={t(`panels.${panel.key}.title`)}
            className="relative block text-balance text-3xl font-bold leading-[1.1] text-cream md:text-5xl"
          />
          <p className="relative mt-5 max-w-md text-pretty text-base leading-8 text-cream/70 md:text-lg">
            {t(`panels.${panel.key}.description`)}
          </p>
        </div>
        <div className="flex justify-center md:justify-end rtl:md:justify-start">
          {panel.visual}
        </div>
      </div>
    </motion.div>
  )
}

export function ShowcaseSection() {
  const t = useTranslations("showcase")
  const locale = useLocale()
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: trackRef })

  const shift = ((PANELS.length - 1) / PANELS.length) * 100
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    locale === "fa" ? ["0%", `${shift}%`] : ["0%", `-${shift}%`],
  )

  return (
    <section id="features" className="relative bg-background">
      <div
        aria-hidden="true"
        className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]"
      />
      <div ref={trackRef} className="relative hidden h-[400vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-10 w-full max-w-6xl px-8">
            <SectionHeading />
          </div>
          <motion.div style={{ x }} className="flex w-max">
            {PANELS.map((panel) => (
              <div
                key={panel.key}
                className="flex w-screen shrink-0 items-center px-8"
              >
                <div className="mx-auto w-full max-w-6xl">
                  <PanelContent panel={panel} />
                </div>
              </div>
            ))}
          </motion.div>
          <div className="mx-auto mt-12 flex w-full max-w-6xl items-center gap-4 px-8">
            <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-cream/10">
              <motion.div
                className="h-full origin-left rounded-full bg-gold rtl:origin-right"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="text-xs font-semibold text-muted-cream">
              {t("scrollHint")}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-12 px-5 py-24 md:hidden">
        <SectionHeading />
        {PANELS.map((panel) => (
          <PanelContent key={panel.key} panel={panel} />
        ))}
      </div>
    </section>
  )
}
