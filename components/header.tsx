"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingBag } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "امکانات", href: "#features-section" },
    { name: "قیمت‌گذاری", href: "#pricing-section" },
    { name: "سوالات متداول", href: "#faq-section" },
  ]

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const headerOffset = 100
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[99999] px-3 md:px-4 pt-3 md:pt-5 pointer-events-none will-change-transform">
      <div className="pointer-events-auto">
        <div
          className={`
          max-w-5xl mx-auto
          backdrop-blur-[60px] backdrop-saturate-[200%]
          bg-background/85
          border border-border/30
          rounded-[24px]
          shadow-[0_8px_32px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1),0_0_60px_rgba(183,209,171,0.15)]
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "bg-background/90 border-border/40 shadow-[0_12px_48px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15),0_0_80px_rgba(183,209,171,0.25)]"
              : ""
          }
        `}
        >
          <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-3">
              <div
                className={`
                w-9 h-9 md:w-10 md:h-10 rounded-[14px] 
                bg-primary backdrop-blur-sm 
                flex items-center justify-center 
                shadow-[0_4px_16px_rgba(183,209,171,0.4),0_0_30px_rgba(183,209,171,0.2)]
                transition-all duration-300
                ${scrolled ? "shadow-[0_6px_20px_rgba(183,209,171,0.5),0_0_40px_rgba(183,209,171,0.3)]" : ""}
              `}
              >
                <ShoppingBag className="w-5 h-5 md:w-5 md:h-5 text-primary-foreground" />
              </div>
              <span className="text-foreground text-xl md:text-2xl font-black tracking-tight">پرومال</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollClick(e, item.href)}
                  className="text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-[12px] text-[15px] font-medium transition-all duration-200 hover:bg-muted/40 backdrop-blur-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA and Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer" className="hidden md:block">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full text-[15px] font-black shadow-[0_4px_16px_rgba(183,209,171,0.3),0_0_30px_rgba(183,209,171,0.15)] transition-all duration-300 hover:shadow-[0_6px_24px_rgba(183,209,171,0.4),0_0_40px_rgba(183,209,171,0.25)] hover:scale-[1.05] active:scale-[0.98]">
                  ورود به اپلیکیشن
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground h-10 w-10 hover:bg-muted/40 backdrop-blur-sm rounded-[12px] transition-all duration-200"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">منوی ناوبری</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="bg-background/95 backdrop-blur-3xl border-r border-border/50 text-foreground"
                >
                  <SheetHeader>
                    <SheetTitle className="text-right text-xl font-bold text-foreground flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[12px] bg-primary/95 flex items-center justify-center shadow-lg shadow-primary/20">
                        <ShoppingBag className="w-5 h-5 text-primary-foreground" />
                      </div>
                      پرومال
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-3 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleScrollClick(e, item.href)}
                        className="text-muted-foreground hover:text-foreground text-lg py-3 px-4 font-medium transition-all duration-200 hover:bg-muted/40 rounded-[12px]"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="https://app.promall.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-6"
                    >
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3.5 rounded-full font-black w-full shadow-[0_8px_32px_rgba(183,209,171,0.3)] text-base">
                        ورود به اپلیکیشن
                      </Button>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
