"use client"

import { useTranslations } from "next-intl"

export function MarqueeBand() {
  const t = useTranslations("marquee")
  const items = t.raw("items") as string[]
  const row = [...items, ...items]

  return (
    <div className="relative z-10 -my-6 overflow-hidden py-6">
      <div className="-rotate-2 scale-[1.02] border-y border-ink/10 bg-gold/80 shadow-soft">
        <div dir="ltr" className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track flex w-max items-center">
            {row.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-6 px-6 py-3.5 text-sm font-bold tracking-tight text-ink md:text-base"
              >
                {item}
                <span className="text-ink/40">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
