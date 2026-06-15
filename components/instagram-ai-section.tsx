"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import {
  BadgeCheck,
  BookOpen,
  Camera,
  ChevronRight,
  Clock,
  Heart,
  Mic,
  Phone,
  SlidersHorizontal,
  UserCheck,
  Video,
  type LucideIcon,
} from "@/components/icons"
import { AnimatedTitle, EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"

type ChatMessage = {
  from: "customer" | "ai"
  text?: string
  orderCard?: boolean
}

const SCRIPT: ChatMessage[] = [
  { from: "customer", text: "سلام، اون مانتو کتانِ کرم سایز ۳۸ هست؟" },
  {
    from: "ai",
    text: "سلام 🌿 آره موجوده! تنش خنکه و قدش بلند، ۱٬۲۸۰٬۰۰۰ تومن. کرم می‌خوای یا مشکیشم برات بفرستم ببینی؟",
  },
  { from: "customer", text: "همون کرم. یه دونه لطفاً 🙏" },
  {
    from: "ai",
    text: "چشم! یه مانتو کتان کرم سایز ۳۸ — جمعاً ۱٬۲۸۰٬۰۰۰ تومن. لینک پرداختو همین‌جا برات می‌فرستم 👇",
  },
  { from: "ai", orderCard: true },
  { from: "customer", text: "پرداخت کردم ✅" },
  {
    from: "ai",
    text: "ثبت شد 🎉 سفارشت قطعی شد و فاکتورش همین الان رو پرینتر مغازه چاپ شد. به‌زودی واست می‌فرستیمش 🌿",
  },
  { from: "customer", text: "مرسی، چه راحت 😍" },
  {
    from: "ai",
    text: "خواهش 🌸 هر ساعتی از شب‌وروز سوال داشتی، همین‌جام در خدمتت 🌙",
  },
]

const STEP_DELAY = 1500
const TYPING_DELAY = 1000
const LOOP_PAUSE = 4200

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
          className="size-1.5 rounded-full bg-card/80"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1, repeat: Infinity, delay: dot * 0.16 }}
        />
      ))}
    </motion.div>
  )
}

function DynamicIsland() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 flex h-[25px] w-[88px] -translate-x-1/2 items-center justify-end rounded-full bg-black pe-2.5">
      <span className="size-[9px] rounded-full bg-ink-deep ring-1 ring-white/10" />
    </div>
  )
}

function ChatHeader() {
  return (
    <div className="flex shrink-0 items-center gap-2.5 border-b border-border bg-card px-4 pb-2.5 pt-11">
      <ChevronRight className="size-5 shrink-0 text-foreground" />
      <span className="shrink-0 rounded-full p-[2px]" style={{ background: "var(--ig-gradient)" }}>
        <span className="relative flex size-9 items-center justify-center rounded-full border-2 border-white bg-ice text-xs font-bold text-primary">
          ت
          <span className="absolute -bottom-px -left-px size-2.5 rounded-full border-2 border-white bg-success" />
        </span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-foreground">مزون ترمه</p>
        <p className="truncate text-[10px] text-[var(--success-ink)]">
          معمولاً سریع جواب می‌ده
        </p>
      </div>
      <Phone className="size-[18px] shrink-0 text-muted-foreground" />
      <Video className="size-5 shrink-0 text-muted-foreground" />
    </div>
  )
}

function Composer() {
  return (
    <div className="shrink-0 bg-card px-3 pb-1.5 pt-2">
      <div className="flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pe-3 ps-1.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-ink">
          <Camera className="size-4 text-white" />
        </span>
        <span className="flex-1 text-[11px] text-muted-foreground">پیام...</span>
        <Mic className="size-4 text-muted-foreground" />
        <Heart className="size-4 text-muted-foreground" />
      </div>
      <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-ink/15" />
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.orderCard) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mr-auto w-[85%] shrink-0 overflow-hidden rounded-2xl rounded-tl-md border border-border bg-card shadow-soft"
      >
        <div className="border-b border-border bg-background px-3.5 py-2.5">
          <p className="text-[11px] font-bold text-foreground">سفارش #۱۰۸۷</p>
          <p className="text-[10px] text-muted-foreground">
            ۱ × مانتو کتان کرم · سایز ۳۸
          </p>
        </div>
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <span className="text-[11px] font-bold text-foreground">۱٬۲۸۰٬۰۰۰ تومان</span>
          <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold text-white">
            پرداخت آنلاین
          </span>
        </div>
      </motion.div>
    )
  }
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={
        message.from === "customer"
          ? "w-fit max-w-[82%] shrink-0 rounded-2xl rounded-tr-md bg-ice/80 px-3.5 py-2 text-[12.5px] leading-6 text-foreground"
          : "mr-auto w-fit max-w-[82%] shrink-0 rounded-2xl rounded-tl-md bg-gradient-to-bl from-primary to-ink px-3.5 py-2 text-[12.5px] leading-6 text-white"
      }
    >
      {message.text}
    </motion.div>
  )
}

