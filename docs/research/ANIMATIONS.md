# Animation Bible — Powder → landing v3

Re-probed live at `https://powder.framer.website/` (1920px viewport, 2026-07-28).
Supersedes the animation claims in `BEHAVIORS.md` where they conflict.

## Corrections to v2's BEHAVIORS.md

### 1. Intro paragraphs are scroll-linked — v2 built them static ❌ → fixed ✅

v2 rendered the lead at `--pw-cream` and the rest at `--pw-text-faint`, permanently.
The real page keeps **all three blocks the same colour** and animates **opacity**:

- Inactive block: `opacity: 0.25`
- Active block: `opacity: 1`
- Set inline by framer-motion, **reversible** — scrolling back re-dims later blocks.

Trigger is a **focus line at ~50% of viewport height**. The active block is the *last*
one whose `getBoundingClientRect().top` is still above that line. Verified on the live
site at `scrollY 1313`: para 1 `opacity 1`, paras 2–3 `opacity 0.25`.

> A one-shot `IntersectionObserver` reveal can never reproduce this — the effect must
> re-evaluate on every scroll frame, in both directions.

Was implemented as `components/ScrollHighlight.tsx` (rAF-throttled scroll listener,
`transition: opacity 0.4s var(--pw-ease)`). **Removed** — holding two of three paragraphs
at `opacity: 0.25` made the Intro copy unreadable; that section is now static centered text.

**Reduced-motion fallback:** all blocks render at `opacity: 1` (no dimming). Bailing out
of the effect early would freeze the initial frame and leave 2 of 3 paragraphs stuck at
25% opacity — a contrast defect, not an animation.

### 2. Why carousel is free-drag — v2 built index-snapping ❌ → fixed ✅

The live track reports `cursor: grab`, `display: flex`, `gap: 24px`,
`scrollWidth 2104 > clientWidth 1080`. It is a **free drag**, not a stepped carousel.

- Drag moves the track 1:1 with the pointer, clamped to `[0, scrollWidth - clientWidth]`.
- The progress rail is **continuous** (`0.25 + progress * 0.75`), not `(index+1)/count`.
- Arrows step by one card width (`card.width + 24`) and are disabled at each end.
- Release settles with `transform 600ms var(--pw-ease)`; during drag `transition: none`.

Implemented in `components/sections/WhyCarousel.tsx` via pointer events, RTL-aware
(`sign = isRtl ? 1 : -1`).

## Confirmed correct in v2 (re-verified, left unchanged)

### 3. Header gradient scrim — v2 had none ❌ → fixed ✅

I initially reported "no gradient" because I only diffed the nav's **ancestor chain and
descendants for changes across scroll**. The scrim is a nav child whose values are
*constant*, so a change-diff could never surface it. Re-probing for gradients directly
found it immediately.

`nav`'s 3rd node is a **204px-tall black→transparent scrim**, `pointer-events: none`,
sitting behind the nav content:

```
height: 204px  (nav bar itself is only 48px — the scrim overhangs below it)
background-image: linear-gradient(rgb(0,0,0) 0%, … , rgba(0,0,0,0) 100%)
```

50 stops, alpha ramping 1 → 0 on a smoothstep curve
(`10.2%→0.98, 20.4%→0.918, 30.6%→0.81, 40.8%→0.667, 51%→0.48, 61.2%→0.3, 71.4%→0.165,
81.6%→0.067, 91.8%→0.01`). Reproduced with 19 stops as `.pw-nav-scrim` in `globals.css`.

**It is NOT scroll-triggered.** Verified identical at `scrollY` 0 and 800. It only *looks*
like it appears on scroll because the hero's light sky sits under it at the top, and dark
content slides under it further down — the scrim itself never changes.

### Header — its own styles are static on scroll ✅

Explicitly re-tested. Diffed the nav's full ancestor chain **and all 30 descendants**
across `scrollY` 0 → 700 → 900: **zero** differences in background, backdrop-filter,
box-shadow, border-radius, height, padding, transform or class name. There is no
variant swap and no floating/shrinking header.

The nav is `position: fixed; top: 0` inside `.framer-1xw88z8-container` (`z-index: 7`).
Its only animation is the **entry** one, on load:

```
initial: { opacity: 0.001, transform: translateY(-36px) }
animate: { opacity: 1,     transform: translateY(0) }
transition: { duration: 1, ease: [0.44, 0, 0.56, 1] }
```

Do not add a scroll-triggered header state — the original has none.

### Appear animations ✅

