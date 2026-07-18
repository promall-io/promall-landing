"use client"

import { useLocale, useTranslations } from "next-intl"
import { ArrowCta, WordsPullUpMultiStyle } from "@/components/cinema"
import { Magnetic, Reveal } from "@/components/motion"
import { APP_URL } from "@/lib/site"

export function CTASection() {
  const t = useTranslations("cta")
  const locale = useLocale()

  return (
    <section className="relative overflow-hidden bg-background py-28 md:py-44">
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <Reveal>
          <span
            className={`mb-6 inline-block text-[10px] font-bold text-gold sm:text-xs ${
              locale === "fa" ? "" : "tracking-widest"
            }`}
          >
            {t("kicker")}
          </span>
        </Reveal>
        <WordsPullUpMultiStyle
          as="h2"
          justify="center"
          segments={[{ text: t("title") }]}
          className="text-balance text-5xl font-medium leading-[0.95] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-muted-cream sm:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-11 flex justify-center">
            <Magnetic>
              <ArrowCta href={APP_URL} label={t("button")} size="lg" />
            </Magnetic>
          </div>
          <p className="mt-7 text-xs text-muted-cream sm:text-sm">{t("note")}</p>
        </Reveal>
      </div>
    </section>
  )
}
