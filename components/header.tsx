"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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
      <div className="mx-auto max-w-6xl px-6 sm:px-8 pt-4">
        <nav
          className={`
            flex items-center justify-between
            h-14 px-4 lg:px-6
            rounded-full
            transition-all duration-300
            ${
              scrolled
                ? "glass border border-white/10 shadow-medium"
                : "bg-transparent"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">P</span>
            </div>
            <span className="text-lg font-bold text-foreground">
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
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="https://app.promall.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button
                className="h-9 px-4 rounded-full bg-foreground hover:bg-foreground/90 text-background text-sm font-medium transition-all duration-200"
              >
                {t("cta")}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 rounded-full hover:bg-white/10 transition-colors duration-200"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                  <span className="sr-only">{t("menu")}</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] p-0 bg-background border-l border-white/10">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="p-6 border-b border-white/10">
                    <SheetTitle className="flex items-center gap-2 text-left">
                      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">P</span>
                      </div>
                      <span className="text-lg font-bold text-foreground">{t("brandName")}</span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Navigation */}
                  <nav className="flex-1 p-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(event) => handleScrollClick(event, item.href)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg text-foreground font-medium hover:bg-white/5 transition-colors duration-200"
                      >
                        {item.name}
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </nav>

                  {/* Footer CTA */}
                  <div className="p-4 border-t border-white/10">
                    <Link
                      href="https://app.promall.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200"
                      >
                        {t("cta")}
                      </Button>
                    </Link>
                    <p className="text-center text-xs text-muted-foreground mt-3">
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
