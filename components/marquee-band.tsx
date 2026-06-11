"use client"

import { useTranslations } from "next-intl"

export function MarqueeBand() {
  const t = useTranslations("marquee")
  const items = t.raw("items") as string[]
  const row = [...items, ...items]

  return (
    <div className="relative z-10 overflow-hidden bg-background">
      <div dir="ltr" className="overflow-hidden whitespace-nowrap py-7">
        <div className="marquee-track flex w-max items-center">
          {row.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-10 px-10 text-[13px] font-semibold text-ink/40"
            >
              {item}
              <span className="text-[9px] text-gold-deep/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
