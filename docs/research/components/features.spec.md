# Features — click-driven tab carousel

Targets: `components/sections/Features.tsx` (server) + `FeaturesTabs.tsx` (`'use client'`)
Reference: `03-features.png` · Dump: `docs/research/dumps/features.json`
Interaction model: **CLICK-DRIVEN.** Verified by scrolling first — nothing changes on scroll.
Tabs switch on click; prev/next arrows step through the same 4 states. **Not scroll-driven.**

## Layout (h ≈ 1329)

1. `SectionHeading` — `features.eyebrow` / `titleLead` / `titleTrail` / `description`.
   The description sits at the **end** of the header row, top-aligned with the headline's
   last line, max-width ~34ch.
2. Tab row — 4 labels spread across the full container width (`grid-cols-4`, each centred),
   margin-top ~90px. 16px text. Active: `var(--pw-cream)`. Inactive: `var(--pw-text-faint)`.
   Transition `color 0.4s var(--pw-ease)`.
3. Stage — a large frame, full container width, `aspect-ratio: 1080/610`,
   `border-radius: 24px`, `overflow: hidden`, `background: var(--pw-surface-solid)`,
   `ring-1 ring-[var(--pw-line)]`, margin-top 32px. The active tab's image fills it
   (`next/image` with `fill`, `sizes="(max-width: 810px) 100vw, 1080px"`, `object-fit: cover`).
4. Footer row — margin-top 28px, three parts: prev circle button at the start, the active
   tab's `caption` centred (16px `var(--pw-text)`), next circle button at the end.

## State machine

`useState<number>(0)` over `tabs` (4 entries). Arrows wrap around (`(i + 1) % 4`,
`(i - 1 + 4) % 4`). Clicking a label sets the index directly.

## Transition between states

Cross-fade only — **do not slide**, and do not animate width/height.
```
<AnimatePresence mode="wait">
  <motion.div key={active.id}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.45, ease: [0.44,0,0.56,1] }} />
</AnimatePresence>
```
The caption cross-fades on the same key and duration.

## Accessibility

`role="tablist"` on the label row, each label a `<button role="tab" aria-selected>` with
`id` + `aria-controls` pointing at the stage, which is `role="tabpanel"` with a matching
`aria-labelledby`. Arrow buttons use `CircleButton` with `features.prevLabel` /
`features.nextLabel`. Support Left/Right arrow keys on the tablist (direction-aware under RTL).

## Performance

The four images must not all mount. Render only the active one inside `AnimatePresence`;
preload the next index's image with `<link rel="prefetch">`-style behaviour by passing
`priority={false}` and letting Next lazy-load. Keep the client component to the tab row +
stage + footer row; the heading stays in the server parent.

## RTL

Arrow glyphs need `rtl:-scale-x-100`. "Next" advances in the reading direction — under RTL
the next button sits at the **start** visually because it is placed with logical properties;
keep prev at `justify-start` and next at `justify-end` and let direction handle it.

## Responsive
- ≤810px: tab row scrolls horizontally (`overflow-x: auto`, `scrollbar-width: none`), stage
  keeps its aspect ratio, caption drops below the arrows.
- ≤390px: caption 14px.

## Content keys
`sections.features.*`, tabs via `t.raw('tabs') as FeatureTab[]`
