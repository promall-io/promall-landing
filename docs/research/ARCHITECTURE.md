# Architecture contract — promall-landing-v2

Every builder agent MUST follow this. It exists so 13 independently-built sections compose
into one coherent, fast app.

## Rendering strategy

**Server Components by default.** A section is a Server Component unless it needs state,
effects, or event handlers. Only the *interactive island* gets `'use client'` — never the
whole section.

Correct split for an interactive section:

```
components/sections/Pricing.tsx        // server: reads translations, renders shell + static markup
components/sections/PricingPlans.tsx   // 'use client': the billing toggle + price swap only
```

Wrong: putting `'use client'` at the top of `Pricing.tsx` and shipping the headings,
descriptions and feature lists to the browser as JS.

## Content

Single source of truth is `messages/fa.json` / `messages/en.json`, consumed through
next-intl. **No hardcoded user-facing strings in components** — ever.

- Server Components: `const t = await getTranslations('sections.pricing')`
- Client islands: receive content as **props from their server parent**. Do not call
  `useTranslations` inside a deeply-nested client leaf when the parent can pass the data —
  passing serialised props keeps the client bundle free of the message catalogue.
- Structured lists come from `t.raw('plans')` and are typed against `types/content.ts`.
  Cast once at the boundary: `t.raw('plans') as PricingPlan[]`.

## Styling

- Tailwind v4 utilities + the `pw-*` token classes from `app/globals.css`.
- **Never hardcode a colour, radius or font size that already exists as a token.** Use
  `var(--pw-cream)`, `.pw-h2`, `.pw-card`, `.pw-button` etc.
- RTL is the default direction. Use **logical properties only**: `ps-*`/`pe-*`,
  `ms-*`/`me-*`, `start-*`/`end-*`, `text-start`/`text-end`. Never `pl-*`, `pr-*`, `left-*`,
  `right-*`, `text-left`, `text-right`.
- Directional glyphs (arrows, chevrons pointing sideways) need `rtl:-scale-x-100`.
- Container: `<div className="pw-container">` inside `<section className="pw-section">`.

## Performance (non-negotiable)

- `next/image` for every raster asset, with explicit `width`/`height` or `fill` + `sizes`.
  Only the hero image gets `priority`; everything else lazy-loads by default.
- No animation library for something CSS can do. Marquees, drifts and hover states are CSS
  keyframes/transitions. framer-motion is for scroll-reveal and carousel transforms only.
- Animate `transform` and `opacity` only — never `width`, `height`, `top` or `left`.
- Carousels/accordions: no layout thrash. Use `transform: translate3d()` on a track, not
  per-item margin changes.
- Scroll listeners must be passive and throttled via `requestAnimationFrame`, or use
  framer-motion's `useScroll` which already is.
- No `useEffect` for anything derivable during render.

## Accessibility

- One `<h1>` on the page (hero). Sections use `<h2>`.
- Accordions: `<button aria-expanded aria-controls>` + a region with matching `id`.
- Tabs: `role="tablist"` / `role="tab"` with `aria-selected`, panels `role="tabpanel"`.
- Carousel arrows: real `<button>` with `aria-label` from the message catalogue.
- Decorative images: `alt=""`. Decorative SVG: `aria-hidden`.

## Conventions

- No comments in shipped code — self-documenting names (project rule).
- Type-safe: `npx tsc --noEmit` must pass. No `any`, no non-null `!` on unverified values.
- Named exports for components; file name matches the export.
- Shared primitives live in `components/ui/Primitives.tsx` — import `EyebrowPill`,
  `SectionHeading`, `ArrowLink`, `CircleButton` rather than re-implementing them.
- Scroll reveal: import `Reveal` from `components/Reveal.tsx`. Do not hand-roll variants.
- Icons: import from `components/icons.tsx`. If an icon is missing, add it there.
