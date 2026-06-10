"use client"

import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowLeft, ArrowRight, BadgeCheck, Bell, Sparkles } from "lucide-react"
import { EASE, Magnetic } from "@/components/motion"

const HeroAurora = dynamic(
  () => import("@/components/hero-aurora").then((mod) => mod.HeroAurora),
  { ssr: false },
)

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

function PhoneCard() {
  return (
    <div dir="rtl" className="w-64 overflow-hidden rounded-[1.8rem] border border-border bg-white shadow-float">
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2px]">
          <span className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-ice text-[10px] font-bold text-primary">
            م
          </span>
        </span>
        <div>
          <p className="text-xs font-bold text-ink">کافه مانا</p>
          <p className="text-[9px] text-emerald-600">آنلاین با پرومال</p>
        </div>
      </div>
      <div className="space-y-2 bg-[#fafbfc] p-3.5">
        <div className="w-fit max-w-[90%] rounded-xl rounded-tr-sm bg-ice/80 px-3 py-2 text-[11px] text-ink">
          عربیکا ۲۵۰ گرمی موجوده؟
        </div>
        <div className="mr-auto w-fit max-w-[90%] rounded-xl rounded-tl-sm bg-primary px-3 py-2 text-[11px] leading-5 text-white">
          بله! ۴۸۵٬۰۰۰ تومان 🌱 همین الان براتون ثبت کنم؟
        </div>
        <div className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
          <BadgeCheck className="size-3.5" />
          سفارش در دایرکت ثبت شد
        </div>
      </div>
    </div>
  )
}

const DASH_BARS = [48, 64, 52, 78, 60, 92, 84]

function DashCard() {
  return (
    <div dir="rtl" className="w-72 rounded-3xl border border-border bg-white p-4 shadow-float">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-ink">فروش امروز</p>
          <p className="text-lg font-extrabold tracking-tight text-ink">
            ۱۲٬۴۵۰٬۰۰۰
            <span className="mr-1 text-[10px] font-normal text-muted-foreground">
              تومان
            </span>
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
          +۱۸٪
        </span>
      </div>
      <div className="flex h-20 items-end gap-1.5">
        {DASH_BARS.map((value, index) => (
          <motion.div
            key={index}
            className={`flex-1 rounded-t-md ${
              index === DASH_BARS.length - 2 ? "bg-primary" : "bg-ice"
            }`}
            initial={{ height: 0 }}
            animate={{ height: `${value}%` }}
            transition={{ duration: 0.9, ease: EASE, delay: 1 + index * 0.08 }}
          />
        ))}
      </div>
    </div>
  )
}

function ReceiptCard() {
  return (
    <div dir="rtl" className="w-40 rounded-2xl border border-dashed border-ink/20 bg-white px-3.5 py-3 text-[10px] leading-5 text-muted-foreground shadow-card">
      <p className="text-[11px] font-extrabold text-ink">فاکتور #۱۰۸۶</p>
      <p>عربیکا × ۲ — ۹۷۰٬۰۰۰</p>
      <div className="my-1.5 border-t border-dashed border-ink/15" />
      <p className="font-bold text-ink">چاپ شد ✓</p>
    </div>
  )
}

export function HeroSection() {
  const t = useTranslations("hero")
  const locale = useLocale()
  const ArrowIcon = locale === "fa" ? ArrowLeft : ArrowRight
  const reduced = useReducedMotion()

  const mouseX = useSpring(0, { stiffness: 60, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 60, damping: 20 })
  const layerDeep = {
    x: useTransform(mouseX, (value) => value * 36),
    y: useTransform(mouseY, (value) => value * 28),
  }
  const layerMid = {
    x: useTransform(mouseX, (value) => value * -24),
    y: useTransform(mouseY, (value) => value * -18),
  }
  const layerNear = {
    x: useTransform(mouseX, (value) => value * 14),
    y: useTransform(mouseY, (value) => value * 20),
  }

  return (
    <section
      className="relative overflow-hidden"
      onMouseMove={(event) => {
        if (reduced) return
        const { innerWidth, innerHeight } = window
        mouseX.set(event.clientX / innerWidth - 0.5)
        mouseY.set(event.clientY / innerHeight - 0.5)
      }}
    >
      <HeroAurora className="absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-14 px-5 pb-20 pt-32 md:px-8 lg:grid-cols-12 lg:gap-6 lg:pt-24">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-6 flex items-center gap-3 text-sm font-semibold text-primary"
          >
            <span className="text-gold-deep">✦</span>
            {t("kicker")}
          </motion.p>

          <h1 className="text-balance text-[2.7rem] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
            <StaggeredWords text={t("titleLine1")} baseDelay={0.1} />
            <br />
            <StaggeredWords
              text={t("titleLine2")}
              baseDelay={0.4}
              className="text-gradient-ink"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-9 text-muted-foreground md:text-xl"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="https://app.promall.io"
                className="btn-shimmer group inline-flex items-center gap-2.5 rounded-full bg-ink px-9 py-4 text-base font-bold text-white shadow-card transition-colors duration-300 hover:bg-ink-deep"
              >
                {t("ctaPrimary")}
                <ArrowIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </a>
            </Magnetic>
            <a
              href="#instagram-ai"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-8 py-4 text-base font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-ink hover:bg-white"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            {t("note")}
          </motion.p>
        </div>

        <div className="relative h-[480px] lg:col-span-5 lg:h-[560px]" dir="ltr">
          <motion.div
            style={layerDeep}
            initial={{ opacity: 0, y: 60, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 7 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
            className="absolute left-0 top-10 z-10 lg:left-2"
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <ReceiptCard />
            </motion.div>
          </motion.div>

          <motion.div
            style={layerMid}
            initial={{ opacity: 0, y: 70, rotate: -9 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            className="absolute right-0 top-0 z-30 lg:right-4"
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <PhoneCard />
            </motion.div>
          </motion.div>

          <motion.div
            style={layerNear}
            initial={{ opacity: 0, y: 80, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
            className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 lg:bottom-14"
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -14, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.6,
              }}
            >
              <DashCard />
            </motion.div>
          </motion.div>

          <motion.div
            style={layerDeep}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
            className="absolute right-2 top-[55%] z-40"
          >
            <span dir="rtl" className="flex items-center gap-2 rounded-full border border-border bg-white/85 px-4 py-2 text-xs font-bold text-ink shadow-card backdrop-blur">
              <Bell className="size-4 text-gold-deep" />
              سفارش جدید! 🎉
            </span>
          </motion.div>

          <motion.div
            style={layerMid}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.35 }}
            className="absolute left-2 top-[44%] z-40"
          >
            <span dir="rtl" className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white shadow-card">
              <Sparkles className="size-4 text-gold" />
              هوش مصنوعی پاسخ داد
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
