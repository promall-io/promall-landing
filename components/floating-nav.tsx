"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion"
import { ArrowUpRight } from "@/components/icons"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LogoMark } from "@/components/logo-mark"
import { defaultLocale } from "@/i18n/config"
import { scrollToSection } from "@/lib/smooth-scroll"

const NAV_LINKS = [
  { key: "features", id: "features" },
  { key: "instagramAi", id: "instagram-ai" },
  { key: "pricing", id: "pricing" },
  { key: "faq", id: "faq" },
] as const

type LinkKey = (typeof NAV_LINKS)[number]["key"]

const PILL_SPRING = { type: "spring", stiffness: 380, damping: 30 } as const

export function FloatingNav() {
  const t = useTranslations("header")
  const locale = useLocale()
  const demoHref = locale === defaultLocale ? "/demo" : `/${locale}/demo`
  const reduced = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  const [docked, setDocked] = useState(false)
  const [active, setActive] = useState<LinkKey | null>(null)
  const [hovered, setHovered] = useState<LinkKey | null>(null)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setDocked(latest > window.innerHeight * 0.6)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const match = NAV_LINKS.find((link) => link.id === entry.target.id)
          if (match) setActive(match.key)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    for (const link of NAV_LINKS) {
      const section = document.getElementById(link.id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gold rtl:origin-right"
      />
      <div
        className={`fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ${
          docked
            ? "top-3 px-3"
            : "top-0 max-lg:pointer-events-none max-lg:opacity-0"
        }`}
      >
        <motion.nav
          initial={reduced ? { opacity: 0 } : { y: -64, opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className={`flex items-center gap-3 px-4 py-2 transition-all duration-500 md:gap-6 md:px-8 ${
            docked
              ? "glass rounded-full border border-cream/10 shadow-card"
              : "rounded-b-2xl bg-background md:rounded-b-3xl"
          }`}
        >
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection("#")
            }}
            aria-label={t("brand")}
            className="hidden size-8 items-center justify-center transition-transform duration-300 hover:scale-105 sm:flex"
          >
            <LogoMark size={22} tone="ink" />
          </a>

          <ul
            className="flex items-center gap-3 sm:gap-6 md:gap-12"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.key
              return (
                <li key={link.key} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection(`#${link.id}`)
                    }}
                    onMouseEnter={() => setHovered(link.key)}
                    onFocus={() => setHovered(link.key)}
                    className={`relative block py-2 text-[12px] font-semibold transition-colors duration-300 sm:text-[13px] ${
                      isActive ? "text-gold" : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                    {hovered === link.key && !isActive ? (
                      <motion.span
                        layoutId="float-nav-hover"
                        transition={PILL_SPRING}
                        className="absolute inset-x-0 bottom-1 h-px bg-cream/30"
                      />
                    ) : null}
                    {isActive ? (
                      <motion.span
                        layoutId="float-nav-active"
                        transition={PILL_SPRING}
                        className="absolute inset-x-0 bottom-1 h-px bg-gold"
                      />
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>

          <Link
            href={demoHref}
            className="btn-shimmer hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[12px] font-bold text-black transition-transform duration-300 hover:scale-[1.03] sm:flex"
          >
            {t("cta")}
            <ArrowUpRight
              className="size-3.5 rtl:-scale-x-100"
              aria-hidden="true"
            />
          </Link>

          <LanguageSwitcher />
        </motion.nav>
      </div>
    </>
  )
}
