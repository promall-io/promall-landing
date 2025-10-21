"use client"

import { useEffect, useRef, useState } from "react"
import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0, style, ...props }: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    // Check if element is already in viewport on mount
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < windowHeight) {
        setIsVisible(true)
        return true
      }
      return false
    }

    if (typeof window === "undefined") {
      setIsVisible(true)
      return
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (prefersReducedMotion.matches) {
      setIsVisible(true)
      return
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true)
      return
    }

    // Check initial visibility
    if (checkInitialVisibility()) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "50px 0px -50px 0px",
        threshold: 0.05,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-100 translate-y-4",
        className,
      )}
      style={delay ? { ...style, transitionDelay: `${delay}s` } : style}
      {...props}
    >
      {children}
    </div>
  )
}
