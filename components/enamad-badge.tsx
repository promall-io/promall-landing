"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

interface EnamadBadgeProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "w-20 h-20",
  md: "w-24 h-24 md:w-28 md:h-28",
  lg: "w-32 h-32 md:w-36 md:h-36",
}

export function EnamadBadge({ className = "", size = "md" }: EnamadBadgeProps) {
  const t = useTranslations("enamad")
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const ENAMAD_ID = "650462"
  const ENAMAD_CODE = "b6cJOzpyayyExJwFHb8LSZv4ZdAJ24MB"
  const trustSealUrl = `https://trustseal.enamad.ir/?id=${ENAMAD_ID}&Code=${ENAMAD_CODE}`
  const logoUrl = `https://trustseal.enamad.ir/logo.aspx?id=${ENAMAD_ID}&Code=${ENAMAD_CODE}`

  return (
    <div className={className}>
      <a
        referrerPolicy="origin"
        target="_blank"
        rel="noopener noreferrer"
        href={trustSealUrl}
        className="group relative block w-fit rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label={t("label")}
      >
        <div
          className={`relative ${sizeClasses[size]} overflow-hidden rounded-2xl border border-cream/10 bg-panel p-2 transition-all duration-300 group-hover:scale-[1.03] group-hover:border-gold/40`}
        >
          <div
            className={`flex h-full w-full items-center justify-center rounded-xl p-1.5 transition-colors duration-300 ${
              loaded ? "bg-white" : "bg-panel"
            }`}
          >
            {!failed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={t("altText")}
                width={100}
                height={100}
                loading="lazy"
                referrerPolicy="origin"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={`h-full w-full object-contain transition-opacity duration-300 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : null}
            {!loaded ? (
              <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-[10px] font-bold leading-tight text-cream/40">
                {t("label")}
              </span>
            ) : null}
          </div>
        </div>
      </a>
    </div>
  )
}
