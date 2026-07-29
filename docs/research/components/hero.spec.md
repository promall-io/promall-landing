# Hero

Target: `components/sections/Hero.tsx` (+ `HeroMockup.tsx` if you split the app card)
Reference: `docs/design-references/01-hero.png` · Dump: `docs/research/dumps/hero.json`
Interaction model: **static, with entrance reveals and a layered parallax backdrop**

## Structure (bottom → top in z-order)

1. **Sky gradient** — the section background. Dark slate at the top fading to a warm dusk
   mauve at the horizon: `linear-gradient(180deg, #10161d 0%, #1b2228 38%, #3d3038 62%, #6b4f52 82%, #7d5a58 100%)`.
   Tune against the screenshot; the horizon glow sits around 75–85% down the section.
2. **Hill layers** — three PNGs pinned to the bottom of the section, all `position: absolute`,
   `inset-inline: 0`, `bottom: 0`, `object-fit: cover`, `width: 100%`:
   - `/landscape/hill-back.png` (1527×563) — furthest, largest, lowest opacity feel
   - `/landscape/hill-mid.png` (1757×604)
   - `/landscape/hill-front.png` (929×184) — the dark foliage band at the very bottom
   Each is decorative → `alt=""`, `aria-hidden`. Give each a small parallax `y` offset
   driven by `useScroll` (`useTransform(scrollYProgress, [0,1], ['0%','12%'])` etc., front
   layer moves most). Transform only.
3. **Content column** — centred, `pw-container`, `text-align: center`.
4. **App mockup card** — overlaps the hills, clipped by the section bottom.

## Content column

Section height ≈ 1314px. Content starts ~175px from the top (below the fixed nav).

| Element | Spec |
|---|---|
| Announcement pill | rendered by `AnnouncementBar` — **do not build it here**, it is a sibling |
| H1 | `.pw-h1`, max-width ~20ch, balance, `hero.title` |
| Subtitle | `.pw-small`, `var(--pw-text)`, max-width ~38ch, margin-top 20px |
| CTA row | margin-top 40px, `gap: 10px`, centred: `.pw-button .pw-button-primary` with `hero.primaryCta`, plus a 44px circular button containing `PlayIcon` |

Reveal: H1 at `delay 0`, subtitle `0.08`, CTA row `0.16`, mockup `0.24` — all via `Reveal`.

## App mockup card

A dark glass panel, ~955px wide at 1440, `border-radius: 24px`, `background: rgba(13,13,13,0.72)`,
`backdrop-filter: blur(20px)`, `ring-1 ring-[var(--pw-line)]`, top edge ~590px into the section,
extends past the section bottom (parent has `overflow: hidden`).

Build it as **markup, not an image** — it is the product shot and must be crisp and RTL-correct:

- Top row: `ProMallMark` at the start, a small 32px circular menu button at the end.
- Centred: `hero.mockup.greeting` in `.pw-h3`, `hero.mockup.prompt` in `.pw-small`.
- Composer: rounded 16px box, `background: rgba(255,255,255,0.04)`, `ring-1`, min-height 108px,
  placeholder text `hero.mockup.placeholder` at 14px `var(--pw-text-faint)`; a row of three
  20px muted icons at the start-bottom and two 30px circular buttons at the end-bottom.
- Tab row: pills from `hero.mockup.tabs`, first one active
  (`background: rgba(255,255,255,0.1)`), rest `ring-1 ring-[var(--pw-line)]`; a `SearchIcon`
  at the far end.
- Suggestion rows: from `hero.mockup.suggestions`, each a full-width row with the text at the
  start and a 24px circular arrow at the end, separated by `1px solid var(--pw-line)`.
  Second row is dimmed (fading out under the section edge).

## Responsive
- ≤810px: H1 clamps down (already handled by `.pw-h1`), mockup card goes full-bleed minus
  16px gutters, suggestion rows keep only the first.
- ≤390px: CTA row stays horizontal, hills still cover.

## Content keys
`sections.hero.*`
