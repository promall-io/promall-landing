"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "@/components/icons"
import { locales, localeNames, defaultLocale, type Locale } from "@/i18n/config"

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const otherLocale: Locale =
    locales.find((candidate) => candidate !== locale) ?? defaultLocale

  if (otherLocale === locale) {
    return null
  }

  const handleLanguageChange = (newLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean)
    const firstSegment = segments[0] ?? ""
    const isLocaleSegment = (locales as readonly string[]).includes(firstSegment)
    const remainingSegments = isLocaleSegment ? segments.slice(1) : segments
    const localePrefix = newLocale === defaultLocale ? "" : `/${newLocale}`
    const remainder = remainingSegments.length > 0 ? `/${remainingSegments.join("/")}` : ""
    const newPath = `${localePrefix}${remainder}` || "/"
    router.push(newPath)
  }

  return (
    <button
      type="button"
      onClick={() => handleLanguageChange(otherLocale)}
      className="flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-1.5 transition-colors duration-300 hover:border-cream/40 hover:bg-cream/5"
      aria-label={`Switch to ${localeNames[otherLocale]}`}
    >
      <Globe className="size-3.5 text-cream/50" aria-hidden="true" />
      <span className="text-[12px] font-semibold text-cream/80">
        {localeNames[otherLocale]}
      </span>
    </button>
  )
}
