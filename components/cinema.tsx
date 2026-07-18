"use client"

import { useRef, type ReactNode } from "react"
import Link from "next/link"
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"

export const EASE_CINEMA = [0.16, 1, 0.3, 1] as const

type PullUpTag = "h1" | "h2" | "h3" | "p" | "span" | "div"

type WordsPullUpProps = {
  text: string
  className?: string
  wordClassName?: string
  as?: PullUpTag
  delay?: number
  step?: number
  showAsterisk?: boolean
}

export function WordsPullUp({
  text,
  className,
  wordClassName,
  as: Tag = "span",
  delay = 0,
  step = 0.08,
  showAsterisk = false,
}: WordsPullUpProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const words = text.split(" ").filter(Boolean)

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" className="inline-flex flex-wrap">
        {words.map((word, index) => {
          const isLast = index === words.length - 1
          return (
            <motion.span
              key={`${word}-${index}`}
              className={`relative inline-block whitespace-pre ${wordClassName ?? ""}`}
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: EASE_CINEMA,
                delay: delay + index * step,
              }}
            >
              {word}
              {isLast && showAsterisk ? (
                <span
                  className="absolute top-[0.12em] text-[0.31em] leading-none text-gold"
                  style={{ insetInlineEnd: "-0.55em" }}
                >
                  *
                </span>
              ) : null}
              {!isLast ? " " : null}
            </motion.span>
          )
        })}
      </span>
    </Tag>
  )
}

type StyledSegment = {
  text: string
  className?: string
}

type WordsPullUpMultiStyleProps = {
  segments: StyledSegment[]
  className?: string
  as?: PullUpTag
  delay?: number
  step?: number
  justify?: "start" | "center"
}

export function WordsPullUpMultiStyle({
  segments,
  className,
  as: Tag = "h2",
  delay = 0,
  step = 0.08,
  justify = "center",
}: WordsPullUpMultiStyleProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const fullText = segments.map((segment) => segment.text).join(" ")
  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className })),
  )

  return (
    <Tag className={className}>
      <span className="sr-only">{fullText}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className={`inline-flex flex-wrap ${justify === "center" ? "justify-center" : "justify-start"}`}
      >
        {words.map((entry, index) => (
          <motion.span
            key={`${entry.word}-${index}`}
            className={`inline-block whitespace-pre ${entry.className ?? ""}`}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              ease: EASE_CINEMA,
              delay: delay + index * step,
            }}
          >
            {entry.word}
            {index < words.length - 1 ? " " : null}
          </motion.span>
        ))}
      </span>
    </Tag>
  )
}

function RevealWord({
  word,
  index,
  total,
  progress,
  dimmedOpacity,
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
  dimmedOpacity: number
}) {
  const start = index / total
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.1), Math.min(1, start + 0.05)],
    [dimmedOpacity, 1],
  )

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}
      {index < total - 1 ? " " : null}
    </motion.span>
  )
}

type ScrollWordsRevealProps = {
  text: string
  className?: string
  as?: PullUpTag
  dimmedOpacity?: number
}

export function ScrollWordsReveal({
  text,
  className,
  as: Tag = "p",
  dimmedOpacity = 0.2,
}: ScrollWordsRevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.35"],
  })
  const words = text.split(" ").filter(Boolean)

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref as never} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <RevealWord
            key={`${word}-${index}`}
            word={word}
            index={index}
            total={words.length}
            progress={scrollYProgress}
            dimmedOpacity={dimmedOpacity}
          />
        ))}
      </span>
    </Tag>
  )
}

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`${className ?? ""} rtl:-scale-x-100`}
    >
      <path
        d="M5 12h14m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type ArrowCtaProps = {
  href: string
  label: string
  className?: string
  variant?: "cream" | "outline"
  size?: "md" | "lg"
}

export function ArrowCta({
  href,
  label,
  className,
  variant = "cream",
  size = "md",
}: ArrowCtaProps) {
  const isCream = variant === "cream"
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        isCream
          ? "bg-primary text-black"
          : "border border-cream/25 bg-black/40 text-cream backdrop-blur-sm hover:border-cream/50"
      } ${
        size === "lg"
          ? "py-2 ps-6 pe-2 text-sm sm:text-base"
          : "py-1.5 ps-5 pe-1.5 text-xs sm:text-sm"
      } ${className ?? ""}`}
    >
      <span>{label}</span>
      <span
        className={`flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
          isCream ? "bg-black text-cream" : "bg-cream text-black"
        } ${size === "lg" ? "h-9 w-9 sm:h-10 sm:w-10" : "h-7 w-7 sm:h-8 sm:w-8"}`}
      >
        <ArrowGlyph className={size === "lg" ? "h-4 w-4 sm:h-5 sm:w-5" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} />
      </span>
    </Link>
  )
}

export function LearnMoreLink({
  label,
  href,
  className,
}: {
  label: string
  href: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-xs font-semibold text-cream/80 transition-colors hover:text-cream sm:text-sm ${className ?? ""}`}
    >
      <span>{label}</span>
      <ArrowGlyph className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0 rtl:rotate-45 rtl:group-hover:rotate-0" />
    </Link>
  )
}

export function CinemaCard({
  children,
  className,
  tone = "panel",
}: {
  children: ReactNode
  className?: string
  tone?: "panel" | "deep"
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${
        tone === "panel" ? "bg-panel" : "bg-card"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  )
}
