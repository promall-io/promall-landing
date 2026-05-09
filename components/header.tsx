"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ArrowRight, X } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const t = useTranslations("header")

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("nav.features"), href: "#features-section" },
    { name: t("nav.pricing"), href: "#pricing-section" },
    { name: t("nav.faq"), href: "#faq-section" },
  ]

  const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setSheetOpen(false)

    const targetId = href.slice(1)
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return

    const headerOffset = 100
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[9999]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-4">
        <nav
          className={`
            relative flex items-center justify-between
            h-16 px-5 lg:px-8
            rounded-2xl
            transition-all duration-500 ease-out
            ${
              scrolled
                ? "glass shadow-medium"
                : "bg-transparent"
            }
          `}
        >
          {/* Animated gradient border on scroll */}
          {scrolled && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50" />
            </div>
          )}

          {/* Logo */}
          <Link href="/" aria-label={t("brandName")} className="relative flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/icon.svg"
                alt=""
                width={36}
                height={36}
                priority
                sizes="36px"
                className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"
              />
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              {t("brandName")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(event) => handleScrollClick(event, item.href)}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
              >
                {item.name}
                {/* Hover underline effect */}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <LanguageSwitcher />
            </div>
            {/* Desktop CTA */}
            <Link
              href="https://app.promall.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button
                className="group h-10 px-5 rounded-xl bg-foreground hover:bg-foreground/90 text-background text-sm font-semibold transition-all duration-300 shadow-glow hover:shadow-glow-strong"
              >
                {t("cta")}
                <ArrowRight className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative w-10 h-10 rounded-xl hover:bg-primary/10 transition-all duration-300"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                  <span className="sr-only">{t("menu")}</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[320px] p-0 glass border-l border-border/50"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="p-6 border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center gap-2.5 text-right">
                        <Image
                          src="/icon.svg"
                          alt=""
                          width={36}
                          height={36}
                          sizes="36px"
                          className="w-9 h-9"
                        />
                        <span className="text-lg font-bold text-foreground">{t("brandName")}</span>
                      </SheetTitle>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-9 h-9 rounded-xl hover:bg-primary/10"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetHeader>

                  {/* Navigation */}
                  <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(event) => handleScrollClick(event, item.href)}
                        className="group flex items-center justify-between px-4 py-4 rounded-xl text-foreground font-medium hover:bg-primary/5 transition-all duration-300 opacity-0 animate-fade-in-up"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: "forwards"
                        }}
                      >
                        <span>{item.name}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    ))}
                  </nav>

                  {/* Footer CTA */}
                  <div className="p-6 border-t border-border/50 space-y-4">
                    <Link
                      href="https://app.promall.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all duration-300 shadow-glow hover:shadow-glow-strong"
                      >
                        {t("cta")}
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="text-center text-sm text-muted-foreground">
                      {t("noCreditCard")}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
