"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "@/components/icons"

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    document.documentElement.style.colorScheme = next ? "dark" : "light"
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      /* ignore */
    }
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "حالت روشن" : "حالت تیره"}
      className={`inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur-md transition-colors duration-300 hover:bg-accent/60 ${className}`}
    >
      {mounted && dark ? (
        <Sun className="size-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="size-[18px]" aria-hidden="true" />
      )}
    </button>
  )
}
