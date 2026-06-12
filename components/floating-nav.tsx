"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
  type Variants,
} from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Magnetic } from "@/components/motion"
import { scrollToSection } from "@/lib/smooth-scroll"

const NAV_LINKS = [
  { key: "features", id: "features" },
  { key: "instagramAi", id: "instagram-ai" },
  { key: "pricing", id: "pricing" },
  { key: "faq", id: "faq" },
] as const

type LinkKey = (typeof NAV_LINKS)[number]["key"]

const SECTION_BY_KEY = Object.fromEntries(
  NAV_LINKS.map((link) => [link.key, link.id]),
) as Record<LinkKey, string>

const DOCK_SPRING = { type: "spring", stiffness: 320, damping: 26, mass: 0.8 } as const
const PILL_SPRING = { type: "spring", stiffness: 380, damping: 30 } as const

const dockVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.8, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 420, damping: 24 },
  },
}

export function FloatingNav() {
  const t = useTranslations("header")
  const reduced = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  const sectionProgress = useMotionValue(0)
  const sectionFill = useSpring(sectionProgress, {
    stiffness: 200,
    damping: 32,
  })

  const [visible, setVisible] = useState(false)
  const [condensed, setCondensed] = useState(false)
  const [active, setActive] = useState<LinkKey | null>(null)
  const [hovered, setHovered] = useState<LinkKey | null>(null)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > window.innerHeight * 0.6)

    if (!active) return
    const section = document.getElementById(SECTION_BY_KEY[active])
    if (!section) return
    const rect = section.getBoundingClientRect()
    const passed = (window.innerHeight * 0.5 - rect.top) / rect.height
    sectionProgress.set(Math.min(Math.max(passed, 0), 1))
  })

  useMotionValueEvent(smoothVelocity, "change", (velocity) => {
    if (reduced) return
    if (velocity > 900) setCondensed(true)
    else if (velocity < 80) setCondensed(false)
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
            initial={
              reduced
                ? { opacity: 0 }
                : { y: -96, scale: 0.9, opacity: 0, filter: "blur(8px)" }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : condensed
                  ? { y: -6, scale: 0.93, opacity: 0.8, filter: "blur(0px)" }
                  : { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : { y: -96, scale: 0.9, opacity: 0, filter: "blur(8px)" }
            }
            transition={DOCK_SPRING}
            className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
          >
            <motion.div
              variants={dockVariants}
              initial="hidden"
              animate="visible"
              className="dock-aura glass-nav flex items-center gap-0.5 rounded-full border border-white/50 p-1.5 shadow-card will-change-transform"
            >
              <motion.a
                variants={itemVariants}
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection("#")
                }}
                aria-label={t("brand")}
                whileHover={reduced ? {} : { rotate: 360, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
                className="me-1 hidden size-8 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-white sm:flex"
              >
                P
              </motion.a>

              <ul
                className="flex items-center"
                onMouseLeave={() => setHovered(null)}
              >
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.key
                  return (
                    <motion.li
                      key={link.key}
                      variants={itemVariants}
                      className="relative"
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={(event) => {
                          event.preventDefault()
                          scrollToSection(`#${link.id}`)
                        }}
                        onMouseEnter={() => setHovered(link.key)}
                        onFocus={() => setHovered(link.key)}
                        className={`group relative block rounded-full px-3 py-2 text-[12px] font-semibold transition-colors duration-300 sm:px-4 sm:text-[13px] ${
                          isActive ? "text-white" : "text-ink/65 hover:text-ink"
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
                            className="absolute inset-0 overflow-hidden rounded-full bg-gradient-to-b from-[#27354e] to-ink shadow-soft"
                          >
                            <motion.span
                              aria-hidden="true"
                              style={{ scaleX: sectionFill }}
                              className="absolute inset-x-3 bottom-[3.5px] h-[2px] origin-left rounded-full bg-gradient-to-r from-gold/90 to-sky/90 rtl:origin-right"
                            />
                          </motion.span>
                        ) : null}
                        <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-px">
                          {t(`nav.${link.key}`)}
                        </span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <motion.div variants={itemVariants} className="hidden sm:block">
                <Magnetic strength={0.2}>
                  <motion.a
                    href="https://app.promall.io"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 360, damping: 20 }}
                    className="btn-shimmer ms-1 flex items-center gap-1.5 rounded-full bg-gradient-to-l from-primary to-ink px-4 py-2 text-[12px] font-bold text-white"
                  >
                    {t("cta")}
                    <ArrowUpRight
                      className="size-3.5 rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </motion.a>
                </Magnetic>
              </motion.div>
            </motion.div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  )
}
