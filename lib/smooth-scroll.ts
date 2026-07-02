import type Lenis from "lenis"

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

const ANCHOR_OFFSET = -96

export function scrollToSection(hash: string) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const lenis = window.__lenis

  if (hash === "#" || hash === "#top") {
    if (lenis && !reduced) {
      lenis.scrollTo(0, { duration: 1.4, easing: easeOutExpo })
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
    }
    return
  }

  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return

  if (lenis && !reduced) {
    lenis.scrollTo(target, {
      duration: 1.6,
      easing: easeOutExpo,
      offset: ANCHOR_OFFSET,
    })
  } else {
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })
  }
  window.history.replaceState(null, "", hash)
}
