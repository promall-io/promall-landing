"use client"

import { useEffect, useRef, useState, Children } from "react"
import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "blur-up"

interface AnimatedListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  staggerDelay?: number
  variant?: AnimationVariant
  duration?: number
}

export function AnimatedList({
  children,
  className,
  staggerDelay = 100,
  variant = "fade-up",
  duration = 600,
  ...props
}: AnimatedListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < windowHeight - 100) {
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
        rootMargin: "0px 0px -100px 0px",
        threshold: 0.1,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const variantClasses = {
    "fade-up": {
      hidden: "opacity-0 translate-y-8 scale-95",
      visible: "opacity-100 translate-y-0 scale-100"
    },
    "fade-down": {
      hidden: "opacity-0 -translate-y-8 scale-95",
      visible: "opacity-100 translate-y-0 scale-100"
    },
    "fade-left": {
      hidden: "opacity-0 translate-x-8 scale-95",
      visible: "opacity-100 translate-x-0 scale-100"
    },
    "fade-right": {
      hidden: "opacity-0 -translate-x-8 scale-95",
      visible: "opacity-100 translate-x-0 scale-100"
    },
    "scale-up": {
      hidden: "opacity-0 scale-75",
      visible: "opacity-100 scale-100"
    },
    "blur-up": {
      hidden: "opacity-0 translate-y-8 blur-sm",
      visible: "opacity-100 translate-y-0 blur-0"
    }
  }

  const childrenArray = Children.toArray(children)

  return (
    <div ref={containerRef} className={className} {...props}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all ease-[cubic-bezier(0.16,1,0.3,1)]",
            isVisible ? variantClasses[variant].visible : variantClasses[variant].hidden
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms"
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
