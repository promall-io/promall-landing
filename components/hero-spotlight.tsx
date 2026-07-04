"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowUpRight } from "@/components/icons"
import { MacMenuBar } from "@/components/mac-menu-bar"

const SPOTLIGHT_R = 260

const BASE_IMAGE = "/brand/hero-rain-base.webp"
const REVEAL_IMAGE = "/brand/hero-rain-reveal.webp"

function RevealLayer({
  image,
  cursorX,
  cursorY,
}: {
  image: string
  cursorX: number
  cursorY: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [maskUrl, setMaskUrl] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const gradient = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    )
    gradient.addColorStop(0, "rgba(255,255,255,1)")
    gradient.addColorStop(0.4, "rgba(255,255,255,1)")
    gradient.addColorStop(0.6, "rgba(255,255,255,0.75)")
    gradient.addColorStop(0.75, "rgba(255,255,255,0.4)")
    gradient.addColorStop(0.88, "rgba(255,255,255,0.12)")
    gradient.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2)
    ctx.fill()
    setMaskUrl(canvas.toDataURL())
  }, [cursorX, cursorY])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <div
        className="hero-zoom absolute inset-0 z-30 bg-cover bg-center bg-no-repeat pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${image})`,
          opacity: maskUrl ? 1 : 0,
          maskImage: maskUrl ? `url(${maskUrl})` : undefined,
          WebkitMaskImage: maskUrl ? `url(${maskUrl})` : undefined,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
    </>
  )
}

export function HeroSpotlight() {
  const t = useTranslations("hero")
  const mouse = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number>()
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY }
    }
    window.addEventListener("mousemove", onMouseMove)

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      setCursorPos({ x: smooth.current.x, y: smooth.current.y })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#0b1120] text-white">
      <link rel="preload" as="image" href={BASE_IMAGE} />
      <link rel="preload" as="image" href={REVEAL_IMAGE} />

      <div
        className="hero-zoom absolute inset-0 bg-cover bg-center bg-no-repeat"
        role="img"
        aria-label={t("altBackground")}
        style={{ backgroundImage: `url(${BASE_IMAGE})` }}
      />

      <RevealLayer image={REVEAL_IMAGE} cursorX={cursorPos.x} cursorY={cursorPos.y} />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[35] h-[45%]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, rgba(6,11,22,0.72), rgba(6,11,22,0))",
        }}
      />

      <MacMenuBar />

      <div className="relative z-40 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
          <div
            className="hero-anim hero-fade mb-5 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="size-1.5 rounded-full bg-[var(--gold)]" aria-hidden="true" />
            <span className="text-[13px] font-semibold text-white/85 md:text-[14px]">
              {t("badge")}
            </span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.15] tracking-tight [text-shadow:0_2px_28px_rgba(4,8,16,0.55)] sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[1.1] xl:text-[76px]">
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
        </div>

        <div className="flex flex-col gap-6 p-6 pb-8 md:flex-row md:items-end md:justify-between md:p-10">
          <div
            className="hero-anim hero-fade max-w-md"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-pretty text-sm font-medium leading-7 text-white/80 md:text-base md:leading-8">
              {t("description")}
            </p>
            <p className="mt-3 text-[12px] font-semibold text-white/55">
              {t("note")}
            </p>
          </div>

          <div
            className="hero-anim hero-fade flex flex-col items-start gap-4 md:items-end"
            style={{ animationDelay: "0.85s" }}
          >
            <div className="md:text-end">
              <p className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {t("statValue")}
              </p>
              <p className="text-[11px] font-bold tracking-wider text-white/60 md:text-[12px]">
                {t("statLabel")}
              </p>
            </div>
            <a
              href="https://app.promall.io"
              className="group flex items-center gap-3 rounded-full bg-white py-2.5 pe-3 ps-6 text-[15px] font-extrabold text-[#11192a] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("ctaPrimary")}
              <span className="flex size-8 items-center justify-center rounded-full bg-[#11192a]/10 transition-colors duration-300 group-hover:bg-[#11192a]/15">
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
