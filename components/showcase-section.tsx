"use client"

import { useRef, type ReactNode } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedTitle, Reveal } from "@/components/motion"
import {
  ChatMini,
  InventoryMini,
  OrdersMini,
  PaymentMini,
  PrintMini,
  ReportsMini,
} from "@/components/bento-cards"

type Panel = {
  key: string
  visual: ReactNode
}

function VisualCard({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-[2rem] border border-border bg-white p-6 shadow-float md:p-8">
      {children}
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
        <div dir="rtl" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-ice/70 px-3 py-1 text-xs font-bold text-ink">
              نمونه‌ی گزارش
            </span>
            <span className="rounded-full bg-ice/70 px-3 py-1 text-xs font-bold text-muted-foreground">
              روند فروش زنده
            </span>
          </div>
          <ReportsMini />
        </div>
      </VisualCard>
    ),
  },
]

function PanelContent({ panel }: { panel: Panel }) {
  const t = useTranslations("showcase")
  return (
    <div className="grid w-full items-center gap-10 md:grid-cols-2 md:gap-6">
      <div className="relative">
        <span className="ghost-numeral pointer-events-none absolute -top-24 start-0 text-[7rem] md:-top-36 md:text-[11rem]">
          {t(`panels.${panel.key}.number`)}
        </span>
        <h3 className="relative text-balance text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
          {t(`panels.${panel.key}.title`)}
        </h3>
        <p className="relative mt-5 max-w-md text-pretty text-base leading-8 text-muted-foreground md:text-lg">
          {t(`panels.${panel.key}.description`)}
        </p>
      </div>
      <div className="flex justify-center md:justify-end rtl:md:justify-start">
        {panel.visual}
      </div>
    </div>
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
    <section id="features" className="relative">
      <div ref={trackRef} className="relative hidden h-[400vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-10 w-full max-w-6xl px-8">
            <AnimatedTitle
              text={t("heading")}
              className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
            />
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
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                className="h-full origin-left rounded-full bg-ink rtl:origin-right"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {t("scrollHint")}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-20 px-5 py-20 md:hidden">
        <AnimatedTitle
          text={t("heading")}
          className="text-3xl font-extrabold tracking-tight text-ink"
        />
        {PANELS.map((panel) => (
          <Reveal key={panel.key}>
            <PanelContent panel={panel} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
