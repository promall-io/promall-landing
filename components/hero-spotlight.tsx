"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowCta, EASE_CINEMA, WordsPullUp } from "@/components/cinema"
import { MacMenuBar } from "@/components/mac-menu-bar"
import { defaultLocale } from "@/i18n/config"

gsap.registerPlugin(ScrollTrigger)

const BASE_IMAGE = "/brand/hero-bazaar-base.webp"
const REVEAL_IMAGE = "/brand/hero-bazaar-reveal.webp"
const REVEAL_IMAGE_SM = "/brand/hero-bazaar-reveal-sm.webp"

const IMAGE_W = 2400
const IMAGE_H = 1670
const SPOTLIGHT_RADIUS = 260
const EMBER = { x: 0.4145, y: 0.5305 }
const RAIN_WIND = 0.08
const MAX_PUFFS = 70

const RAIN_LAYERS = [
  { density: 1 / 34000, len: [9, 14], speed: [500, 680], alpha: 0.07, width: 0.8 },
  { density: 1 / 24000, len: [14, 21], speed: [820, 1060], alpha: 0.1, width: 1 },
  { density: 1 / 42000, len: [22, 34], speed: [1220, 1540], alpha: 0.14, width: 1.3 },
] as const

type Drop = { x: number; y: number; len: number; speed: number }

