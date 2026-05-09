"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
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
      className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300"
      aria-label={`Switch to ${localeNames[otherLocale]}`}
    >
      <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
      <span className="text-sm font-semibold text-foreground">
        {localeNames[otherLocale]}
      </span>
    </button>
  )
}
