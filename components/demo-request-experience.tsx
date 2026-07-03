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
    <div className="bg-grain relative flex min-h-[100svh] flex-col overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-sky/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-slow-float pointer-events-none absolute -bottom-48 -left-24 size-[28rem] rounded-full bg-gold/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 size-96 rounded-full blur-3xl"
        style={{ background: "rgba(119, 141, 169, 0.14)" }}
      />

      <ConfettiBurst active={status === "success"} />

      <header className="relative z-10 flex items-center justify-between px-4 py-3.5 md:px-7 md:py-4">
        <Link
          href={homeHref}
          className="glass flex items-center gap-2.5 rounded-full border border-white/60 py-1.5 pe-4 ps-3.5 shadow-soft transition-colors duration-300 hover:bg-card/75"
        >
          <LogoMark size={22} tone="ink" />
          <span className="text-[15px] font-extrabold tracking-tight text-foreground">
            {tHeader("brand")}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={homeHref}
            className="glass flex items-center gap-1.5 rounded-full border border-white/60 px-4 py-1.5 text-[12px] font-semibold text-muted-foreground shadow-soft transition-colors duration-300 hover:bg-card/75 hover:text-foreground"
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
              <div className="glass mx-auto flex w-fit items-center gap-2 rounded-full border border-white/60 px-4 py-2 shadow-soft lg:mx-0">
                <Sparkles className="size-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-[13px] font-semibold text-muted-foreground">
                  {t("badge")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
                {t("titleLine1")}
                <br />
                <span className="text-primary">{t("titleLine2")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
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
            <div className="glass relative overflow-hidden rounded-[2rem] border border-white/70 p-6 shadow-float sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 right-0 h-48 w-72 rounded-full bg-sky/25 blur-3xl"
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
                    <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                      {t("successTitle")}
                    </h2>
                    <p className="mt-3 max-w-sm text-pretty text-[15px] leading-7 text-muted-foreground">
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

                    <Link
                      href={homeHref}
                      className="btn-shimmer mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-[14px] font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
                    >
                      {t("successCta")}
                      <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                    </Link>
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
                      <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                        {t("formTitle")}
                      </h2>
                      <p className="text-[13px] leading-6 text-muted-foreground">
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
                        className="w-full bg-transparent text-[16px] font-semibold tracking-wide text-foreground outline-none placeholder:font-medium placeholder:text-muted-foreground/50"
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
                        className="w-full bg-transparent text-[16px] font-semibold tracking-wide text-foreground outline-none placeholder:font-medium placeholder:text-muted-foreground/50"
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
                      className="btn-shimmer flex w-full items-center justify-center gap-2.5 rounded-2xl bg-ink px-6 py-4 text-[15px] font-bold text-white transition-[background-color,transform] duration-300 hover:bg-ink-deep disabled:cursor-wait disabled:opacity-80"
                    >
                      {status === "submitting" ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                          />
                          {t("submitting")}
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4" aria-hidden="true" />
                          {t("submit")}
                        </>
                      )}
                    </motion.button>

                    <p className="flex items-center justify-center gap-1.5 text-center text-[12px] font-medium text-muted-foreground">
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
        className="mb-2 flex items-center gap-1.5 text-[13px] font-bold text-foreground"
      >
        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
        {label}
      </label>
      <div
        dir="ltr"
        className={`flex items-center gap-0 rounded-2xl border bg-card/80 px-4 py-3.5 shadow-soft transition-[border-color,box-shadow] duration-300 focus-within:border-primary/50 focus-within:shadow-card ${
          error ? "border-destructive/50" : "border-border"
        }`}
      >
        {prefix ? (
          <span className="me-0.5 select-none text-[14px] font-medium text-muted-foreground/60">
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
    <div className="glass flex items-start gap-4 rounded-2xl border border-white/60 p-4 text-start shadow-soft">
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink/[0.05]">
        <Icon className="size-5 text-primary" aria-hidden="true" />
        <span className="absolute -end-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
          {localizeDigits(String(index + 1))}
        </span>
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[14px] font-bold text-foreground">{title}</span>
        <span className="text-[13px] leading-6 text-muted-foreground">{description}</span>
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
    <div className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-soft">
      <span className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </span>
      <span dir="ltr" className="text-[14px] font-bold tracking-wide text-foreground">
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
