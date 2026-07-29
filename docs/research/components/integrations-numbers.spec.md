# Integrations (radial hub) + Numbers (parallax stat cards)

Targets: `components/sections/Integrations.tsx`, `components/sections/Numbers.tsx`
(+ `NumbersParallax.tsx` `'use client'` for the drifting clouds)
References: `06-integrations-1.png`, `06-integrations-2.png`, `08-numbers-1.png`, `08-numbers-2.png`
Dumps: `docs/research/dumps/{integrations,numbers}.json`

---

## Integrations (h ≈ 1416)

`SectionHeading` (`integrations.eyebrow` / `titleLead` / `titleTrail` / `description`), then
the radial diagram, then a 4-up feature row.

### Radial diagram — pure CSS/SVG, no JS

A semicircular fan converging on a hub at the bottom centre.

- Wrapper: `position: relative`, `aspect-ratio: 1080/620`, margin-top 80px,
  `overflow: hidden`.
- **Arc guides:** one inline `<svg>` filling the wrapper, `viewBox="0 0 1080 620"`,
  containing 3 concentric arcs and 7 radial spokes, all
  `stroke: rgba(255,255,255,0.07); stroke-width: 1; fill: none`, converging on the hub point
  at `(540, 560)`. A horizontal hairline runs the full width at `y = 560`.
- **Hub:** 84px circle at the bottom centre, `background: var(--pw-surface-3)`,
  `ring-1 ring-[var(--pw-line-strong)]`, `ProMallMark` at 32px inside. Give it a soft
  `box-shadow: 0 0 60px rgba(255,255,255,0.06)`.
- **Nodes:** 7 bubbles from `integrations.nodes`, positioned along the arc with
  `left: 50%; top: …; transform: translate(-50%,-50%) rotate(±Ndeg)`. Diameters vary
  (56–72px), `background: var(--pw-surface-2)`, `ring-1 ring-[var(--pw-line)]`. Inside each,
  the node label at 11px `var(--pw-text-faint)`, rotated slightly (the reference tilts them
  along the arc — apply a per-node `rotate` between -28deg and +28deg).
  Compute positions from an angle array in the component, e.g.
  `[-70,-48,-24,0,24,48,70]` degrees at radii `[430,330,300,300,300,330,430]` — tune against
  the screenshot. Nodes must remain readable: cap the rotation, and under RTL do **not**
  mirror the label text (`transform` on the bubble only).
- Everything in this diagram is decorative except the labels; wrap in a `<figure>` with a
  visually-hidden `<figcaption>` listing the integrations as text so it is not lost to
  screen readers.

### Feature row

4 columns (`grid-cols-4`), separated by `1px` vertical rules in `var(--pw-line)`
(`divide-x` with logical direction, or `border-inline-start` on items 2–4).
Each cell: `padding: 0 24px`, title 16px `var(--pw-cream)`, description 14px
`var(--pw-text-dim)` margin-top 8px, and the icon **below** the text at margin-top 32px,
20px, `var(--pw-text-faint)`.
Icon mapping from `feature.icon`: `plug → PlugIcon`, `bolt → BoltIcon`,
`shield → ShieldIcon`, `trend → TrendIcon`.

≤810px: 2 columns, rules become horizontal. ≤390px: 1 column. The radial diagram scales
down with its aspect ratio; drop to 5 nodes below 810px by slicing the array.

---

## Numbers (h ≈ 1607)

`SectionHeading` — note this one has **no description**, and the emphasis is inverted:
`titleLead` is the dim part and `titleTrail` is the bright part. Pass `titleLead` through
`.pw-h2-dim` and render `titleTrail` bright, i.e. build the `<h2>` inline here rather than
using `SectionHeading`'s default lead/trail emphasis.

### Two stat cards

Offset from each other — card 1 starts at the container start and sits ~54px higher;
card 2 starts at ~52% width and is pushed down. Use a 2-column grid with
`grid-template-columns: 1fr 1fr`, gap 40px, and `margin-block-start` on the second card
(`mt-[54px]`) plus `mb-[54px]` on the first.

Card: `border-radius: 24px`, `overflow: hidden`, `aspect-ratio: 520/730`, `position: relative`.
- Background image fills it: `/landscape/stat-card-a.png` / `stat-card-b.png`, `next/image`
  `fill`, `object-fit: cover`, `sizes="(max-width: 810px) 100vw, 520px"`.
- A top-down scrim over the image: `linear-gradient(180deg, rgba(10,14,20,0.55) 0%, rgba(10,14,20,0) 45%)`.
- Content at the top, `padding: 40px`: the value in **Inter, tabular numerals**
  (`.pw-num`) at 96px / weight 300 / `var(--pw-cream)`, with the `unit` inline after it at
  the same size but `color: var(--pw-text-dim)`. Description 16px `var(--pw-text)` below,
  max-width ~28ch.
  **Persian digits from the message catalogue render fine in Estedad — but the big number
  must use Estedad, not Inter, for `fa`.** Use `.pw-num` only when the locale is `en`;
  otherwise let it inherit the body font. Pass the locale down or key off a CSS
  `:lang(fa)` selector.
- A tag pill at the bottom (`padding: 40px`, `mt-auto`): dot + `card.tag`, same styling as
  `EyebrowPill` but with `background: rgba(0,0,0,0.35)` and `backdrop-filter: blur(6px)`.

### Drifting clouds — the parallax

Two decorative cloud PNG layers overlay the cards and drift horizontally as you scroll.
There is no separate cloud asset, so build them from a soft radial gradient:
`background: radial-gradient(60% 60% at 50% 50%, rgba(232,220,214,0.5), rgba(232,220,214,0) 70%)`,
`filter: blur(18px)`, sized ~360×160, `position: absolute`, `pointer-events: none`,
`mix-blend-mode: screen`, `opacity: 0.55`.

Client island `NumbersParallax.tsx` wraps them:
```
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
const x1 = useTransform(scrollYProgress, [0, 1], ['-8%', '10%'])
const x2 = useTransform(scrollYProgress, [0, 1], ['6%', '-9%'])
```
Apply as `style={{ x: x1 }}` on `motion.div`. **Transform only.** Under
`prefers-reduced-motion`, render them static.

### Mini stat row

4 columns from `numbers.stats`, margin-top 100px: the icon at the top (20px,
`var(--pw-text-faint)`), the value at 32px `var(--pw-cream)` margin-top 20px, description
14px `var(--pw-text-dim)` margin-top 8px, max-width ~22ch.
Icon mapping: `gauge → GaugeIcon`, `checkCircle → CheckCircleIcon`, `spark → SparkIcon`,
`clock → ClockIcon`.

≤810px: cards stack (remove the offsets), stat row goes 2 columns.

## Content keys
`sections.integrations.*`, `sections.numbers.*`
(`t.raw('cards') as StatCard[]`, `t.raw('stats') as MiniStat[]`,
`t.raw('features') as IntegrationFeature[]`, `t.raw('nodes') as string[]`)
