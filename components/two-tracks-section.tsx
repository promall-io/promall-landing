"use client"

import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"
import { Check, Link2, Sparkles } from "@/components/icons"
import {
  AnimatedTitle,
  EASE,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion"

type Track = {
  key: "byHand" | "byAi"
  href: string
  accent: boolean
  icon: typeof Link2
}

const TRACKS: Track[] = [
  { key: "byHand", href: "https://app.promall.io", accent: false, icon: Link2 },
  { key: "byAi", href: "#instagram-ai", accent: true, icon: Sparkles },
]

export function TwoTracksSection() {
  const t = useTranslations("twoTracks")
  const reduced = useReducedMotion()

  return (
    <section id="two-tracks" className="relative bg-background py-24 md:py-32">
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
          className="grid items-stretch gap-5 md:grid-cols-2"
          staggerChildren={0.12}
        >
          {TRACKS.map((track) => {
            const points = t.raw(`tracks.${track.key}.points`) as string[]
            const Icon = track.icon

            return (
              <StaggerItem key={track.key} className="h-full">
                <motion.div
                  whileHover={reduced ? {} : { y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={`flex h-full flex-col rounded-[2rem] border p-8 md:p-10 ${
                    track.accent
                      ? "border-ink bg-ink text-white shadow-ink"
                      : "border-border bg-card shadow-card"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
                        track.accent
                          ? "bg-white/10 text-gold"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon variant="bold" className="size-5" />
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        track.accent
                          ? "bg-gold/20 text-gold"
                          : "bg-ice text-foreground"
                      }`}
                    >
                      {t(`tracks.${track.key}.label`)}
                    </span>
                  </div>

                  <h3
                    className={`mt-6 text-balance text-2xl font-extrabold leading-snug tracking-tight ${
                      track.accent ? "text-white" : "text-foreground"
                    }`}
                  >
                    {t(`tracks.${track.key}.title`)}
                  </h3>
                  <p
                    className={`mt-4 text-pretty leading-8 ${
                      track.accent ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {t(`tracks.${track.key}.description`)}
                  </p>

                  <ul className="mt-7 flex-1 space-y-3.5">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                            track.accent
                              ? "bg-gold/20 text-gold"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Check className="size-3" />
                        </span>
                        <span
                          className={`text-sm leading-6 ${
                            track.accent ? "text-white/80" : "text-foreground/80"
                          }`}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={track.href}
                    className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 ${
                      track.accent
                        ? "bg-gold text-foreground hover:bg-gold-deep"
                        : "border border-ink/15 bg-card text-foreground hover:border-ink hover:bg-ink hover:text-white"
                    }`}
                  >
                    {t(`tracks.${track.key}.cta`)}
                  </a>
                </motion.div>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">{t("footnote")}</p>
        </Reveal>
      </div>
    </section>
  )
}
