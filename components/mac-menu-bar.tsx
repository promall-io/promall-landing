"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "@/components/icons"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LogoMark } from "@/components/logo-mark"
import { EASE } from "@/components/motion"
import { defaultLocale } from "@/i18n/config"
import { scrollToSection } from "@/lib/smooth-scroll"

const NAV_LINKS = [
  { key: "features", href: "#features" },
  { key: "instagramAi", href: "#instagram-ai" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const

export function MacMenuBar() {
  const t = useTranslations("header")
  const locale = useLocale()
  const demoHref = locale === defaultLocale ? "/demo" : `/${locale}/demo`
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        className="hidden items-center justify-between px-6 py-4 md:px-9 lg:flex"
      >
        <Link href="/" className="flex items-center gap-2 opacity-90 transition-opacity duration-300 hover:opacity-100">
          <LogoMark size={20} tone="ink" />
          <span className="text-[13px] font-extrabold tracking-tight text-cream">
            {t("brand")}
          </span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
        className="flex items-center justify-between px-4 py-3.5 lg:hidden"
      >
        <Link
          href="/"
          className="glass flex items-center gap-2.5 rounded-full border border-cream/15 py-1.5 pe-4 ps-3.5"
        >
          <LogoMark size={22} tone="ink" />
          <span className="text-[15px] font-extrabold tracking-tight text-cream">
            {t("brand")}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t("menuLabel")}
            aria-expanded={menuOpen}
            className="glass flex size-9 items-center justify-center rounded-full border border-cream/15 text-cream"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="glass mx-4 mt-2 space-y-1 rounded-2xl border border-cream/15 p-2 shadow-card lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  setMenuOpen(false)
                  scrollToSection(link.href)
                }}
                className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-cream transition-colors hover:bg-cream/5"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <Link
              href={demoHref}
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[15px] font-semibold text-black"
            >
              {t("cta")}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
