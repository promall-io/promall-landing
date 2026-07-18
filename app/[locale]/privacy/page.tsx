import { getTranslations } from "next-intl/server"
import { Shield, Database, Eye, Trash2, Lock, Globe, Mail, ArrowLeft } from "@/components/icons"

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacy")

  const sections = [
    {
      id: "information-collected",
      icon: Database,
      title: t("sections.informationCollected.title"),
      content: t.raw("sections.informationCollected.content") as string[],
    },
    {
      id: "how-we-use",
      icon: Eye,
      title: t("sections.howWeUse.title"),
      content: t.raw("sections.howWeUse.content") as string[],
    },
    {
      id: "data-sharing",
      icon: Globe,
      title: t("sections.dataSharing.title"),
      content: t.raw("sections.dataSharing.content") as string[],
    },
    {
      id: "data-security",
      icon: Lock,
      title: t("sections.dataSecurity.title"),
      content: t.raw("sections.dataSecurity.content") as string[],
    },
    {
      id: "data-deletion",
      icon: Trash2,
      title: t("sections.dataDeletion.title"),
      content: t.raw("sections.dataDeletion.content") as string[],
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
            <Shield className="size-4" aria-hidden="true" />
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
          <p className="text-sm text-muted-cream">
            {t("footerNote")}
          </p>
        </div>
      </div>
    </div>
  )
}
