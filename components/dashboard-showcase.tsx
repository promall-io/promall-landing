"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslations } from "next-intl"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { EASE_CINEMA, WordsPullUp } from "@/components/cinema"
import { Lock } from "@/components/icons"
import { AppReplica } from "@/components/app-replica"

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  )
}

function CompressIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M4 14h6v6" />
      <path d="M20 10h-6V4" />
      <path d="M14 10l7-7" />
      <path d="M3 21l7-7" />
    </svg>
  )
}

type ChromeLabels = { enter: string; exit: string }

function BrowserChrome({
  expanded,
  onToggle,
  labels,
}: {
  expanded: boolean
  onToggle: () => void
  labels: ChromeLabels
}) {
  const label = expanded ? labels.exit : labels.enter
  return (
    <div
      dir="ltr"
      className="flex flex-none items-center gap-2 border-b border-cream/[0.07] bg-[#111110] px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5"
    >
      <span className="flex w-14 items-center gap-1.5 sm:w-16 sm:gap-2">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#ff5f57] sm:size-3" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-[#febc2e] sm:size-3" />
        <button
          type="button"
          onClick={onToggle}
          aria-label={label}
          title={label}
          className="size-2.5 rounded-full bg-[#28c840] transition-[filter] hover:brightness-125 sm:size-3"
        />
      </span>
      <span
        dir="ltr"
        className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full border border-cream/[0.08] bg-black/40 px-3.5 py-1 text-[10px] font-semibold text-cream/50"
      >
        <Lock className="size-2.5 flex-none text-success" />
        <span className="truncate">promall.io/shop/dashboard</span>
      </span>
      <span className="flex w-14 items-center justify-end sm:w-16">
        <button
          type="button"
          onClick={onToggle}
          aria-label={label}
          title={label}
          className="flex size-7 items-center justify-center rounded-lg text-cream/40 transition-colors hover:bg-cream/[0.08] hover:text-cream/90"
        >
          {expanded ? <CompressIcon /> : <ExpandIcon />}
        </button>
      </span>
    </div>
  )
}

function DemoShell({
  expanded,
  overlay = false,
  onToggle,
  labels,
  shellRef,
}: {
  expanded: boolean
  overlay?: boolean
  onToggle: () => void
  labels: ChromeLabels
  shellRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={shellRef}
      className={
        expanded
          ? `flex h-full w-full flex-col bg-[#0a1120] p-2.5 sm:p-4 md:p-6 ${overlay ? "fixed inset-0 z-[100]" : ""}`
          : "relative"
      }
    >
      <div
        className={`glass rounded-[20px] border border-cream/[0.12] p-1.5 shadow-ink sm:rounded-[24px] sm:p-2 md:p-2.5 ${
          expanded ? "flex min-h-0 flex-1 flex-col" : ""
        }`}
      >
        <div
          className={`flex flex-col overflow-hidden rounded-[14px] border border-cream/[0.08] bg-[#0d0d0c] sm:rounded-2xl ${
            expanded ? "min-h-0 flex-1" : ""
          }`}
        >
          <BrowserChrome expanded={expanded} onToggle={onToggle} labels={labels} />
          <div className={expanded ? "min-h-0 flex-1" : undefined}>
            <AppReplica fill={expanded} onToggleFullscreen={onToggle} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardShowcase() {
  const t = useTranslations("dashboard")
  const reduced = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const [nativeFullscreen, setNativeFullscreen] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "start 0.35"],
  })
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 16, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.94, 1])
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 48, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [reduced ? 1 : 0.4, 1])

  const labels: ChromeLabels = {
    enter: t("fullscreenEnter"),
    exit: t("fullscreenExit"),
  }

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }
    if (overlay) {
      setOverlay(false)
      return
    }
    const shell = shellRef.current
    if (shell && shell.requestFullscreen) {
      shell.requestFullscreen().catch(() => setOverlay(true))
    } else {
      setOverlay(true)
    }
  }, [overlay])

  useEffect(() => {
    const onChange = () => setNativeFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  useEffect(() => {
    if (!overlay) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOverlay(false)
    }
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [overlay])

  return (
    <section
      id="panel"
      className="relative overflow-hidden bg-background px-5 py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-[10px] font-bold text-gold sm:text-xs">{t("kicker")}</p>
          <WordsPullUp
            as="h2"
            text={t("heading")}
            showAsterisk
            className="text-3xl font-bold leading-[0.95] text-cream sm:text-4xl md:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_CINEMA, delay: 0.3 }}
            className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-7 text-cream/60 md:text-base md:leading-8"
          >
            {t("description")}
          </motion.p>
        </div>

        <div ref={frameRef} style={{ perspective: 1400 }}>
          <motion.div
            style={{ rotateX, scale, y, opacity, transformStyle: "preserve-3d" }}
            className="relative will-change-transform"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -top-10 bottom-0 opacity-60"
              style={{
                background:
                  "radial-gradient(52% 42% at 50% 8%, rgba(217,208,184,0.09), transparent 70%)",
              }}
            />
            <DemoShell
              shellRef={shellRef}
              expanded={nativeFullscreen}
              onToggle={toggleFullscreen}
              labels={labels}
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE_CINEMA, delay: 0.4 }}
          className="mt-8 text-center text-[11px] font-semibold text-muted-cream md:text-xs"
        >
          {t("note")}
        </motion.p>
      </div>

      {overlay
        ? createPortal(
            <div role="dialog" aria-modal="true" aria-label={t("windowAlt")}>
              <DemoShell expanded overlay onToggle={toggleFullscreen} labels={labels} />
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
