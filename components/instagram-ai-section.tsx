"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import {
  BadgeCheck,
  BookOpen,
  ChevronRight,
  Clock,
  SlidersHorizontal,
  UserCheck,
  type LucideIcon,
} from "lucide-react"
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"

type ChatMessage = {
  from: "customer" | "ai"
  text?: string
  orderCard?: boolean
}

const SCRIPT: ChatMessage[] = [
  { from: "customer", text: "سلام! قهوه عربیکا ۲۵۰ گرمی موجوده؟" },
  {
    from: "ai",
    text: "سلام 🌱 بله موجوده! عربیکای تازه‌برشت ۲۵۰ گرمی ۴۸۵٬۰۰۰ تومانه. دانه می‌خواید یا آسیاب‌شده؟",
  },
  { from: "customer", text: "آسیاب‌شده برای اسپرسو. دو بسته لطفاً 🙏" },
  {
    from: "ai",
    text: "عالیه! دو بسته عربیکا، آسیاب اسپرسو — جمعاً ۹۷۰٬۰۰۰ تومان. لینک پرداخت براتون می‌فرستم 👇",
  },
  { from: "ai", orderCard: true },
]

const STEP_DELAY = 1500
const TYPING_DELAY = 1000
const LOOP_PAUSE = 3400

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="mr-auto flex w-fit shrink-0 items-center gap-1 rounded-2xl rounded-tl-md bg-primary/90 px-4 py-3"
    >
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="size-1.5 rounded-full bg-white/80"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1, repeat: Infinity, delay: dot * 0.16 }}
        />
      ))}
    </motion.div>
  )
}

