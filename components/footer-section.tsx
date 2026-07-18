"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { EnamadBadge } from "@/components/enamad-badge"
import { LogoMark } from "@/components/logo-mark"
import { scrollToSection } from "@/lib/smooth-scroll"
import { APP_URL } from "@/lib/site"

const PRODUCT_LINKS = [
  { key: "features", href: "#features" },
  { key: "instagramAi", href: "#instagram-ai" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const

const COMPANY_LINKS = [
  { key: "app", href: APP_URL, external: true },
  { key: "privacy", href: "/privacy", external: false },
  { key: "terms", href: "/terms", external: false },
] as const

export function FooterSection() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-ink">
                <LogoMark size={18} tone="white" />
              </span>
              <span className="text-lg font-bold tracking-tight text-foreground">
                {t("brand")}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-7 text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-bold text-foreground">
              {t("columns.product")}
            </h3>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(`links.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-bold text-foreground">
              {t("columns.company")}
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.key}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t(`links.${link.key}`)}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-bold text-foreground">
              {t("columns.trust")}
            </h3>
            <EnamadBadge size="md" />
          </div>
        </div>

        <p
          aria-hidden="true"
          className="ghost-numeral pointer-events-none mt-16 select-none text-center text-[clamp(4.5rem,17vw,15rem)] tracking-tight"
        >
          {t("brand")}
        </p>

        <div className="-mt-4 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 sm:flex-row md:-mt-8">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
          <p className="text-sm text-muted-foreground">{t("madeIn")}</p>
        </div>
      </div>
    </footer>
  )
}
