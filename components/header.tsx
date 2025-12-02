"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, ShoppingBag, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "امکانات", href: "#features-section" },
    { name: "قیمت‌گذاری", href: "#pricing-section" },
    { name: "سوالات متداول", href: "#faq-section" },
  ]

  const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setSheetOpen(false) // Close mobile menu

    const targetId = href.slice(1)
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return

    const headerOffset = 90
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-5">
        <nav
          className={`
            relative flex items-center justify-between
            h-16 px-6 lg:px-8
            rounded-2xl
            backdrop-blur-xl backdrop-saturate-150
            border pointer-events-auto
            transition-all duration-500 ease-out
            ${
              scrolled
                ? "bg-background/90 border-border/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                : "bg-background/70 border-border/40 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            }
          `}
        >
          {/* Subtle gradient overlay */}
          <div
            className={`
              absolute inset-0 rounded-2xl
              bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]
              pointer-events-none
              transition-opacity duration-500
              ${scrolled ? "opacity-50" : "opacity-100"}
            `}
          />

          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-2.5 z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary/95 to-primary/90 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                <ShoppingBag className="w-4.5 h-4.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </div>
            <span className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              پرومال
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 z-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(event) => handleScrollClick(event, item.href)}
                className="group relative px-4 py-2 rounded-lg transition-all duration-200"
              >
                <span className="relative z-10 text-sm font-semibold text-foreground/75 group-hover:text-foreground transition-colors duration-200">
                  {item.name}
                </span>
                <div className="absolute inset-0 rounded-lg bg-foreground/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="relative flex items-center gap-3 z-10">
            {/* CTA Button */}
            <Link
              href="https://app.promall.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground overflow-hidden shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-[background-color,box-shadow] duration-200 touch-manipulation"
            >
              <span className="text-sm font-bold">شروع رایگان</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[-2px]" strokeWidth={2.5} />
            </Link>

            {/* Mobile Menu */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative w-11 h-11 rounded-xl hover:bg-primary/10 active:bg-primary/20 transition-colors duration-200 touch-manipulation"
                >
                  <Menu className="w-5.5 h-5.5 text-foreground/90 group-hover:text-primary transition-colors duration-200" strokeWidth={2.5} />
                  <span className="sr-only">منو</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[85%] sm:w-[320px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="border-b border-border/30 px-6 py-6 bg-gradient-to-b from-background/50 to-transparent">
                    <SheetTitle className="flex items-center gap-3 text-right">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-primary/30 blur-lg" />
                        <div className="relative flex w-11 h-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/95 to-primary/90 shadow-xl shadow-primary/25">
                          <ShoppingBag className="w-5.5 h-5.5 text-primary-foreground" strokeWidth={2.5} />
                        </div>
                      </div>
                      <span className="text-2xl font-black tracking-tight">پرومال</span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Navigation */}
                  <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
                    {navItems.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(event) => handleScrollClick(event, item.href)}
                        className="group relative flex items-center justify-between px-5 py-4 rounded-2xl text-foreground/80 font-bold hover:text-foreground transition-all duration-300"
                        style={{
                          animation: `slide-in-right 0.4s ease-out ${index * 0.1}s both`
                        }}
                      >
                        <span className="relative z-10 text-base">{item.name}</span>
                        <ArrowLeft className="relative z-10 w-4.5 h-4.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-300" strokeWidth={2.5} />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-foreground/[0.02] to-foreground/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 rounded-2xl bg-primary/5 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                      </Link>
                    ))}
                  </nav>

                  {/* Footer CTA */}
                  <div className="p-4 border-t border-border/30 bg-gradient-to-t from-background/50 to-transparent">
                    <Link
                      href="https://app.promall.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-[background-color,box-shadow] duration-200 overflow-hidden touch-manipulation"
                    >
                      <span className="text-base font-black tracking-tight">شروع رایگان</span>
                      <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-[-4px]" strokeWidth={2.5} />
                    </Link>

                    <p className="text-center text-xs text-foreground/40 mt-3 font-medium">
                      بدون نیاز به کارت اعتباری
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
