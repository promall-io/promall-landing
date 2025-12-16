"use client"

import { useTranslations } from "next-intl"
import { Shield, Database, Eye, Trash2, Lock, Globe, Mail, ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy")

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Back Link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{t("backToHome")}</span>
        </a>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary/15 border border-primary/30 mb-8">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary">{t("badge")}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            {t("title")}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <p className="text-sm text-muted-foreground mt-4">
            {t("lastUpdated")}: {t("lastUpdatedDate")}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 mb-12">
          <p className="text-foreground/90 leading-relaxed">
            {t("introduction")}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-card/30 backdrop-blur-sm rounded-3xl border border-border/50 p-8 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {index + 1}. {section.title}
                  </h2>
                </div>
              </div>

              <ul className="space-y-3 ml-16">
                {section.content.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-foreground/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-primary/10 rounded-3xl border border-primary/30 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                {t("contact.title")}
              </h2>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                {t("contact.description")}
              </p>
              <a
                href={`mailto:${t("contact.email")}`}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t("contact.email")}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {t("footerNote")}
          </p>
        </div>
      </div>
    </div>
  )
}
