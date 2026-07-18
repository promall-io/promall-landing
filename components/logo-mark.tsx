import type { ReactElement } from "react"

const VIEWBOX_WIDTH = 580
const VIEWBOX_HEIGHT = 660

const BOWL_PATH =
  "M 190 42 L 392 42 A 150 150 0 0 1 538 192 L 538 300 C 538 372 496 426 410 456 L 214 458 L 398 268 L 402 248 C 402 210 398 192 378 182 L 120 176 C 92 175 78 170 70 162 L 190 42 Z"
const STEM_PATH =
  "M 42 246 Q 42 234 54 234 L 179 234 Q 191 234 191 246 L 191 468 L 44 616 L 42 612 L 42 246 Z"

const INK_BOWL = "var(--ink)"
const INK_STEM = "var(--gold-deep)"
const WHITE_BOWL = "var(--cream)"
const WHITE_STEM = "var(--gold)"

type Props = {
  size?: number
  className?: string
  tone?: "auto" | "ink" | "white"
}

type MonogramProps = {
  width: number
  height: number
  bowlFill: string
  stemFill: string
  className?: string
}

function Monogram({ width, height, bowlFill, stemFill, className }: MonogramProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d={BOWL_PATH} fill={bowlFill} />
      <path d={STEM_PATH} fill={stemFill} />
    </svg>
  )
}

export function LogoMark({ size = 22, className, tone = "auto" }: Props): ReactElement {
  const width = size
  const height = Math.round((size * VIEWBOX_HEIGHT) / VIEWBOX_WIDTH)

  if (tone === "white") {
    return (
      <Monogram
        width={width}
        height={height}
        bowlFill={WHITE_BOWL}
        stemFill={WHITE_STEM}
        className={`shrink-0 ${className ?? ""}`}
      />
    )
  }

  if (tone === "ink") {
    return (
      <Monogram
        width={width}
        height={height}
        bowlFill={INK_BOWL}
        stemFill={INK_STEM}
        className={`shrink-0 ${className ?? ""}`}
      />
    )
  }

  return (
    <span
      className={`relative inline-flex shrink-0 ${className ?? ""}`}
      style={{ width, height }}
      aria-hidden="true"
    >
      <Monogram
        width={width}
        height={height}
        bowlFill={INK_BOWL}
        stemFill={INK_STEM}
        className="block dark:hidden"
      />
      <Monogram
        width={width}
        height={height}
        bowlFill={WHITE_BOWL}
        stemFill={WHITE_STEM}
        className="hidden dark:block"
      />
    </span>
  )
}