function PhoneChat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: "-120px" })
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setStep(SCRIPT.length)
      return
    }
    const timers: ReturnType<typeof setTimeout>[] = []

    if (step >= SCRIPT.length) {
      timers.push(setTimeout(() => setStep(0), LOOP_PAUSE))
      return () => timers.forEach(clearTimeout)
    }

    const next = SCRIPT[step]
    if (next.from === "ai") {
      timers.push(setTimeout(() => setTyping(true), STEP_DELAY - TYPING_DELAY))
      timers.push(
        setTimeout(() => {
          setTyping(false)
          setStep((current) => current + 1)
        }, STEP_DELAY),
      )
    } else {
      timers.push(
        setTimeout(
          () => setStep((current) => current + 1),
          step === 0 ? 500 : STEP_DELAY,
        ),
      )
    }
    return () => timers.forEach(clearTimeout)
  }, [inView, step, reduced])

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="relative mx-auto w-full max-w-[340px]"
    >
      <div className="rounded-[2.8rem] bg-white/10 p-2.5 shadow-ink backdrop-blur">
        <div className="overflow-hidden rounded-[2.2rem] bg-white">
          <div className="relative flex items-center gap-3 border-b border-border bg-white px-4 pb-3 pt-8">
            <div className="absolute left-1/2 top-2.5 h-4 w-24 -translate-x-1/2 rounded-full bg-ink" />
            <ChevronRight className="size-5 text-ink" />
            <span className="rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2px]">
              <span className="flex size-9 items-center justify-center rounded-full border-2 border-white bg-ice text-xs font-bold text-primary">
                م
              </span>
            </span>
            <div>
              <p className="text-sm font-bold text-ink">کافه مانا</p>
              <p className="text-[10px] text-emerald-600">
                پاسخ‌گویی فوری با پرومال
              </p>
            </div>
          </div>

          <div className="flex h-[380px] flex-col justify-end gap-2.5 overflow-hidden bg-[#fafbfc] px-3.5 py-4">
            <AnimatePresence>
              {SCRIPT.slice(0, step).map((message, index) =>
                message.orderCard ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mr-auto w-[85%] shrink-0 overflow-hidden rounded-2xl rounded-tl-md border border-border bg-white shadow-soft"
                  >
                    <div className="border-b border-border bg-[#fafbfc] px-3.5 py-2.5">
                      <p className="text-[11px] font-bold text-ink">
                        سفارش #۱۰۸۷
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        ۲ × عربیکا ۲۵۰ گرم · آسیاب اسپرسو
                      </p>
                    </div>
                    <div className="flex items-center justify-between px-3.5 py-2.5">
                      <span className="text-[11px] font-bold text-ink">
                        ۹۷۰٬۰۰۰ تومان
                      </span>
                      <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold text-white">
                        پرداخت آنلاین
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={
                      message.from === "customer"
                        ? "w-fit max-w-[85%] shrink-0 rounded-2xl rounded-tr-md bg-ice/80 px-4 py-2.5 text-[13px] leading-6 text-ink"
                        : "mr-auto w-fit max-w-[85%] shrink-0 rounded-2xl rounded-tl-md bg-primary px-4 py-2.5 text-[13px] leading-6 text-white"
                    }
                  >
                    {message.text}
                  </motion.div>
                ),
              )}
              {typing ? <TypingBubble key="typing" /> : null}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 border-t border-border bg-white px-3.5 py-3">
            <div className="flex-1 rounded-full bg-ice/60 px-4 py-2 text-[11px] text-muted-foreground">
              پیام...
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {step >= SCRIPT.length ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute -bottom-5 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-emerald-700 shadow-card"
          >
            <BadgeCheck className="size-4" />
            بدون دخالت شما انجام شد
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

const REACTIONS = [
  { emoji: "❤️", className: "right-[8%] top-[18%]", duration: 5.5, delay: 0 },
  { emoji: "🛒", className: "left-[10%] top-[30%]", duration: 6.5, delay: 1.2 },
  { emoji: "⚡", className: "right-[14%] bottom-[24%]", duration: 7, delay: 0.6 },
  { emoji: "✨", className: "left-[16%] bottom-[12%]", duration: 6, delay: 1.8 },
]

const BULLETS: { key: string; icon: LucideIcon }[] = [
  { key: "alwaysOn", icon: Clock },
  { key: "grounded", icon: BookOpen },
  { key: "personality", icon: SlidersHorizontal },
  { key: "handoff", icon: UserCheck },
]

export function InstagramAiSection() {
  const t = useTranslations("instagram")
  const reduced = useReducedMotion()

  return (
    <section
      id="instagram-ai"
      className="bg-grain relative overflow-hidden bg-ink-deep py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-0 size-96 rounded-full bg-gold/10 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-16 select-none text-center text-[13vw] font-extrabold leading-none text-white/[0.035]"
      >
        {t("ghost")}
      </span>

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#f9ce34]/15 via-[#ee2a7b]/15 to-[#6228d7]/15 px-5 py-2 text-sm font-bold text-[#f3a0c2]">
              {t("badge")}
            </span>
          </Reveal>
          <Reveal as="h2" delay={0.08}>
            <span className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("title")}
            </span>
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-6">
            <span className="text-pretty text-lg leading-9 text-white/60">
              {t("subtitle")}
            </span>
          </Reveal>
        </div>

        <div className="relative pb-10">
          {REACTIONS.map((reaction) => (
            <motion.span
              key={reaction.emoji}
              aria-hidden="true"
              className={`absolute hidden select-none rounded-2xl border border-white/10 bg-white/10 px-3.5 py-2.5 text-xl shadow-card backdrop-blur md:block ${reaction.className}`}
              animate={
                reduced
                  ? {}
                  : { y: [0, -16, 0], rotate: [0, 6, -4, 0] }
              }
              transition={{
                duration: reaction.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: reaction.delay,
              }}
            >
              {reaction.emoji}
            </motion.span>
          ))}

          <Reveal>
            <PhoneChat />
          </Reveal>
        </div>

        <Stagger
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          staggerChildren={0.08}
        >
          {BULLETS.map((bullet) => (
            <StaggerItem key={bullet.key}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition-colors duration-300 hover:bg-white/[0.09]">
                <span className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-white/10 text-gold">
                  <bullet.icon className="size-5" />
                </span>
                <h3 className="font-bold text-white">
                  {t(`bullets.${bullet.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  {t(`bullets.${bullet.key}.description`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
