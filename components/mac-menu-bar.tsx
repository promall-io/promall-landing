"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, Wifi, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EASE } from "@/components/motion"

const NAV_LINKS = [
  { key: "features", href: "#features" },
  { key: "instagramAi", href: "#instagram-ai" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const

function MenuBarClock() {
  const locale = useLocale()
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(interval)
  }, [])

  if (!now) return <span className="w-20" aria-hidden="true" />

  const formatted = new Intl.DateTimeFormat(
    locale === "fa" ? "fa-IR" : "en-US",
    { weekday: "short", hour: "2-digit", minute: "2-digit" },
  ).format(now)

  return (
    <span
      suppressHydrationWarning
      className="hidden whitespace-nowrap text-[11px] font-medium tracking-wide text-ink/70 lg:inline"
    >
      {formatted}
    </span>
  )
}

function TrafficLights() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]" />
      <span className="size-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]" />
      <span className="size-2.5 rounded-full bg-[#28c840] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]" />
    </span>
  )
}

export function MacMenuBar() {
  const t = useTranslations("header")
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="absolute inset-x-0 top-0 z-40">
      <div
        dir="ltr"
        className="relative flex h-12 items-center justify-between gap-3 border-b border-white/25 bg-white/35 px-4 backdrop-blur-2xl md:h-[3.25rem] md:px-6"
      >
        <div className="flex min-w-0 items-center gap-3 md:flex-1">
          <TrafficLights />
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-[0.55rem] bg-ink text-[11px] font-bold text-white">
              P
            </span>
            <span className="hidden text-sm font-bold tracking-tight text-ink sm:inline">
              {t("brand")}
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2 md:flex-1">
          <MenuBarClock />
          <Wifi className="hidden size-3.5 text-ink/50 lg:block" aria-hidden="true" />
          <LanguageSwitcher />
          <motion.a
            href="https://app.promall.io"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group hidden items-center gap-2 rounded-full bg-ink/85 py-1 pe-4 ps-1.5 text-white transition-colors hover:bg-ink sm:flex"
          >
            <span className="flex items-center justify-center rounded-full bg-white/20 p-1">
              <ArrowUpRight className="size-3.5 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </span>
            <span className="text-xs font-semibold">{t("cta")}</span>
          </motion.a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t("menuLabel")}
            aria-expanded={menuOpen}
            className="flex size-8 items-center justify-center rounded-full border border-ink/10 bg-white/60 text-ink md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ y: "-110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        className="pointer-events-none absolute inset-x-0 top-0 hidden justify-center md:flex"
      >
        <div className="pointer-events-auto flex h-[3.7rem] items-end rounded-b-[1.3rem] bg-[#0b1322]/92 px-3 pb-2 shadow-[0_18px_40px_-18px_rgba(11,19,34,0.7)] backdrop-blur-xl">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link, index) => (
              <motion.li
                key={link.key}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.7 + index * 0.07 }}
              >
                <a
                  href={link.href}
                  className="block rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/75 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  {t(`nav.${link.key}`)}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-3 mt-2 space-y-1 rounded-2xl border border-white/30 bg-white/75 p-3 shadow-card backdrop-blur-2xl md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-ink/5"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <a
              href="https://app.promall.io"
              className="mt-2 block rounded-xl bg-ink px-4 py-3 text-center text-base font-semibold text-white"
            >
              {t("cta")}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}
