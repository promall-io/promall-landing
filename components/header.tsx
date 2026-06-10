"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EASE } from "@/components/motion"

const NAV_LINKS = [
  { key: "features", href: "#features" },
  { key: "instagramAi", href: "#instagram-ai" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const

export function Header() {
  const t = useTranslations("header")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 transition-all duration-500 ${
          scrolled
            ? "mt-3 rounded-2xl border border-border glass-nav py-2.5 shadow-soft md:mx-6 lg:mx-auto"
            : "border-transparent bg-transparent py-5"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white shadow-soft">
            P
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">
            {t("brand")}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-ink/5 hover:text-ink"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <a
            href="https://app.promall.io"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-ink-deep sm:inline-flex"
          >
            {t("cta")}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t("menuLabel")}
            aria-expanded={menuOpen}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-white/70 text-ink backdrop-blur md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-4 mt-2 space-y-1 rounded-2xl border border-border glass-nav p-3 shadow-card md:hidden"
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
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
