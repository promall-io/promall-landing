"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Instagram,
  Sparkles,
} from "@/components/icons"
import { MacMenuBar } from "@/components/mac-menu-bar"
import { EASE } from "@/components/motion"
import { scrollToSection } from "@/lib/smooth-scroll"

const PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=320&auto=format&fit=crop"

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4"

function VideoBackdrop() {
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection
    if (reduced || connection?.saveData) return
    setEnabled(true)
  }, [])

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 8%, var(--sky) 0%, var(--ice) 40%, var(--paper) 75%)",
        }}
      />
      {enabled ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[68%_center] transition-opacity duration-700 ease-out lg:object-center ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : null}
    </>
  )
}

function StaggeredWords({
  text,
  className,
  baseDelay = 0,
}: {
  text: string
  className?: string
  baseDelay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: reduced ? 0 : "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: baseDelay + index * 0.08,
            }}
          >
            {word}
          </motion.span>
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  )
}

function DmGlassCard() {
  const t = useTranslations("hero.dm")

  return (
    <motion.div
      initial={{ opacity: 0, x: 24, rotate: 4 }}
      animate={{ opacity: 1, x: 0, rotate: 1.5 }}
      transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
      className="absolute right-10 top-[26%] z-20 hidden xl:block"
    >
      <div className="animate-slow-float">
        <div className="glass w-72 rounded-[1.6rem] border border-white/20 p-3">
          <div className="flex items-center gap-2.5 px-1 pb-2.5 pt-1">
            <span className="rounded-full p-[2px]" style={{ background: "var(--ig-gradient)" }}>
              <span className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-ice">
                <Instagram className="size-4 text-foreground" aria-hidden="true" />
              </span>
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-foreground">{t("shopName")}</p>
              <p className="text-[10px] font-medium text-[var(--success-ink)]">
                {t("status")}
              </p>
            </div>
          </div>
          <div className="space-y-2 rounded-[1.1rem] bg-card/70 p-2.5">
            <div className="flex items-center gap-2.5 rounded-xl bg-card p-2 shadow-soft">
              <Image
                src={PRODUCT_IMAGE}
                alt={t("productAlt")}
                width={48}
                height={48}
                className="size-12 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold text-foreground">
                  {t("productName")}
                </p>
                <p className="text-[10px] font-semibold text-muted-foreground">
                  {t("productPrice")}
                </p>
              </div>
            </div>
            <div className="w-fit max-w-[88%] rounded-xl rounded-ss-sm bg-ice/90 px-3 py-1.5 text-[11px] text-foreground">
              {t("customer")}
            </div>
            <div className="ms-auto w-fit max-w-[88%] rounded-xl rounded-se-sm bg-ink px-3 py-1.5 text-[11px] leading-5 text-white">
              {t("reply")}
            </div>
            <div className="flex w-fit items-center gap-1.5 rounded-full border border-success/30 bg-success-soft px-2.5 py-1 text-[10px] font-semibold text-[var(--success-ink)]">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              {t("confirmed")}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function BottomLeftCard() {
  const t = useTranslations("hero")
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
      className="glass absolute bottom-28 right-4 z-20 flex w-fit min-w-[150px] flex-col gap-2 rounded-[1.4rem] p-4 md:bottom-6 md:left-6 md:right-auto lg:bottom-10 lg:left-10 lg:min-w-[190px] lg:gap-3 lg:rounded-[2rem] lg:p-5"
    >
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
          {t("statValue")}
        </p>
        <p className="text-[10px] font-bold tracking-wider text-muted-foreground md:text-[11px]">
          {t("statLabel")}
        </p>
      </div>
      <motion.a
        href="#instagram-ai"
        onClick={(event) => {
          event.preventDefault()
          scrollToSection("#instagram-ai")
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-2 self-start rounded-full bg-card py-1.5 pe-4 ps-1.5 transition-colors hover:bg-card/90"
      >
        <span className="flex items-center justify-center rounded-full bg-ink/10 p-1">
          <ArrowUpRight
            className="size-3.5 text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </span>
        <span className="whitespace-nowrap text-[13px] font-semibold text-foreground">
          {t("statAction")}
        </span>
      </motion.a>
    </motion.div>
  )
}

function CornerMask({ position }: { position: "top" | "left" }) {
  const placement =
    position === "top"
      ? "-top-[1.5rem] right-0 sm:-top-[2rem] md:-top-[3.5rem]"
      : "bottom-0 -left-[1.5rem] sm:-left-[2rem] md:-left-[3.5rem]"
  const path =
    position === "top"
      ? "M56 56V0C56 30.9279 30.9279 56 0 56H56Z"
      : "M56 56H0C30.9279 56 56 30.9279 56 0V56Z"
  return (
    <div
      className={`pointer-events-none absolute size-[1.5rem] sm:size-[2rem] md:size-[3.5rem] ${placement}`}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
        <path d={path} fill="var(--background)" />
      </svg>
    </div>
  )
}

function BottomRightCutout() {
  const t = useTranslations("hero")
  return (
    <motion.a
      href="https://app.promall.io"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
      className="group absolute bottom-0 right-0 z-20 flex items-center gap-3 rounded-tl-[1.5rem] bg-background p-3 pl-8 pt-5 sm:gap-4 sm:rounded-tl-[2rem] sm:p-4 sm:pl-10 sm:pt-6 md:gap-6 md:rounded-tl-[3.5rem] md:p-6 md:pl-14 md:pt-8"
    >
      <CornerMask position="top" />
      <CornerMask position="left" />
      <span className="flex size-10 items-center justify-center rounded-full border border-ink/10 bg-ink/5 transition-colors duration-300 group-hover:bg-ink/10 md:size-14">
        <ArrowUpRight
          className="size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 md:size-6"
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-col">
        <span className="text-[16px] font-extrabold tracking-tight text-foreground md:text-[20px]">
          {t("cutoutTitle")}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
          <span className="text-[12px] font-medium md:text-[14px]">
            {t("cutoutSub")}
          </span>
          <ChevronRight
            className="size-3.5 rtl:-scale-x-100 md:size-4"
            aria-hidden="true"
          />
        </span>
      </span>
    </motion.a>
  )
}

export function HeroGlass() {
  const t = useTranslations("hero")
  const reduced = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  })
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"])

  return (
    <div ref={wrapperRef} className="relative h-[100svh] w-full p-2 md:p-2.5">
      <motion.section
        initial={reduced ? false : { scale: 0.965, opacity: 0, y: 18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[1.25rem] shadow-[0_18px_60px_-24px_rgba(17,25,42,0.4)] md:rounded-[1.75rem]"
      >
        <motion.div
          style={reduced ? undefined : { y: backdropY, scale: backdropScale }}
          className="absolute inset-0 will-change-transform"
        >
          <motion.div
            initial={reduced ? false : { scale: 1.16 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: EASE }}
            className="absolute inset-0"
          >
            <VideoBackdrop />
          </motion.div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { y: contentY }}
          className="relative z-10 flex h-full w-full flex-col items-center"
        >
          <MacMenuBar />

          <div className="flex w-full max-w-5xl flex-col items-center px-6 pt-24 text-center md:pt-28 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass mb-4 flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2"
            >
              <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-[13px] font-semibold text-muted-foreground md:text-[14px]">
                {t("badge")}
              </span>
            </motion.div>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground [text-shadow:0_2px_28px_rgba(246,247,249,0.85)] sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[1.1] xl:text-[76px]">
              <StaggeredWords text={t("titleLine1")} baseDelay={0.15} />
              <br />
              <StaggeredWords
                text={t("titleLine2")}
                baseDelay={0.45}
                className="text-ink"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-5 max-w-xl text-pretty text-sm font-medium leading-7 text-muted-foreground [text-shadow:0_1px_14px_rgba(246,247,249,0.9),0_0_28px_rgba(246,247,249,0.7)] sm:text-base md:text-lg md:leading-8"
            >
              {t("description")}
            </motion.p>
          </div>
        </motion.div>

        <DmGlassCard />
        <BottomLeftCard />
        <BottomRightCutout />
      </motion.section>
    </div>
  )
}
