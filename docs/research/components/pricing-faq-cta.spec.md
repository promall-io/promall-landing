# Pricing (billing toggle) + FAQ (tabs + accordion) + CTA

Targets:
- `components/sections/Pricing.tsx` (server) + `PricingCards.tsx` (`'use client'`)
- `components/sections/Faq.tsx` (server) + `FaqPanel.tsx` (`'use client'`)
- `components/sections/Cta.tsx` (server, static)

References: `09-pricing.png`, `10-faq.png`, `13-cta.png`
Dumps: `docs/research/dumps/{pricing,faq,cta}.json`

---

## Pricing (h ≈ 1330) — interaction model: **toggle**

`SectionHeading` + `ArrowLink` (`pricing.linkLabel`) at the end of the header row.

3 cards, `grid-cols-3`, gap 0 with a shared inner rhythm — the reference has them touching,
with the middle card **raised**: it is ~48px taller (extends above and below the others),
sits on `var(--pw-surface-raised)`, has `border-radius: 24px` and its own `z-index: 1`.
Outer cards use `var(--pw-surface-1)`, radius 24px on their outer corners only.

Card internals (`padding: 28px`):
- Header row: plan `name` in 12px uppercase-tracking `var(--pw-text-dim)` at the start; if
  `hasToggle`, the billing toggle at the end.
- Hairline below the header, margin-block 20px.
- Price: 40px `var(--pw-cream)` (`.pw-num` for `en` only — see the Numbers note about
  Persian digits and Estedad), with `period` inline after it at 16px `var(--pw-text-dim)`.
- Description: 14px `var(--pw-text-dim)`, margin-top 14px, max-width ~24ch.
- CTA `.pw-button` margin-top 22px; the featured card's CTA uses `.pw-button-primary`.
- `meta[]` rows: 14px `var(--pw-text)`, each separated by a top hairline, `padding-block: 16px`,
  starting margin-top 28px.
- `features[]` rows: same rhythm, each an icon + label at 14px. Included →
  `CheckIcon` inside a 20px filled circle (`background: rgba(255,255,255,0.14)`,
  `color: var(--pw-cream)`), label `var(--pw-cream)`. Excluded → bare `CrossIcon` at
  `var(--pw-text-faint)`, label `var(--pw-text-faint)`.

### Toggle

A 34×20 pill: track `background: var(--pw-teal)` when on, `rgba(255,255,255,0.16)` when off;
knob 16px white, `transform: translateX()` — **animate the knob with `transform`, not `left`**.
Label `pricing.yearlyLabel` / `pricing.monthlyLabel` beside it at 14px.
`<button role="switch" aria-checked>` with an accessible name.

**One shared state** for all cards (billing period lifted to `PricingCards`), so toggling
one card switches every card's price — that is what the reference does (both toggles read
"Yearly" simultaneously). Price shows `yearlyPrice` when on, `price` when off. Starter has
`hasToggle: false` and always shows `price`.

Cross-fade the price text on change (`AnimatePresence`, 0.25s) — do not animate layout.

≤810px: 1 column, middle card loses its raise (`mt-0`, same surface as the others).

---

## FAQ (h ≈ 1274) — interaction model: **category tabs + accordion**

`SectionHeading` with description.

Two columns: `grid-cols-[380px_1fr]`, gap 48px.

**Start column:**
- Category rail from `faq.categories`: each a button, `padding: 12px 20px`,
  `border-radius: 999px`, 16px text, centred. Active: `background: var(--pw-surface-2)`,
  `ring-1 ring-[var(--pw-line)]`, `color: var(--pw-cream)`. Inactive: transparent,
  `var(--pw-text-dim)`. Gap 8px, stacked.
- Pushed to the bottom (`mt-auto`), a contact card: `.pw-card`, `padding: 28px`,
  `faq.contact.title` at 22px `var(--pw-cream)`, description 14px `var(--pw-text-dim)`
  margin-top 12px, then an `ArrowLink` with `faq.contact.cta` margin-top 28px.

**End column:** the accordion for the active category, gap 12px between rows.
- Row: `background: var(--pw-surface-1)`, `border-radius: 18px`, `ring-1 ring-[var(--pw-line)]`.
- Trigger: full-width `<button aria-expanded aria-controls>`, `padding: 26px 28px`,
  question at 16px `var(--pw-cream)` at the start, a 30px circular `ChevronDownIcon` at the
  end that rotates 180° when open (`transition: transform 0.4s var(--pw-ease)`).
- Panel: `id` matching `aria-controls`, `role="region"`, answer at 14px
  `var(--pw-text-dim)`, `padding: 0 28px 26px`. Animate with framer-motion `height: auto`
  (`initial={{height:0,opacity:0}}`) — this is the one place a height animation is
  acceptable; keep the duration at 0.35s and set `overflow: hidden`.
- Only one row open at a time; switching category resets to all-closed.

≤810px: single column, rail becomes a horizontally scrolling pill row above the accordion,
contact card moves below the accordion.

---

## CTA (h ≈ 910) — static

Full-bleed section with its own backdrop, **not** inside the normal container padding rhythm.

- Background: `linear-gradient(180deg, #05070a 0%, #0d1219 45%, #2a2226 78%, #6d4f47 100%)`.
- `/landscape/dunes.png` pinned to the bottom (`position: absolute; inset-inline: 0; bottom: 0;
  width: 100%; object-fit: cover`), decorative, `aria-hidden`.
- Content grid `grid-cols-[minmax(0,420px)_1fr]`, gap 60px, `padding-top: 180px`, inside
  `pw-container`.
- **Start column:** `cta.title` in `.pw-h2` (bright, single colour); `cta.description` at
  16px `var(--pw-text)` margin-top 20px max-width ~32ch; `.pw-button .pw-button-primary`
  with `cta.primaryCta` margin-top 32px. Then, pushed down ~140px, the trust badges: for each
  of `cta.badges`, a 48px circle (`background: rgba(255,255,255,0.06)`,
  `ring-1 ring-[var(--pw-line)]`) with a small local inline glyph, plus the label at 16px
  `var(--pw-cream)`; separated by a 1px vertical rule in `var(--pw-line)`.
- **End column:** reuse the hero's mockup card. Extract it during the Hero build as
  `components/HeroMockup.tsx` and import it here — **do not duplicate the markup**. It is
  clipped by the section's bottom edge and its start corner is rounded while it bleeds off
  the end edge.
- ≤810px: single column, mockup below the copy, badges in a row.

## Content keys
`sections.pricing.*` (`t.raw('plans') as PricingPlan[]`),
`sections.faq.*` (`t.raw('categories') as FaqCategory[]`),
`sections.cta.*` (`t.raw('badges') as string[]`)
