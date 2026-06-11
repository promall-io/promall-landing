"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { EASE } from "@/components/motion"

const NAV_LINKS = [
  { key: "features", id: "features" },
  { key: "instagramAi", id: "instagram-ai" },
  { key: "pricing", id: "pricing" },
  { key: "faq", id: "faq" },
] as const

type LinkKey = (typeof NAV_LINKS)[number]["key"]

export function FloatingNav() {
  const t = useTranslations("header")
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
        className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-ink via-primary to-gold-deep rtl:origin-right"
      />
      <AnimatePresence>
        {visible ? (
        <motion.nav
          initial={{ y: -72, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -72, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
        >
          <div className="glass-nav flex items-center gap-0.5 rounded-full border border-white/50 p-1.5 shadow-card">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
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
                      onMouseEnter={() => setHovered(link.key)}
                      onFocus={() => setHovered(link.key)}
                      className={`relative block rounded-full px-3 py-2 text-[12px] font-semibold transition-colors duration-300 sm:px-4 sm:text-[13px] ${
                        isActive ? "text-white" : "text-ink/65 hover:text-ink"
                      }`}
                    >
                      {hovered === link.key && !isActive ? (
                        <motion.span
                          layoutId="float-nav-hover"
                          transition={{ duration: 0.35, ease: EASE }}
                          className="absolute inset-0 rounded-full bg-ink/[0.06]"
                        />
                      ) : null}
                      {isActive ? (
                        <motion.span
                          layoutId="float-nav-active"
                          transition={{ duration: 0.45, ease: EASE }}
                          className="absolute inset-0 rounded-full bg-ink shadow-soft"
                        />
                      ) : null}
                      <span className="relative">{t(`nav.${link.key}`)}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <motion.a
              href="https://app.promall.io"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-shimmer ms-1 hidden items-center gap-1.5 rounded-full bg-gradient-to-l from-primary to-ink px-4 py-2 text-[12px] font-bold text-white sm:flex"
            >
              {t("cta")}
              <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
            </motion.a>
          </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  )
}
