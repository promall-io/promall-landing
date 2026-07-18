"use client"

import { useTranslations } from "next-intl"
import {
  FileText,
  UserCheck,
  Ban,
  CreditCard,
  Copyright,
  Plug,
  XCircle,
  AlertTriangle,
  Mail,
  ArrowLeft,
} from "@/components/icons"

export default function TermsOfServicePage() {
  const t = useTranslations("terms")

  const sections = [
    {
      id: "acceptance",
      icon: UserCheck,
      title: t("sections.acceptance.title"),
      content: t.raw("sections.acceptance.content") as string[],
    },
    {
      id: "accounts",
      icon: FileText,
      title: t("sections.accounts.title"),
      content: t.raw("sections.accounts.content") as string[],
    },
    {
      id: "acceptable-use",
      icon: Ban,
      title: t("sections.acceptableUse.title"),
      content: t.raw("sections.acceptableUse.content") as string[],
    },
    {
      id: "payments",
      icon: CreditCard,
      title: t("sections.payments.title"),
      content: t.raw("sections.payments.content") as string[],
    },
    {
      id: "intellectual-property",
      icon: Copyright,
      title: t("sections.intellectualProperty.title"),
      content: t.raw("sections.intellectualProperty.content") as string[],
    },
    {
      id: "third-party-integrations",
      icon: Plug,
      title: t("sections.thirdPartyIntegrations.title"),
      content: t.raw("sections.thirdPartyIntegrations.content") as string[],
    },
    {
      id: "termination",
      icon: XCircle,
      title: t("sections.termination.title"),
      content: t.raw("sections.termination.content") as string[],
    },
    {
      id: "disclaimers",
      icon: AlertTriangle,
      title: t("sections.disclaimers.title"),
      content: t.raw("sections.disclaimers.content") as string[],
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="bg-noise opacity-[0.15] pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <a
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-muted-cream transition-colors hover:text-cream"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
          <span className="text-sm font-medium">{t("backToHome")}</span>
        </a>

        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold text-gold sm:text-xs">
            <FileText className="size-4" aria-hidden="true" />
            {t("badge")}
          </span>

          <h1 className="mt-6 mb-6 text-balance text-4xl font-bold leading-[1.12] text-foreground md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <p className="mx-auto max-w-prose text-lg text-cream/70 md:text-xl">
            {t("subtitle")}
          </p>

          <p className="mt-4 text-sm text-muted-cream">
            {t("lastUpdated")}: {t("lastUpdatedDate")}
          </p>
        </div>

        <div className="mb-12 rounded-[2rem] bg-card p-8">
          <p className="max-w-prose leading-relaxed text-cream/75">
            {t("introduction")}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-2xl bg-card p-6 sm:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                  <section.icon className="size-6 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-cream md:text-2xl">
                    {index + 1}. {section.title}
                  </h2>
                </div>
              </div>

              <ul className="space-y-3 ms-16">
                {section.content.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex max-w-prose items-start gap-3 text-cream/75"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/70" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-panel p-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/10">
              <Mail className="size-6 text-gold" />
            </div>
            <div>
              <h2 className="mb-4 text-xl font-bold text-cream md:text-2xl">
                {t("contact.title")}
              </h2>
              <p className="mb-4 max-w-prose leading-relaxed text-cream/75">
                {t("contact.description")}
              </p>
              <a
                href={`mailto:${t("contact.email")}`}
                className="inline-flex items-center gap-2 font-semibold text-gold transition-colors hover:text-cream"
              >
                <Mail className="size-4" />
                {t("contact.email")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-cream">{t("footerNote")}</p>
        </div>
      </div>
    </div>
  )
}
