"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EASE } from "@/components/motion"

const NAV_LINKS = [
  { key: "features", href: "#features" },
  { key: "instagramAi", href: "#instagram-ai" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const

function NotchFillet({ side }: { side: "left" | "right" }) {
  const placement = side === "left" ? "-left-6 top-0" : "-right-6 top-0"
  const path =
    side === "left"
      ? "M0 0H56V56C56 25.0721 30.9279 0 0 0Z"
      : "M56 0H0V56C0 25.0721 25.0721 0 56 0Z"
  return (
    <span
      className={`pointer-events-none absolute size-6 ${placement}`}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
        <path d={path} fill="#f6f7f9" />
      </svg>
    </span>
  )
}

export function MacMenuBar() {
  const t = useTranslations("header")
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <motion.nav
        initial={{ y: "-110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        className="absolute inset-x-0 top-0 hidden justify-center lg:flex"
      >
        <div className="relative flex h-12 items-center rounded-b-3xl bg-[#f6f7f9] px-7">
          <NotchFillet side="left" />
          <NotchFillet side="right" />
          <ul className="flex items-center">
            {NAV_LINKS.map((link, index) => (
              <motion.li
                key={link.key}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  delay: 0.7 + index * 0.06,
                }}
              >
                <a
                  href={link.href}
                  className="block px-5 py-2 text-[11px] font-semibold uppercase text-ink/55 transition-colors duration-200 hover:text-ink ltr:tracking-[0.16em] rtl:text-[12.5px] rtl:font-medium"
                >
                  {t(`nav.${link.key}`)}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      <div className="flex items-center justify-between px-4 pt-3.5 md:px-6 md:pt-4">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/40 bg-white/55 py-1.5 pe-3.5 ps-1.5 backdrop-blur-md transition-colors duration-300 hover:bg-white/75"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
              P
            </span>
            <span className="text-[13px] font-bold tracking-tight text-ink">
              {t("brand")}
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
          className="flex items-center gap-2"
        >
          <LanguageSwitcher />
          <motion.a
            href="https://app.promall.io"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group hidden items-center gap-2 rounded-full bg-ink/90 py-1.5 pe-4 ps-1.5 text-white transition-colors duration-300 hover:bg-ink sm:flex"
          >
            <span className="flex items-center justify-center rounded-full bg-white/20 p-1">
              <ArrowUpRight
                className="size-3.5 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="text-xs font-semibold">{t("cta")}</span>
          </motion.a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t("menuLabel")}
            aria-expanded={menuOpen}
            className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/55 text-ink backdrop-blur-md lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-4 mt-2 space-y-1 rounded-2xl bg-[#f6f7f9] p-2 shadow-card lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
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
