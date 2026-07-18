"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Plus } from "@/components/icons"
import { WordsPullUpMultiStyle } from "@/components/cinema"
import { Collapse, EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"

const FAQ_KEYS = [
  "manageShop",
  "whatIsOnlineShop",
  "noTech",
  "withoutAi",
  "howAi",
  "instagramSafe",
  "accounting",
  "payments",
  "print",
  "switchPlans",
  "support",
] as const

export function FAQSection() {
  const t = useTranslations("faq")
  const locale = useLocale()
  const [openKey, setOpenKey] = useState<string | null>(FAQ_KEYS[0])

  return (
    <section id="faq" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-3xl px-5">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <Reveal>
            <span
              className={`mb-5 inline-block text-[10px] font-bold text-gold sm:text-xs ${
                locale === "fa" ? "" : "tracking-widest"
              }`}
            >
              {t("badge")}
            </span>
          </Reveal>
          <WordsPullUpMultiStyle
            as="h2"
            justify="center"
            segments={[{ text: t("title") }]}
            className="text-balance text-3xl font-medium leading-[0.95] text-foreground sm:text-4xl md:text-5xl"
          />
        </div>

        <Stagger className="border-t border-cream/10" staggerChildren={0.06}>
          {FAQ_KEYS.map((key) => {
            const open = openKey === key
            return (
              <StaggerItem key={key}>
                <div className="border-b border-cream/10">
                  <button
                    type="button"
                    onClick={() => setOpenKey(open ? null : key)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${key}`}
                    className="group flex w-full items-center justify-between gap-4 py-6 text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    <span
                      className={`text-lg font-bold transition-colors duration-300 md:text-xl ${
                        open ? "text-cream" : "text-cream/75 group-hover:text-cream"
                      }`}
                    >
                      {t(`items.${key}.question`)}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        open
                          ? "border-gold bg-gold text-black"
                          : "border-cream/15 text-gold group-hover:border-gold/50"
                      }`}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <Collapse open={open} id={`faq-panel-${key}`}>
                    <p className="max-w-2xl pb-7 leading-8 text-muted-cream">
                      {t(`items.${key}.answer`)}
                    </p>
                  </Collapse>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