type Puff = {
  x: number
  y: number
  vx: number
  vy: number
  age: number
  ttl: number
  size: number
  growth: number
  sway: number
  swayFreq: number
  phase: number
  peak: number
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

const WISP = { alpha: 0.38, growth: [20, 36] as const }
const BILLOW = { alpha: 0.26, growth: [70, 120] as const }

function coverRect(imageW: number, imageH: number, canvasW: number, canvasH: number) {
  const scale = Math.max(canvasW / imageW, canvasH / imageH)
  const w = imageW * scale
  const h = imageH * scale
  return { x: (canvasW - w) / 2, y: (canvasH - h) / 2, w, h }
}

function createSmokeSprite() {
  const sprite = document.createElement("canvas")
  sprite.width = 160
  sprite.height = 160
  const ctx = sprite.getContext("2d")
  if (!ctx) return sprite
  const gradient = ctx.createRadialGradient(80, 80, 0, 80, 80, 80)
  gradient.addColorStop(0, "rgba(220,228,242,0.6)")
  gradient.addColorStop(0.4, "rgba(210,220,238,0.27)")
  gradient.addColorStop(0.75, "rgba(200,212,234,0.09)")
  gradient.addColorStop(1, "rgba(200,212,234,0)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 160, 160)
  return sprite
}

function spawnPuff(x: number, y: number): Puff {
  const wisp = Math.random() < 0.55
  return wisp
    ? {
        x: x + rand(-3, 3),
        y: y + rand(-3, 1),
        vx: rand(-7, -2),
        vy: rand(-40, -26),
        age: 0,
        ttl: rand(3.2, 5.2),
        size: rand(5, 9),
        growth: rand(WISP.growth[0], WISP.growth[1]),
        sway: rand(1.5, 4),
        swayFreq: rand(0.7, 1.4),
        phase: rand(0, Math.PI * 2),
        peak: WISP.alpha,
      }
    : {
        x: x + rand(-6, 6),
        y: y + rand(-6, 0),
        vx: rand(-13, -5),
        vy: rand(-20, -11),
        age: 0,
        ttl: rand(7, 11),
        size: rand(13, 20),
        growth: rand(BILLOW.growth[0], BILLOW.growth[1]),
        sway: rand(5, 10),
        swayFreq: rand(0.4, 0.9),
        phase: rand(0, Math.PI * 2),
        peak: BILLOW.alpha,
      }
}

export function HeroSpotlight() {
  const t = useTranslations("hero")
  const locale = useLocale()
  const reduced = useReducedMotion()
  const demoHref = locale === defaultLocale ? "/demo" : `/${locale}/demo`
  const isFa = locale === "fa"
  const panelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const wordmark = wordmarkRef.current
    if (!panel || !wordmark) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.to(wordmark, {
        y: 64,
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, panel)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const panel = panelRef.current
    const canvas = canvasRef.current
    if (!panel || !canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    let width = 0
    let height = 0
    let raf = 0
    let running = false
    let last = performance.now()

    const reveal = new window.Image()
    let revealReady = false
    reveal.onload = () => {
      revealReady = true
    }
    reveal.src = window.innerWidth < 820 ? REVEAL_IMAGE_SM : REVEAL_IMAGE

    const sprite = createSmokeSprite()
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, strength: 0, target: 0 }
    const ember = { energy: 0.7, target: 0.8, shiftAt: 0 }
    const puffs: Puff[] = []
    let drops: Drop[][] = []
    let smokeTimer = 0
    let spawnEvery = 120

    const spawnDrop = (layer: (typeof RAIN_LAYERS)[number]): Drop => ({
      x: rand(-30, width + 30),
      y: rand(-height * 0.15, height),
      len: rand(layer.len[0], layer.len[1]),
      speed: rand(layer.speed[0], layer.speed[1]),
    })

    const seedRain = () => {
      drops = RAIN_LAYERS.map((layer) =>
        Array.from({ length: Math.round(width * height * layer.density) }, () => spawnDrop(layer)),
      )
    }

    const resize = () => {
      const rect = panel.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedRain()
    }

    const emberPoint = () => {
      const rect = coverRect(IMAGE_W, IMAGE_H, width, height)
      return {
        x: rect.x + EMBER.x * rect.w,
        y: rect.y + EMBER.y * rect.h,
        k: Math.min(Math.max(rect.w / 1600, 0.6), 1.8),
      }
    }

    const drawReveal = () => {
      if (!revealReady || pointer.strength <= 0.015) return
      const rect = coverRect(reveal.naturalWidth, reveal.naturalHeight, width, height)
      const s = pointer.strength
      ctx.save()
      ctx.drawImage(reveal, rect.x, rect.y, rect.w, rect.h)
      ctx.globalCompositeOperation = "destination-in"
      const gradient = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        SPOTLIGHT_RADIUS,
      )
      gradient.addColorStop(0, `rgba(255,255,255,${s})`)
      gradient.addColorStop(0.45, `rgba(255,255,255,${s})`)
      gradient.addColorStop(0.62, `rgba(255,255,255,${0.8 * s})`)
      gradient.addColorStop(0.78, `rgba(255,255,255,${0.45 * s})`)
      gradient.addColorStop(0.9, `rgba(255,255,255,${0.14 * s})`)
      gradient.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      ctx.restore()
    }

    const updateEmber = (dt: number, now: number) => {
      if (now >= ember.shiftAt) {
        ember.target = rand(0.4, 1)
        ember.shiftAt = now + rand(260, 900)
      }
      ember.energy += (ember.target - ember.energy) * Math.min(1, dt * 7)
    }

    const drawEmberHalo = () => {
      const { x, y, k } = emberPoint()
      const e = ember.energy
      const radius = (30 + 16 * e) * k
      ctx.save()
      ctx.globalCompositeOperation = "lighter"
      const halo = ctx.createRadialGradient(x, y, 0, x, y, radius)
      halo.addColorStop(0, `rgba(255,96,30,${0.3 * e})`)
      halo.addColorStop(0.5, `rgba(255,62,20,${0.11 * e})`)
      halo.addColorStop(1, "rgba(255,62,20,0)")
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawEmberCore = () => {
      const { x, y, k } = emberPoint()
      const e = ember.energy
      const jx = x + rand(-0.8, 0.8)
      const jy = y + rand(-0.8, 0.8)
      const radius = (6.5 + 3.5 * e) * k
      ctx.save()
      ctx.globalCompositeOperation = "lighter"
      const core = ctx.createRadialGradient(jx, jy, 0, jx, jy, radius)
      core.addColorStop(0, `rgba(255,232,180,${e})`)
      core.addColorStop(0.35, `rgba(255,170,70,${0.75 * e})`)
      core.addColorStop(0.7, `rgba(255,110,40,${0.3 * e})`)
      core.addColorStop(1, "rgba(255,110,40,0)")
      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(jx, jy, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawSmoke = (dt: number, now: number) => {
      const { x, y } = emberPoint()

      smokeTimer += dt * 1000
      if (smokeTimer >= spawnEvery && puffs.length < MAX_PUFFS) {
        smokeTimer = 0
        spawnEvery = rand(80, 140)
        puffs.push(spawnPuff(x, y - 3))
      }

      ctx.save()
      ctx.globalCompositeOperation = "screen"
      for (let i = puffs.length - 1; i >= 0; i--) {
        const puff = puffs[i]
        puff.age += dt
        const life = puff.age / puff.ttl
        if (life >= 1) {
          puffs.splice(i, 1)
          continue
        }
        puff.x += (puff.vx + Math.sin(now * 0.001 * puff.swayFreq + puff.phase) * puff.sway) * dt
        puff.y += puff.vy * dt
        const size = puff.size + puff.growth * life
        const fade = life < 0.15 ? life / 0.15 : 1 - (life - 0.15) / 0.85
        ctx.globalAlpha = fade * puff.peak
        ctx.drawImage(sprite, puff.x - size / 2, puff.y - size * 0.62, size, size * 1.18)
      }
      ctx.restore()
    }

    const drawRain = (dt: number) => {
      ctx.lineCap = "round"
      RAIN_LAYERS.forEach((layer, index) => {
        const list = drops[index]
        if (!list) return
        ctx.strokeStyle = `rgba(200,213,234,${layer.alpha})`
        ctx.lineWidth = layer.width
        ctx.beginPath()
        for (const drop of list) {
          drop.y += drop.speed * dt
          drop.x += drop.speed * RAIN_WIND * dt
          if (drop.y - drop.len > height) {
            drop.y = rand(-60, -drop.len)
            drop.x = rand(-30, width + 30)
          }
          if (drop.x - 40 > width) drop.x -= width + 80
          ctx.moveTo(drop.x, drop.y)
          ctx.lineTo(drop.x - drop.len * RAIN_WIND, drop.y - drop.len)
        }
        ctx.stroke()
      })
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      pointer.strength += (pointer.target - pointer.strength) * 0.08
      pointer.x += (pointer.tx - pointer.x) * 0.11
      pointer.y += (pointer.ty - pointer.y) * 0.11
      updateEmber(dt, now)
      ctx.clearRect(0, 0, width, height)
      drawReveal()
      drawEmberHalo()
      drawSmoke(dt, now)
      drawEmberCore()
      drawRain(dt)
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = panel.getBoundingClientRect()
      pointer.tx = event.clientX - rect.left
      pointer.ty = event.clientY - rect.top
      if (pointer.x < -999) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
      }
      pointer.target = 1
    }

    const onPointerEnd = (event: PointerEvent) => {
      if (event.type === "pointerup" && event.pointerType === "mouse") return
      pointer.target = 0
    }

    panel.addEventListener("pointermove", onPointerMove)
    panel.addEventListener("pointerleave", onPointerEnd)
    panel.addEventListener("pointercancel", onPointerEnd)
    panel.addEventListener("pointerup", onPointerEnd)

    const observer = new IntersectionObserver(([entry]) =>
      entry?.isIntersecting ? start() : stop(),
    )
    observer.observe(panel)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(panel)
    resize()

    return () => {
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      panel.removeEventListener("pointermove", onPointerMove)
      panel.removeEventListener("pointerleave", onPointerEnd)
      panel.removeEventListener("pointercancel", onPointerEnd)
      panel.removeEventListener("pointerup", onPointerEnd)
    }
  }, [])

  return (
    <section className="dark relative bg-background p-3 sm:p-4 md:p-6" style={{ colorScheme: "dark" }}>
      <div
        ref={panelRef}
        className="relative flex h-[calc(100svh-24px)] flex-col overflow-hidden rounded-2xl bg-black text-cream sm:h-[calc(100svh-32px)] md:h-[calc(100svh-48px)] md:rounded-[2rem]"
      >
        <Image
          src={BASE_IMAGE}
          alt={t("altBackground")}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover object-center"
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-30 h-full w-full"
          aria-hidden="true"
        />

        <div
          className="noise-overlay pointer-events-none absolute inset-0 z-[34] opacity-[0.7] mix-blend-overlay"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[35] h-28"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0))",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] h-[46%]"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
          }}
        />

        <MacMenuBar />

        <div className="absolute inset-x-0 bottom-0 z-40 px-6 pb-6 md:px-10 md:pb-10">
          <div
            className="hero-anim hero-fade mb-6 flex items-end justify-between md:mb-8"
            style={{ animationDelay: "0.85s" }}
          >
            <div className="flex items-center gap-3">
              <span className="hero-scroll-line" aria-hidden="true" />
              <span className="text-[11px] font-bold text-cream/60 md:text-xs">
                {t("scrollHint")}
              </span>
            </div>
            <p
              className="text-[11px] font-bold text-cream/60 md:text-xs"
              aria-hidden="true"
            >
              {t("pageIndex")}
            </p>
          </div>

          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            <div ref={wordmarkRef} className="order-2 col-span-12 md:order-1 md:col-span-8">
              <WordsPullUp
                as="h1"
                text={t("wordmark")}
                showAsterisk
                delay={0.2}
                className={`block font-bold leading-[0.85] tracking-[-0.02em] text-[#E1E0CC] ${
                  isFa
                    ? "text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw]"
                    : "text-[24vw] sm:text-[21vw] md:text-[15vw] lg:text-[14vw] xl:text-[13vw]"
                }`}
              />
            </div>

            <div className="order-1 col-span-12 flex flex-col items-start gap-4 md:order-2 md:col-span-4 md:pb-4">
              <p
                className={`text-[10px] font-bold text-gold sm:text-xs ${isFa ? "" : "tracking-widest"}`}
              >
                {t("badge")}
              </p>
              <p className="text-sm font-semibold leading-snug md:text-lg" style={{ color: "#E1E0CC" }}>
                {t("titleLine1")} {t("titleLine2")}
              </p>
              <motion.p
                initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_CINEMA, delay: 0.5 }}
                className="text-pretty text-xs leading-snug text-primary/70 sm:text-sm md:text-base"
              >
                {t("description")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_CINEMA, delay: 0.65 }}
                className="flex flex-wrap items-center gap-3"
              >
                <ArrowCta href={demoHref} label={t("ctaPrimary")} size="lg" />
                <ArrowCta
                  href="#instagram-ai"
                  label={t("ctaSecondary")}
                  variant="outline"
                  size="lg"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE_CINEMA, delay: 0.8 }}
                className="text-[11px] leading-relaxed text-muted-cream"
              >
                {t("note")}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
