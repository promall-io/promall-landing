"use client"

import { Twitter, Github, Linkedin, Mail, Phone } from "lucide-react"
import { useTranslations } from "next-intl"

export function FooterSection() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations("footer")

  const productLinks = t.raw("links.product.items") as string[]
  const companyLinks = t.raw("links.company.items") as string[]
  const resourceLinks = t.raw("links.resources.items") as string[]

  return (
    <footer className="relative w-full bg-card/30 backdrop-blur-sm border-t border-border/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 mb-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow-primary">
                <span className="text-2xl font-black text-primary-foreground">P</span>
              </div>
              <div className="text-3xl font-black text-foreground">{t("brandName")}</div>
            </div>

            <p className="text-base md:text-lg text-foreground/80 font-medium leading-relaxed max-w-sm">
              {t("tagline")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${t("contact.email")}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{t("contact.email")}</span>
              </a>
              <a
                href="tel:+12345678900"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{t("contact.phone")}</span>
              </a>
            </div>

            {/* Social Links - Enhanced */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com/promall"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.twitter")}
                className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:shadow-glow-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Twitter className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </a>
              <a
                href="https://github.com/promall"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.github")}
                className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:shadow-glow-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </a>
              <a
                href="https://linkedin.com/company/promall"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.linkedin")}
                className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:shadow-glow-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </a>
            </div>
          </div>

          {/* Links Sections - Enhanced */}
          <div className="space-y-5">
            <h3 className="text-base font-black text-foreground">{t("links.product.title")}</h3>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#features-section"
                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-base font-black text-foreground">{t("links.company.title")}</h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-base font-black text-foreground">{t("links.resources.title")}</h3>
            <ul className="space-y-3">
              {resourceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            {/* Copyright */}
            <div className="font-medium order-2 md:order-1">
              © {currentYear} {t("copyright")}
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 order-1 md:order-2">
              <a href="#" className="hover:text-primary transition-colors font-medium">
                {t("legal.privacy")}
              </a>
              <a href="#" className="hover:text-primary transition-colors font-medium">
                {t("legal.terms")}
              </a>
              <a href="#" className="hover:text-primary transition-colors font-medium">
                {t("legal.cookies")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
