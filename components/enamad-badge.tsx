import Image from "next/image"

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
        className="group relative block"
        aria-label="نماد اعتماد الکترونیکی"
      >
        <div
          className={`
            relative ${sizeClasses[size]} rounded-2xl overflow-hidden
            bg-background/50 backdrop-blur-sm border border-border/50 p-2
            transition-all duration-300
            group-hover:border-primary/50 group-hover:shadow-glow-primary group-hover:scale-105
          `}
        >
          <Image
            src={logoUrl}
            alt="نماد اعتماد الکترونیکی پروMall"
            width={100}
            height={100}
            className="w-full h-full object-contain"
            unoptimized
            priority={false}
          />
        </div>
      </a>
    </div>
  )
}
