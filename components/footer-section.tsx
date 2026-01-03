"use client"

import Image from "next/image"
import Link from "next/link"
import { Twitter, Github, Linkedin, Mail, Phone, ArrowUpRight, Heart } from "lucide-react"
import { useTranslations } from "next-intl"

export function FooterSection() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations("footer")

  const productLinks = t.raw("links.product.items") as string[]
  const companyLinks = t.raw("links.company.items") as string[]
  const resourceLinks = t.raw("links.resources.items") as string[]

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/promall", label: t("social.twitter") },
    { icon: Github, href: "https://github.com/promall", label: t("social.github") },
    { icon: Linkedin, href: "https://linkedin.com/company/promall", label: t("social.linkedin") },
  ]

  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />

        {/* Subtle glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-accent/3 rounded-full blur-[120px]" />
      </div>

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 divider-glow" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/icon.svg"
                  alt="ProMall"
                  width={48}
                  height={48}
                  className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">{t("brandName")}</span>
            </Link>

            {/* Tagline */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
              {t("tagline")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${t("contact.email")}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/15 flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-glow transition-all duration-300">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{t("contact.email")}</span>
              </a>
              <a
                href="tel:+12345678900"
                className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/15 flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-glow transition-all duration-300">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{t("contact.phone")}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/15 flex items-center justify-center hover:border-primary/30 hover:shadow-glow transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{t("links.product.title")}</h3>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#features-section"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{t("links.company.title")}</h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{t("links.resources.title")}</h3>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground order-2 md:order-1">
              <span>© {currentYear}</span>
              <span>{t("copyright")}</span>
              <span className="mx-1">•</span>
              <span className="inline-flex items-center gap-1">
                {t("madeWith")}
                <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 order-1 md:order-2">
              <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
                {t("legal.privacy")}
              </Link>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
                {t("legal.terms")}
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
                {t("legal.cookies")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
