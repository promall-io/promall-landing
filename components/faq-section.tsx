"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Plus } from "@/components/icons"
import { Collapse, EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"

const FAQ_KEYS = [
  "manageShop",
  "whatIsOnlineShop",
  "noTech",
  "howAi",
  "instagramSafe",
  "payments",
  "switchPlans",
  "support",
] as const

export function FAQSection() {
  const t = useTranslations("faq")
  const [openKey, setOpenKey] = useState<string | null>(FAQ_KEYS[0])

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <Reveal>
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {t("badge")}
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.08}>
            <span className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {t("title")}
            </span>
          </Reveal>
        </div>

        <Stagger className="border-t border-ink/10" staggerChildren={0.06}>
          {FAQ_KEYS.map((key) => {
            const open = openKey === key
            return (
              <StaggerItem key={key}>
                <div className="border-b border-ink/10">
                  <button
                    type="button"
                    onClick={() => setOpenKey(open ? null : key)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${key}`}
                    className="group flex w-full items-center justify-between gap-4 py-6 text-start"
                  >
                    <span
                      className={`text-lg font-bold transition-colors duration-300 md:text-xl ${
                        open ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {t(`items.${key}.question`)}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        open
                          ? "bg-ink text-white"
                          : "bg-ink/5 text-muted-foreground group-hover:bg-ink/10"
                      }`}
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>
                  <Collapse open={open} id={`faq-panel-${key}`}>
                    <p className="max-w-2xl pb-7 leading-8 text-muted-foreground">
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
