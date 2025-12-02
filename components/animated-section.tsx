"use client"

import { useEffect, useRef, useState } from "react"
import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "blur-up"

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  delay?: number
  variant?: AnimationVariant
  duration?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  duration = 800,
  style,
  ...props
}: AnimatedSectionProps) {
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
        rootMargin: "100px 0px -100px 0px",
        threshold: 0.1,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const getAnimationClasses = () => {
    const baseClasses = "transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"

    const variantClasses = {
      "fade-up": {
        hidden: "opacity-0 translate-y-12 scale-95",
        visible: "opacity-100 translate-y-0 scale-100"
      },
      "fade-down": {
        hidden: "opacity-0 -translate-y-12 scale-95",
        visible: "opacity-100 translate-y-0 scale-100"
      },
      "fade-left": {
        hidden: "opacity-0 translate-x-12 scale-95",
        visible: "opacity-100 translate-x-0 scale-100"
      },
      "fade-right": {
        hidden: "opacity-0 -translate-x-12 scale-95",
        visible: "opacity-100 translate-x-0 scale-100"
      },
      "scale-up": {
        hidden: "opacity-0 scale-75",
        visible: "opacity-100 scale-100"
      },
      "blur-up": {
        hidden: "opacity-0 translate-y-12 blur-md",
        visible: "opacity-100 translate-y-0 blur-0"
      }
    }

    return cn(
      baseClasses,
      isVisible ? variantClasses[variant].visible : variantClasses[variant].hidden
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        getAnimationClasses(),
        className,
      )}
      style={{
        ...style,
        transitionDuration: `${duration}ms`,
        transitionDelay: delay ? `${delay * 100}ms` : undefined
      }}
      {...props}
    >
      {children}
    </div>
  )
}
