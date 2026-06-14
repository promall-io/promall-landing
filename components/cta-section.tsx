"use client"

import { useLocale, useTranslations } from "next-intl"
import { ArrowLeft, ArrowRight } from "@/components/icons"
import { Magnetic, Reveal } from "@/components/motion"

export function CTASection() {
  const t = useTranslations("cta")
  const locale = useLocale()
  const ArrowIcon = locale === "fa" ? ArrowLeft : ArrowRight

  return (
    <section className="relative py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="bg-grain relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ink via-[#22324d] to-primary px-7 py-16 text-center shadow-ink md:px-14 md:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-sky/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 right-10 size-80 rounded-full bg-gold/15 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-8 text-white/70">
                {t("subtitle")}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <a
                    href="https://app.promall.io"
                    className="btn-shimmer group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-ink shadow-card transition-colors duration-300 hover:bg-gold"
                  >
                    {t("button")}
                    <ArrowIcon className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </a>
                </Magnetic>
              </div>
              <p className="mt-6 text-sm text-white/55">{t("note")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
