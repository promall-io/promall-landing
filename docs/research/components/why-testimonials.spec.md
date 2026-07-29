# Why (card carousel) + Testimonials (quote carousel)

Targets: `components/sections/Why.tsx` + `WhyCarousel.tsx` (`'use client'`),
`components/sections/Testimonials.tsx` + `TestimonialsCarousel.tsx` (`'use client'`)
References: `04-why.png`, `11-testimonials.png`
Dumps: `docs/research/dumps/{why,testimonials}.json`
Interaction model for both: **click-driven carousel** (arrow buttons). Not scroll-driven.

---

## Why (h ≈ 1204)

`SectionHeading` (`why.eyebrow` / `titleLead` / `titleTrail` / `description`), then a
horizontal track.

**Track:** 3 cards from `why.cards`, each `flex: 0 0 auto`, width `calc((100% - 48px) / 2.72)`
so the third card **bleeds off the end edge** — that overflow is intentional and visible in
the reference. Gap 24px. The track sits in a container with `overflow: hidden`.

Move the track with `transform: translate3d()` only:
```
style={{ transform: `translate3d(${dir * index * step}px,0,0)` }}
```
where `dir` is `-1` in LTR and `+1` in RTL. Transition `transform 0.6s var(--pw-ease)`.
Never animate `margin` or `left`.

**Card:** `.pw-card`, `padding: 10px`, then:
- Illustration well: `aspect-ratio: 1/1`, `border-radius: 14px`,
  `background: #050505`, `ring-1 ring-[var(--pw-line)]`, centred illustration at ~72% width.
  Images are `/illustrations/iso-layers.svg`, `iso-key.svg`, `iso-dial.svg` — render with
  `next/image` (`width`/`height` from the card size), `alt=""`, `aria-hidden`.
- Body: `padding: 22px 14px 18px`. Title 16px `var(--pw-cream)`; description 14px
  `var(--pw-text-dim)`, margin-top 8px, max 2 lines.

**Controls row** below the track, margin-top 28px: prev `CircleButton` at the start, a
progress rail filling the middle (`height: 1px`, `background: var(--pw-line)`, with an inner
bar in `var(--pw-cream)` whose width is `((index+1)/count)*100%` and which transitions on
`transform: scaleX()` — set `transform-origin` to the logical start), next `CircleButton` at
the end.

Buttons disable at the ends (`disabled` + `opacity: 0.4`), they do **not** wrap.

Labels: `why.prevLabel` / `why.nextLabel`.

---

## Testimonials (h ≈ 1242)

`SectionHeading`, then one large card: `.pw-card`, `padding: 32px`, `border-radius: 24px`,
`min-height: 640px`, laid out as two columns (`grid-cols-[1fr_380px]`, gap 40px).

**Start column** (flex-col, full height):
- An abstract company mark at the top (define a local inline SVG — do not invent a real
  brand), 40px tall, `opacity: 0.5`.
- Quote pushed to the bottom (`mt-auto`): 22px / line-height 1.75 / `var(--pw-cream)`,
  max-width ~40ch.
- Hairline `1px solid var(--pw-line)` above the byline row, margin-top 28px.
- Byline row: prev + next `CircleButton`s at the start, then name (14px `var(--pw-cream)`)
  over role (14px `var(--pw-text-dim)`), and dots pushed to the end — one 5px dot per item,
  active `var(--pw-cream)`, rest `var(--pw-text-faint)`.

**End column:** the portrait, `aspect-ratio: 3/4`, `border-radius: 14px`, `object-fit: cover`,
`next/image` with `sizes="(max-width: 810px) 100vw, 380px"`.

**Transition:** cross-fade the quote + portrait together with `AnimatePresence mode="wait"`,
`duration: 0.45`, ease `[0.44,0,0.56,1]`. Arrows wrap around (5 items).

Labels: `testimonials.prevLabel` / `testimonials.nextLabel`. Dots are buttons with
`aria-label` naming the index and `aria-current` on the active one.

---

## Shared rules

- Only the track/state lives in the client component; headings stay server-side.
- Respect `prefers-reduced-motion`: skip the transform transition, swap instantly.
- ≤810px: Why shows 1.15 cards per view; Testimonials stacks to one column with the portrait
  above the quote and `min-height` removed.

## Content keys
`sections.why.*` (`t.raw('cards') as WhyCard[]`), `sections.testimonials.*`
(`t.raw('items') as Testimonial[]`)
