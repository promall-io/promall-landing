"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion"
import { ArrowUpRight } from "@/components/icons"
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
  const reduced = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState<LinkKey | null>(null)
  const [hovered, setHovered] = useState<LinkKey | null>(null)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > window.innerHeight * 0.6)
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
        className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-primary rtl:origin-right"
      />
      <AnimatePresence>
        {visible ? (
          <motion.nav
            initial={reduced ? { opacity: 0 } : { y: -72, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: -72, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
          >
            <div className="glass flex items-center gap-0.5 rounded-full border border-white/60 p-1.5 shadow-card">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection("#")
                }}
                aria-label={t("brand")}
                className="me-1 hidden size-8 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-white transition-transform duration-300 hover:scale-105 sm:flex"
              >
                P
              </a>

              <ul
                className="flex items-center"
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
                        className={`relative block rounded-full px-3 py-2 text-[12px] font-semibold transition-colors duration-300 sm:px-4 sm:text-[13px] ${
                          isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {hovered === link.key && !isActive ? (
                          <motion.span
                            layoutId="float-nav-hover"
                            transition={PILL_SPRING}
                            className="absolute inset-0 rounded-full bg-ink/[0.06]"
                          />
                        ) : null}
                        {isActive ? (
                          <motion.span
                            layoutId="float-nav-active"
                            transition={PILL_SPRING}
                            className="absolute inset-0 rounded-full bg-primary shadow-soft"
                          />
                        ) : null}
                        <span className="relative">{t(`nav.${link.key}`)}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>

              <a
                href="https://app.promall.io"
                className="btn-shimmer ms-1 hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[12px] font-bold text-white transition-transform duration-300 hover:scale-[1.03] sm:flex"
              >
                {t("cta")}
                <ArrowUpRight
                  className="size-3.5 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  )
}
