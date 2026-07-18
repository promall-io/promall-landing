"use client"

import { useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Check, Link2, Sparkles } from "@/components/icons"
import { LearnMoreLink, WordsPullUp } from "@/components/cinema"
import { Reveal } from "@/components/motion"
import { APP_URL } from "@/lib/site"

const CARD_EASE = [0.22, 1, 0.36, 1] as const

type Track = {
  key: "byHand" | "byAi"
  href: string
  accent: boolean
  icon: typeof Link2
}

const TRACKS: Track[] = [
  { key: "byHand", href: APP_URL, accent: false, icon: Link2 },
  { key: "byAi", href: "#instagram-ai", accent: true, icon: Sparkles },
]

export function TwoTracksSection() {
  const t = useTranslations("twoTracks")
  const locale = useLocale()
  const reduced = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" })
  const kickerTracking = locale === "en" ? "uppercase tracking-widest" : ""

  return (
    <section
      id="two-tracks"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-14 max-w-3xl md:mb-20">
          <Reveal>
            <span
              className={`mb-5 inline-block text-[10px] font-bold text-gold sm:text-xs ${kickerTracking}`}
            >
              {t("badge")}
            </span>
          </Reveal>
          <WordsPullUp
            as="h2"
            text={t("title")}
            showAsterisk
            className="text-3xl font-bold leading-[0.95] text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          />
          <Reveal as="p" delay={0.16} className="mt-6 max-w-2xl">
            <span className="text-pretty text-lg leading-9 text-muted-cream">
              {t("subtitle")}
            </span>
          </Reveal>
        </div>

        <div ref={gridRef} className="grid items-stretch gap-5 md:grid-cols-2">
          {TRACKS.map((track, index) => {
            const points = t.raw(`tracks.${track.key}.points`) as string[]
            const Icon = track.icon

            return (
              <motion.article
                key={track.key}
                initial={
                  reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
                }
                animate={gridInView ? { opacity: 1, scale: 1 } : {}}
                whileHover={
                  reduced
                    ? {}
                    : { y: -6, transition: { duration: 0.35, ease: CARD_EASE } }
                }
                transition={{
                  duration: 0.7,
                  ease: CARD_EASE,
                  delay: index * 0.15,
                }}
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-8 md:p-10 ${
                  track.accent ? "border-gold/25" : "border-cream/10"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
                        track.accent
                          ? "bg-gold/15 text-gold"
                          : "bg-cream/[0.06] text-cream"
                      }`}
                    >
                      <Icon variant="bold" className="size-5" />
                    </span>
                    <span
                      className={`text-[10px] font-bold text-gold sm:text-xs ${kickerTracking}`}
                    >
                      {t(`tracks.${track.key}.label`)}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="select-none text-4xl font-extrabold leading-none text-muted-cream/25"
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-7 text-balance text-2xl font-bold leading-snug text-foreground md:text-3xl">
                  {t(`tracks.${track.key}.title`)}
                </h3>
                <p className="mt-4 text-pretty leading-8 text-muted-cream">
                  {t(`tracks.${track.key}.description`)}
                </p>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                        <Check className="size-3" />
                      </span>
                      <span className="text-sm leading-6 text-cream/80">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-cream/10 pt-6">
                  <LearnMoreLink
                    label={t(`tracks.${track.key}.cta`)}
                    href={track.href}
                  />
                </div>
              </motion.article>
            )
          })}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <p className="text-sm leading-7 text-muted-cream">
            <span className="me-1.5 text-gold">*</span>
            {t("footnote")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
