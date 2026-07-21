"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowLeft,
  Instagram,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  type LucideIcon,
} from "@/components/icons"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LogoMark } from "@/components/logo-mark"
import { ConfettiBurst } from "@/components/confetti-burst"
import { Collapse, EASE, Reveal, Stagger, StaggerItem } from "@/components/motion"
import { ArrowCta, WordsPullUp } from "@/components/cinema"
import { defaultLocale } from "@/i18n/config"
import {
  groupIranMobile,
  normalizeInstagramHandle,
  normalizeIranMobile,
  toEnglishDigits,
  toPersianDigits,
} from "@/lib/demo-form"

const INSTAGRAM_URL_PREFIX = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\//i

const STEPS = [
  { key: "call", icon: Phone },
  { key: "demo", icon: Store },
  { key: "launch", icon: Rocket },
] as const

type FormStatus = "idle" | "submitting" | "success" | "error"

type FieldErrors = {
  phone?: boolean
  instagram?: boolean
}

function SubmitArrow({ className }: { className?: string }) {
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

export function DemoRequestExperience() {
  const t = useTranslations("demo")
  const tHeader = useTranslations("header")
  const locale = useLocale()
  const reduced = useReducedMotion()

  const [phone, setPhone] = useState("")
  const [instagram, setInstagram] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<FormStatus>("idle")
  const [submitted, setSubmitted] = useState<{ phone: string; instagram: string } | null>(null)

  const homeHref = locale === defaultLocale ? "/" : `/${locale}`
  const localizeDigits = (value: string) => (locale === "fa" ? toPersianDigits(value) : value)
  const kickerTracking = locale === "fa" ? "" : "tracking-widest"

  const handlePhoneChange = (value: string) => {
    const english = toEnglishDigits(value)
    const hasPlus = english.trimStart().startsWith("+")
    const digits = english.replace(/\D/g, "").slice(0, hasPlus ? 12 : 11)
    setPhone(hasPlus ? `+${digits}` : digits)
    if (errors.phone) setErrors((previous) => ({ ...previous, phone: false }))
  }

  const handleInstagramChange = (value: string) => {
    let handle = toEnglishDigits(value).trim()
    if (INSTAGRAM_URL_PREFIX.test(handle)) {
      handle = handle.replace(INSTAGRAM_URL_PREFIX, "")
    }
    handle = handle
      .replace(/^@+/, "")
      .split(/[/?#\s]/)[0]
      .toLowerCase()
      .replace(/[^a-z0-9._]/g, "")
      .slice(0, 30)
    setInstagram(handle)
    if (errors.instagram) setErrors((previous) => ({ ...previous, instagram: false }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "submitting") return

    const normalizedPhone = normalizeIranMobile(phone)
    const normalizedHandle = normalizeInstagramHandle(instagram)
    const nextErrors: FieldErrors = {
      phone: !normalizedPhone,
      instagram: !normalizedHandle,
    }
    setErrors(nextErrors)
    if (!normalizedPhone || !normalizedHandle) return

    if (honeypot) {
      setSubmitted({ phone: normalizedPhone, instagram: normalizedHandle })
      setStatus("success")
      return
    }

    setStatus("submitting")
    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: normalizedPhone,
          instagramHandle: normalizedHandle,
          locale,
        }),
      })
      if (!response.ok) throw new Error(`demo request failed: ${response.status}`)
      setSubmitted({ phone: normalizedPhone, instagram: normalizedHandle })
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />

      <ConfettiBurst active={status === "success"} />

      <header className="relative z-10 flex items-center justify-between px-4 py-3.5 md:px-7 md:py-4">
        <Link
          href={homeHref}
          className="flex items-center gap-2.5 rounded-full border border-cream/15 bg-card py-1.5 pe-4 ps-3.5 transition-colors duration-300 hover:border-cream/30"
        >
          <LogoMark size={22} tone="ink" />
          <span className="text-[15px] font-extrabold tracking-tight text-cream">
            {tHeader("brand")}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={homeHref}
            className="flex items-center gap-1.5 rounded-full border border-cream/15 px-4 py-1.5 text-[12px] font-semibold text-muted-cream transition-colors duration-300 hover:border-cream/30 hover:text-cream"
          >
            <ArrowLeft className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
            {t("backHome")}
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-5 pb-14 pt-6 md:pt-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="text-center lg:text-start">
            <Reveal>
              <span
                className={`inline-flex items-center gap-2 text-[10px] font-bold text-gold sm:text-xs ${kickerTracking}`}
              >
                <Sparkles className="size-4" aria-hidden="true" />
                {t("badge")}
              </span>
            </Reveal>

            <h1
              className="mt-6 text-balance text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "#E1E0CC" }}
            >
              <WordsPullUp as="span" className="block" text={t("titleLine1")} delay={0.08} />
              <WordsPullUp
                as="span"
                className="block text-gold"
                text={t("titleLine2")}
                delay={0.3}
                showAsterisk
              />
            </h1>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-8 text-cream/70 sm:text-lg lg:mx-0">
                {t("subtitle")}
              </p>
            </Reveal>

            <Stagger className="mt-10 hidden space-y-3 lg:block" delayChildren={0.3}>
              {STEPS.map((step, index) => (
                <StaggerItem key={step.key}>
                  <StepRow
                    icon={step.icon}
                    index={index}
                    title={t(`steps.${step.key}.title`)}
                    description={t(`steps.${step.key}.description`)}
                    localizeDigits={localizeDigits}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.12} distance={36}>
            <div className="relative overflow-hidden rounded-[2rem] bg-card p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
              />

              <AnimatePresence mode="wait" initial={false}>
                {status === "success" && submitted ? (
                  <motion.div
                    key="success"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="relative flex flex-col items-center py-6 text-center"
                  >
                    <SuccessCheck />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-cream sm:text-3xl">
                      {t("successTitle")}
                    </h2>
                    <p className="mt-3 max-w-sm text-pretty text-[15px] leading-7 text-muted-cream">
                      {t("successSubtitle")}
                    </p>

                    <div className="mt-7 w-full space-y-2.5">
                      <SummaryRow
                        icon={Phone}
                        label={t("successPhoneLabel")}
                        value={localizeDigits(groupIranMobile(submitted.phone))}
                      />
                      <SummaryRow
                        icon={Instagram}
                        label={t("successHandleLabel")}
                        value={`@${submitted.instagram}`}
                      />
                    </div>

                    <ArrowCta
                      href={homeHref}
                      label={t("successCta")}
                      size="lg"
                      className="mt-8"
                    />
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={handleSubmit}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.99 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="relative space-y-5"
                  >
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight text-cream">
                        {t("formTitle")}
                      </h2>
                      <p className="text-[13px] leading-6 text-muted-cream">
                        {t("formSubtitle")}
                      </p>
                    </div>

                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                      className="hidden"
                    />

                    <Field
                      id="demo-phone"
                      label={t("phoneLabel")}
                      icon={Phone}
                      error={errors.phone ? t("phoneError") : null}
                    >
                      <input
                        id="demo-phone"
                        type="tel"
                        dir="ltr"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder={t("phonePlaceholder")}
                        value={localizeDigits(phone)}
                        onChange={(event) => handlePhoneChange(event.target.value)}
                        aria-invalid={errors.phone || undefined}
                        aria-describedby={errors.phone ? "demo-phone-error" : undefined}
                        className="w-full bg-transparent text-[16px] font-semibold tracking-wide text-cream outline-none placeholder:font-medium placeholder:text-muted-cream/60"
                      />
                    </Field>

                    <Field
                      id="demo-instagram"
                      label={t("instagramLabel")}
                      icon={Instagram}
                      error={errors.instagram ? t("instagramError") : null}
                      prefix="instagram.com/"
                    >
                      <input
                        id="demo-instagram"
                        type="text"
                        dir="ltr"
                        autoComplete="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder={t("instagramPlaceholder")}
                        value={instagram}
                        onChange={(event) => handleInstagramChange(event.target.value)}
                        aria-invalid={errors.instagram || undefined}
                        aria-describedby={errors.instagram ? "demo-instagram-error" : undefined}
                        className="w-full bg-transparent text-[16px] font-semibold tracking-wide text-cream outline-none placeholder:font-medium placeholder:text-muted-cream/60"
                      />
                    </Field>

                    <Collapse open={status === "error"}>
                      <p
                        role="alert"
                        className="rounded-xl px-4 py-3 text-[13px] font-semibold"
                        style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
                      >
                        {t("submitError")}
                      </p>
                    </Collapse>

                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileTap={reduced ? undefined : { scale: 0.98 }}
                      className="group flex w-full items-center justify-between gap-2 rounded-full bg-primary py-2 ps-6 pe-2 text-[15px] font-semibold text-primary-foreground transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-wait disabled:opacity-80"
                    >
                      <span>{status === "submitting" ? t("submitting") : t("submit")}</span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#11192a] text-cream transition-transform duration-300 group-hover:scale-110">
                        {status === "submitting" ? (
                          <span
                            aria-hidden="true"
                            className="size-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream"
                          />
                        ) : (
                          <SubmitArrow className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </span>
                    </motion.button>

                    <p className="flex items-center justify-center gap-1.5 text-center text-[12px] font-medium text-muted-cream">
                      <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
                      {t("privacyNote")}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Stagger className="space-y-3 lg:hidden" delayChildren={0.2}>
            {STEPS.map((step, index) => (
              <StaggerItem key={step.key}>
                <StepRow
                  icon={step.icon}
                  index={index}
                  title={t(`steps.${step.key}.title`)}
                  description={t(`steps.${step.key}.description`)}
                  localizeDigits={localizeDigits}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </main>
    </div>
  )
}

function Field({
  id,
  label,
  icon: Icon,
  error,
  prefix,
  children,
}: {
  id: string
  label: string
  icon: LucideIcon
  error: string | null
  prefix?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1.5 text-[13px] font-bold text-cream"
      >
        <Icon className="size-4 text-muted-cream" aria-hidden="true" />
        {label}
      </label>
      <div
        dir="ltr"
        className={`flex items-center gap-0 rounded-2xl border bg-background px-4 py-3.5 transition-colors duration-300 focus-within:border-gold ${
          error ? "border-destructive/60" : "border-cream/15"
        }`}
      >
        {prefix ? (
          <span className="me-0.5 select-none text-[14px] font-medium text-muted-cream/60">
            {prefix}
          </span>
        ) : null}
        {children}
      </div>
      <Collapse open={Boolean(error)}>
        <p id={`${id}-error`} className="pt-1.5 text-[12px] font-semibold text-destructive">
          {error}
        </p>
      </Collapse>
    </div>
  )
}

function StepRow({
  icon: Icon,
  index,
  title,
  description,
  localizeDigits,
}: {
  icon: LucideIcon
  index: number
  title: string
  description: string
  localizeDigits: (value: string) => string
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-panel p-4 text-start">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-black/40">
        <Icon className="size-5 text-gold" aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-baseline gap-2">
          <span className="text-[11px] font-extrabold text-muted-cream">
            {localizeDigits(String(index + 1).padStart(2, "0"))}
          </span>
          <span className="text-[14px] font-bold text-cream">{title}</span>
        </span>
        <span className="text-[13px] leading-6 text-cream/60">{description}</span>
      </span>
    </div>
  )
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-cream/10 bg-black/40 px-4 py-3">
      <span className="flex items-center gap-2 text-[13px] font-semibold text-muted-cream">
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </span>
      <span dir="ltr" className="text-[14px] font-bold tracking-wide text-cream">
        {value}
      </span>
    </div>
  )
}

function SuccessCheck() {
  const reduced = useReducedMotion()
  return (
    <motion.span
      initial={reduced ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
      className="flex size-20 items-center justify-center rounded-full"
      style={{ background: "var(--success-soft)" }}
    >
      <svg viewBox="0 0 52 52" className="size-11" aria-hidden="true">
        <motion.circle
          cx="26"
          cy="26"
          r="23"
          fill="none"
          stroke="var(--success)"
          strokeWidth="2.5"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        />
        <motion.path
          d="M15.5 27.5l7 7L37 19.5"
          fill="none"
          stroke="var(--success)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.55 }}
        />
      </svg>
    </motion.span>
  )
}