Two variants, matching v2's existing `Reveal` implementation:

```
tween  (most)  opacity 0.001→1, y 36→0, duration 1,   ease [0.44,0,0.56,1]
spring (chrome) opacity 0.001→1, y 0,   duration 0.5, bounce 0
```

Not CSS keyframes — Framer drives these in JS. No `data-framer-appear-id` elements and
no appear `@keyframes` exist in the stylesheets (only `__framer-loading-spin`).

### Smooth scroll — Lenis ✅

`document.documentElement` carries `class="lenis lenis-autoToggle"`; `window.lenis` is
exposed. Native `scroll-behavior` stays `auto`.

### Sticky elements — 4 total, all `top: 120px` ✅

| Section | Count | Height |
|---|---|---|
| About (stacked cards) | 3 | 628px each, inside a 2630px section |
| FAQ (category rail) | 1 | 140px |

v3 matched About but **not the FAQ rail** — now fixed
(`min-[811px]:sticky min-[811px]:top-[120px]` in `FaqPanel.tsx`). v3 now reports the same
4 sticky elements at `top: 120px`, About cards at 628px.

### Shared easing ✅

Every interactive transition on the live site is
`color 0.4s cubic-bezier(0.44, 0, 0.56, 1)`. v3's `--pw-ease` is
`cubic-bezier(.44,0,.56,1)` — an exact match.

### Features tabs — crossfade ✅, active pill was missing ❌ → fixed

Mechanism confirmed: all 4 panels are **stacked at identical coordinates**, and exactly
one wrapper sits at `opacity: 1` while the rest are `0`. It is a crossfade, not a slide
track — v3's `AnimatePresence` approach was already right.

Active tab styling (settled state, cursor moved away):

| | background | text |
|---|---|---|
| active | `rgba(23, 23, 23, 0.85)`, `border-radius: 609px` | `rgb(255, 243, 240)` |
| inactive | transparent | `rgba(255, 255, 255, 0.8)` |

v3 changed **text colour only** — the filled pill was missing. Fixed with
`bg-[var(--pw-surface-2)] ring-1 ring-[var(--pw-line)]`, matching the FAQ active pill.

### Pricing toggle — geometry corrected ✅

| | Powder | v3 before | v3 now |
|---|---|---|---|
| track | 36 × 18 | 34 × 20 | 36 × 18 |
| knob | 12 × 12, `rgb(255,243,240)` | 16 × 16, white | 12 × 12, `--pw-cream` |
| travel | 18px | 14px | 18px |

Track colour on Powder is teal `rgb(23, 114, 117)`. **v3 deliberately maps `--pw-teal` to
`--pw-gold`** — a ProMall brand adaptation, intentionally *not* matched. Left as-is.

### Testimonials — crossfade ✅, dot size corrected

Same stacked-panel opacity crossfade as Features. Dots are **4px**: active
`rgb(255, 243, 240)`, inactive `rgba(255, 255, 255, 0.25)`. v3 had 5px → now `size-1`.
Inactive colour stays on the `--pw-text-faint` token (brand-consistent).

### No scroll-snap ✅ · Numbers parallax clouds ✅

## Ruled out — do not build

- **Integrations orbit does not rotate.** The logos appeared to move between two
  screenshots, but sampling their `transform` and bounding boxes 1.5s apart with no
  scroll returned *identical* values and `animation-name: none`. The apparent movement
  was the section's appear animation still settling.
- **No text mask reveal.** The only masked elements in the Intro are edge-fade gradients
  and SVG logo masks — the paragraph effect is plain opacity.

## Probing gotchas (cost real time — read before re-probing)

- `lenis.scrollTo(y, { immediate: true })` jumps without running rAF, so **framer-motion
  never recomputes**. Every scroll-linked value reads as its base state (all paragraphs
  0.25). Use real wheel scroll, or `scrollTo(y, { duration: 0.05 })` and await frames.
- Long rAF/`setTimeout` loops inside one `javascript_tool` call time out the CDP
  `Runtime.evaluate` at 45s and can wedge the renderer. Keep sweeps under ~5 steps.
- CDP `left_click_drag` does **not** reliably drive pointer-event drag handlers — it
  produced no movement while a synthetic `pointerdown/move/up` sequence worked. Test
  drag UIs by dispatching `PointerEvent`s, not with the drag action.
- This Chrome profile has **`prefers-reduced-motion: reduce` enabled**, which disables
  Lenis and the CSS reveals. Any visual QA here shows the reduced-motion fallback, not
  the real thing.
