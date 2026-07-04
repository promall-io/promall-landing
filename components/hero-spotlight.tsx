"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { MacMenuBar } from "@/components/mac-menu-bar"

const BASE_IMAGE = "/brand/hero-bazaar-base.webp"
const REVEAL_IMAGE = "/brand/hero-bazaar-reveal.webp"
const REVEAL_IMAGE_SM = "/brand/hero-bazaar-reveal-sm.webp"

const IMAGE_W = 2400
const IMAGE_H = 1670
const SPOTLIGHT_RADIUS = 260
const SMOKE_SOURCE = { x: 0.406, y: 0.537 }
const RAIN_WIND = 0.12
const MAX_PUFFS = 36

const RAIN_LAYERS = [
  { density: 1 / 21000, len: [11, 17], speed: [640, 860], alpha: 0.11, width: 1 },
  { density: 1 / 15000, len: [18, 27], speed: [1040, 1360], alpha: 0.16, width: 1.25 },
  { density: 1 / 26000, len: [30, 46], speed: [1560, 1980], alpha: 0.22, width: 1.6 },
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
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

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
  gradient.addColorStop(0, "rgba(218,227,242,0.62)")
  gradient.addColorStop(0.4, "rgba(207,218,236,0.28)")
  gradient.addColorStop(0.75, "rgba(197,210,232,0.09)")
  gradient.addColorStop(1, "rgba(197,210,232,0)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 160, 160)
  return sprite
}

export function HeroSpotlight() {
  const t = useTranslations("hero")
  const panelRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const puffs: Puff[] = []
    let drops: Drop[][] = []
    let smokeTimer = 0
    let spawnEvery = 180

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

    const drawSmoke = (dt: number, now: number) => {
      const rect = coverRect(IMAGE_W, IMAGE_H, width, height)
      const emitterX = rect.x + SMOKE_SOURCE.x * rect.w
      const emitterY = rect.y + SMOKE_SOURCE.y * rect.h

      smokeTimer += dt * 1000
      if (smokeTimer >= spawnEvery && puffs.length < MAX_PUFFS) {
        smokeTimer = 0
        spawnEvery = rand(150, 260)
        puffs.push({
          x: emitterX + rand(-7, 7),
          y: emitterY + rand(-4, 2),
          vx: rand(-11, -4),
          vy: rand(-26, -15),
          age: 0,
          ttl: rand(5.5, 8.5),
          size: rand(10, 16),
          growth: rand(46, 72),
          sway: rand(3.5, 8),
          swayFreq: rand(0.5, 1.1),
          phase: rand(0, Math.PI * 2),
        })
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
        const fade = life < 0.18 ? life / 0.18 : 1 - (life - 0.18) / 0.82
        ctx.globalAlpha = fade * 0.18
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
      ctx.clearRect(0, 0, width, height)
      drawReveal()
      drawSmoke(dt, now)
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
    <section className="relative bg-background p-2.5 sm:p-3.5 md:p-5">
      <div
        ref={panelRef}
        className="relative flex h-[calc(100svh-20px)] flex-col overflow-hidden rounded-[22px] bg-[#0b1120] text-white sm:h-[calc(100svh-28px)] sm:rounded-[26px] md:h-[calc(100svh-40px)] md:rounded-[30px]"
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
          className="pointer-events-none absolute inset-x-0 top-0 z-[35] h-28"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to bottom, rgba(6,11,22,0.55), rgba(6,11,22,0))",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] h-[36%]"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to top, rgba(6,11,22,0.68), rgba(6,11,22,0))",
          }}
        />

        <MacMenuBar />

        <div className="relative z-40 flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
          <p
            className="hero-anim hero-fade text-[13px] font-bold text-white/75 md:text-sm"
            style={{ animationDelay: "0.15s" }}
          >
            {t("badge")}
          </p>

          <h1 className="mt-4 text-balance text-[40px] font-extrabold leading-[1.14] tracking-tight [text-shadow:0_2px_28px_rgba(4,8,16,0.55)] sm:text-6xl md:text-7xl lg:text-[80px] lg:leading-[1.07] xl:text-[88px]">
            <span
              className="hero-anim hero-reveal block"
              style={{ animationDelay: "0.25s" }}
            >
              {t("titleLine1")}
            </span>
            <span
              className="hero-anim hero-reveal block text-[var(--gold)]"
              style={{ animationDelay: "0.42s" }}
            >
              {t("titleLine2")}
            </span>
          </h1>

          <p
            className="hero-anim hero-fade mt-6 max-w-xl text-pretty text-[13px] font-medium leading-6 text-white/80 sm:text-sm sm:leading-7"
            style={{ animationDelay: "0.6s" }}
          >
            {t("description")}
          </p>
        </div>

        <div className="relative z-40 flex items-end justify-between px-6 pb-6 md:px-9 md:pb-8">
          <div
            className="hero-anim hero-fade flex items-center gap-3"
            style={{ animationDelay: "0.85s" }}
          >
            <span className="hero-scroll-line" aria-hidden="true" />
            <span className="text-[11px] font-bold text-white/60 md:text-xs">
              {t("scrollHint")}
            </span>
          </div>
          <p
            className="hero-anim hero-fade text-[11px] font-bold text-white/60 md:text-xs"
            style={{ animationDelay: "0.85s" }}
            aria-hidden="true"
          >
            {t("pageIndex")}
          </p>
        </div>
      </div>
    </section>
  )
}
