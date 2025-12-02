"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { locales, localeNames, type Locale } from "@/i18n/config"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: Locale) => {
    // Replace the current locale in the path with the new one
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")
    router.push(newPath)
  }

  const otherLocale = locale === "en" ? "fa" : "en"

  return (
    <button
      onClick={() => handleLanguageChange(otherLocale as Locale)}
      className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300"
      aria-label={`Switch to ${localeNames[otherLocale as Locale]}`}
    >
      <Globe className="w-4 h-4 text-primary" />
      <span className="text-sm font-semibold text-foreground">
        {localeNames[otherLocale as Locale]}
      </span>
    </button>
  )
}
