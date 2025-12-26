"use client"

import { useTranslations } from "next-intl"
import { Quote } from "lucide-react"

export function LargeTestimonial() {
  const t = useTranslations("largeTestimonial")

  return (
    <section className="relative w-full py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Quote icon */}
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-8 opacity-0 animate-fade-in-up"
          style={{ animationFillMode: "forwards" }}
        >
          <Quote className="w-7 h-7 text-primary" />
        </div>

        {/* Quote text */}
        <blockquote
          className="text-title text-foreground mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          &ldquo;{t("quote")}&rdquo;
        </blockquote>

        {/* Author */}
        <div
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          <p className="text-lg font-semibold text-foreground">{t("name")}</p>
          <p className="text-base text-muted-foreground">{t("title")}</p>
        </div>
      </div>
    </section>
  )
}
