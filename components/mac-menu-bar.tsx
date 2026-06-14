"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "@/components/icons"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EASE } from "@/components/motion"
import { scrollToSection } from "@/lib/smooth-scroll"

const NAV_LINKS = [
  { key: "features", href: "#features" },
  { key: "instagramAi", href: "#instagram-ai" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const

export function MacMenuBar() {
  const t = useTranslations("header")
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
        className="relative flex items-center justify-between px-4 py-3.5 md:px-7 md:py-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/60 py-1.5 pe-3.5 ps-1.5 backdrop-blur-md transition-colors duration-300 hover:bg-white/75"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
            P
          </span>
          <span className="text-[13px] font-bold tracking-tight text-ink">
            {t("brand")}
          </span>
        </Link>

        <ul
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-white/55 px-1.5 py-1 backdrop-blur-md lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.key} className="relative">
              <a
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection(link.href)
                }}
                onMouseEnter={() => setHovered(link.key)}
                onFocus={() => setHovered(link.key)}
                className="relative block rounded-full px-4 py-1.5 text-[13px] font-semibold text-ink/70 transition-colors duration-300 hover:text-ink"
              >
                {hovered === link.key ? (
                  <motion.span
                    layoutId="nav-hover-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-ink/[0.07]"
                  />
                ) : null}
                <span className="relative">{t(`nav.${link.key}`)}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="https://app.promall.io"
            className="group hidden items-center gap-2 rounded-full bg-[rgba(27,38,59,0.85)] py-1.5 pe-4 ps-1.5 text-white backdrop-blur-md transition-colors duration-300 hover:bg-ink sm:flex"
          >
            <span className="flex items-center justify-center rounded-full bg-white/20 p-1">
              <ArrowUpRight
                className="size-3.5 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="text-xs font-semibold">{t("cta")}</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t("menuLabel")}
            aria-expanded={menuOpen}
            className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/60 text-ink backdrop-blur-md lg:hidden"
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
            className="mx-4 mt-2 space-y-1 rounded-2xl border border-white/20 bg-white/80 p-2 shadow-card backdrop-blur-xl lg:hidden"
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
                className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-ink/5"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <a
              href="https://app.promall.io"
              className="mt-1 block rounded-xl bg-ink px-4 py-2.5 text-center text-[15px] font-semibold text-white"
            >
              {t("cta")}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
