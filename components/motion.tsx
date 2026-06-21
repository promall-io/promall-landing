"use client"

import type { ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion, useSpring, type Variants } from "framer-motion"

const EASE = [0.16, 1, 0.3, 1] as const

export const COLLAPSE_TRANSITION = { duration: 0.4, ease: EASE } as const

function useRevealVariants(distance = 28): Variants {
  const reduced = useReducedMotion()
  return {
    hidden: { opacity: 0, y: reduced ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  }
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "span" | "li" | "figure"
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion()
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Component>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  delayChildren?: number
  staggerChildren?: number
}

export function Stagger({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.1,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren, staggerChildren } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  distance = 24,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const variants = useRevealVariants(distance)
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}

export { EASE }

export function AnimatedTitle({
  text,
  className,
  as: Component = "h2",
}: {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
}) {
  const reduced = useReducedMotion()
  return (
    <Component className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block whitespace-pre"
            variants={{
              hidden: {
                opacity: 0,
                y: reduced ? 0 : 26,
                filter: reduced ? "none" : "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}

export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduced = useReducedMotion()
  const x = useSpring(0, { stiffness: 200, damping: 18 })
  const y = useSpring(0, { stiffness: 200, damping: 18 })

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onMouseMove={(event) => {
        if (reduced) return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * strength)
        y.set((event.clientY - rect.top - rect.height / 2) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

type CollapseProps = {
  open: boolean
  children: ReactNode
  className?: string
  id?: string
}

export function Collapse({ open, children, className, id }: CollapseProps) {
  const reduced = useReducedMotion()
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={id}
          key="collapse"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={reduced ? { duration: 0 } : COLLAPSE_TRANSITION}
          style={{ overflow: "hidden" }}
          className={className}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
