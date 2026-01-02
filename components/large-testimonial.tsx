"use client"

import { useTranslations } from "next-intl"
import { Quote, Star } from "lucide-react"

export function LargeTestimonial() {
  const t = useTranslations("largeTestimonial")

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/8 via-accent/5 to-primary/8 rounded-full blur-[150px]" />

        {/* Side accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8">
        {/* Testimonial Card */}
        <div className="relative rounded-3xl card-elevated p-10 md:p-14 text-center">
          {/* Quote icon with gradient */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 mb-10 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            <Quote className="w-8 h-8 text-primary" />
          </div>

          {/* Stars */}
          <div
            className="flex items-center justify-center gap-1 mb-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "50ms", animationFillMode: "forwards" }}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary fill-primary" />
            ))}
          </div>

          {/* Quote text */}
          <blockquote
            className="text-title text-foreground mb-10 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            &ldquo;{t("quote")}&rdquo;
          </blockquote>

          {/* Author */}
          <div
            className="flex flex-col items-center gap-3 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {/* Avatar placeholder */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/15 border border-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold gradient-text">
                {t("name").charAt(0)}
              </span>
            </div>

            <div>
              <p className="text-lg font-semibold text-foreground">{t("name")}</p>
              <p className="text-base text-muted-foreground">{t("title")}</p>
            </div>
          </div>

          {/* Decorative gradient corners */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/5 to-transparent rounded-br-3xl" />
        </div>
      </div>
    </section>
  )
}