function PhoneChat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: "-120px" })
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)

  const rotateX = useSpring(0, { stiffness: 140, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 140, damping: 18 })
  const glareX = useSpring(50, { stiffness: 140, damping: 20 })
  const glareY = useSpring(20, { stiffness: 140, damping: 20 })
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16), transparent 55%)`

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

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" })
  }, [step, typing, reduced])

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="relative mx-auto w-full max-w-[300px]"
      style={{ perspective: 1200 }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return
        const rect = event.currentTarget.getBoundingClientRect()
        const nx = (event.clientX - rect.left) / rect.width - 0.5
        const ny = (event.clientY - rect.top) / rect.height - 0.5
        rotateY.set(nx * -10)
        rotateX.set(ny * 8)
        glareX.set(50 + nx * 80)
        glareY.set(20 + ny * 60)
      }}
      onPointerLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
        glareX.set(50)
        glareY.set(20)
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <span className="absolute -left-[3px] top-[110px] h-8 w-[3px] rounded-l-md bg-ink" />
        <span className="absolute -left-[3px] top-[156px] h-14 w-[3px] rounded-l-md bg-ink" />
        <span className="absolute -left-[3px] top-[226px] h-14 w-[3px] rounded-l-md bg-ink" />
        <span className="absolute -right-[3px] top-[176px] h-20 w-[3px] rounded-r-md bg-ink" />

        <div className="shadow-ink relative aspect-[10/21] w-full rounded-[3.2rem] bg-gradient-to-b from-ink via-ink-deep to-ink p-[3px]">
          <div className="h-full w-full rounded-[calc(3.2rem-3px)] bg-ink-deep p-[7px]">
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.6rem] bg-card">
              <DynamicIsland />
              <ChatHeader />

              <div
                ref={scrollRef}
                className="scrollbar-none flex flex-1 flex-col gap-2.5 overflow-y-auto bg-background px-3 py-3"
              >
                <span className="mt-auto" aria-hidden="true" />
                <span className="mx-auto mb-1 shrink-0 rounded-full bg-ink/5 px-3 py-1 text-[9px] font-medium text-muted-foreground">
                  امروز ۹:۴۱
                </span>
                <AnimatePresence>
                  {SCRIPT.slice(0, step).map((message, index) => (
                    <MessageBubble key={index} message={message} />
                  ))}
                  {typing ? <TypingBubble key="typing" /> : null}
                </AnimatePresence>
              </div>

              <Composer />

              <motion.div
                aria-hidden="true"
                style={{ backgroundImage: glare }}
                className="pointer-events-none absolute inset-0 z-30 rounded-[2.6rem]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {step >= SCRIPT.length ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute -bottom-5 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-bold text-[var(--success-ink)] shadow-card"
          >
            <BadgeCheck className="size-4" />
            بدون اینکه تو کاری کنی، انجام شد
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
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
        animate={reduced ? {} : { opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-0 size-96 rounded-full bg-gold/10 blur-3xl"
        animate={reduced ? {} : { opacity: [0.6, 1, 0.6], x: [0, -40, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
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
            <span className="mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-[var(--ig-pink)]" style={{ background: "var(--ig-gradient-soft)" }}>
              {t("badge")}
            </span>
          </Reveal>
          <AnimatedTitle
            as="h2"
            text={t("title")}
            className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          />
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
              <motion.div
                whileHover={reduced ? {} : { y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="h-full rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.09]"
              >
                <span className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-white/10 text-gold">
                  <bullet.icon variant="bold" className="size-5" />
                </span>
                <h3 className="font-bold text-white">
                  {t(`bullets.${bullet.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  {t(`bullets.${bullet.key}.description`)}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
