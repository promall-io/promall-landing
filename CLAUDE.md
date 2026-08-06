# CLAUDE.md — promall-landing (Next.js 15 + React 19, Vercel)

Public marketing site — own git repo (`promall-landing.git`), **not** the dashboard (that's `promall-ui`). App Router, next-intl (fa+en, RTL), Tailwind v4, framer-motion + lenis. No DB — server work lives in two `app/api` route handlers that proxy to `promall-api`.

- DON'T comment — self-documenting via clear naming. Generated code ships to prod: type-safe, lint-clean.
- No fixed-port mandate: `npm run dev` (Next default `:3000`); this codebase is usually run on `-p 4531`.
- **Follow the Claude Design System** — see the root `CLAUDE.md` § "Design System". This site's components are specced at `components/promall-landing/<Component>/<Component>.prompt.md` in the ProMall Design System project (`8b79dc67-0489-4900-a023-24791761f6b1`, via `DesignSync`). Configure DS components through `variant`/`size` props; never re-style them at the call site. Glass/gradient treatments are landing-only — they must never leak into `promall-ui`.

## Commands & Quality

- `npm run dev` | `build` | `start` | `lint` | `lint:fix`. No test script.
- **`.npmrc` has `legacy-peer-deps=true` — REQUIRED** (React 19 peer ranges); `npm install` fails without it.
- **Build gates on lint + types**: `next.config.mjs` sets `eslint.ignoreDuringBuilds:false` and `typescript.ignoreBuildErrors:false` — a lint warning or TS error **fails `next build`** and the Vercel deploy.

## Deploy

Vercel, **auto-deploys on push to `main`**. No `vercel.json`. Security headers in `next.config.mjs`; images restricted to avif/webp with one remote host (`trustseal.enamad.ir`).

## Backend wiring (do not break)

Every conversion path ends at `promall-api`. Both route handlers read `PROMALL_API_URL` (default `https://api.promall.io`) via `lib/api-config.ts` — never `process.env` inline.

- `app/api/demo-request` → `POST {API}/demo-requests` (public, throttled 5/60s). Normalizes with `lib/demo-form.ts` (Persian/Arabic digits, `+98`/`0098` prefixes, `@handle` and full IG URLs) and returns 422 without calling upstream when either field is invalid. `source` is `landing` / `landing-en`.
- `app/api/track` → `POST {API}/web-analytics/events`, fired by `components/PageviewTracker.tsx` (production only, `sendBeacon` with a `fetch` fallback). Forwards client IP/UA/country headers only when `WEB_ANALYTICS_PROXY_SECRET` is set. Always answers 204 — analytics must never surface an error to a visitor.
- All primary CTAs (nav, hero, pricing plans, closing CTA, footer) point at `/demo` via `localeHref(locale, DEMO_PATH)` from `lib/routes.ts`. **Use that helper for any `/`-prefixed link** — `localePrefix: 'as-needed'` means a bare `/demo` sends `en` visitors to the fa page.

## i18n & Routing

- `i18n/config.ts` — `locales = ['en','fa']`, `defaultLocale = 'fa'`, fa = RTL. **Only `fa` is in `indexedLocales`.**
- `middleware.ts` — next-intl, `localePrefix: 'as-needed'`, `localeDetection: false`; matcher excludes `api`, `_next`, `_vercel`, files. Wrapped by a **geo gate**: an unprefixed path whose detected locale isn't `fa` gets a `307` to `/en…` (`Cache-Control: no-store` — a cached redirect would trap users who switch back to fa).
- **Locale detection** (`lib/geo-locale.ts`) is **promotion-only**, mirroring `promall-ui/src/i18n/detect.ts`. Every signal answers "is this visitor Persian-speaking?", and a *no* from one signal is never a *yes* for English — a VPN moves the exit IP but not the OS clock or the browser's language list, and most Iranian traffic arrives over one. Order: crawler UA → always `fa` · `NEXT_LOCALE` + `NEXT_LOCALE_SOURCE=chosen` → wins outright · **any** Persian signal (`accept-language` naming `fa`, `x-timezone` in Iran, geo country `IR`) → `fa` · `accept-language` naming languages but not `fa` → `en` · otherwise `fa`. **Geo may only promote to `fa`; it can never produce `en` by itself.** **Every crawler sees the fa site at `/`** so the indexed surface stays fa-only.
  - A `detected` locale is a first-visit guess that a later Persian signal may still correct; `chosen` (only ever written by the switcher on `app.promall.io`) is never overridden. A `NEXT_LOCALE` with no source cookie is treated as `detected`, which auto-repairs visitors stranded on `en` by the old geo-first order.
  - `middleware.ts` persists the resolved locale to `NEXT_LOCALE` + `NEXT_LOCALE_SOURCE` on the first visit, on both the redirect and the pass-through path, so later requests skip detection. Crawlers are never written to.
  - Only `sec-fetch-dest` distinguishes a real navigation from a prefetch — Next strips both the `RSC` header and the `_rsc` query param before middleware, so neither can be used as a guard. A missing header counts as a navigation (pre-16.4 Safari).
  - **There is no locale switcher** — language is decided by detection, plus whatever the visitor chose on `app.promall.io`. Do not reintroduce a visible fa/en toggle. This site only ever writes `detected`; only `promall-ui` writes `chosen`.
  - **The locale cookie is platform-wide** (`lib/locale-cookie.ts`, mirrored from `promall-ui/src/i18n/cookie.ts` — keep them in lock-step): both cookies are scoped to `Domain=.promall.io` so this site, the dashboard and shop subdomains share one decision. Off-platform hosts (localhost, Vercel previews) fall back to host-only, because a Domain the browser can't match is dropped. Writes go through `localeCookieHeaders()` and `response.headers.append`, never `response.cookies.set` — a domain cookie does not replace a host-only one of the same name, so each write also emits a `Max-Age=0` line to evict the legacy host-only pair, and `ResponseCookies` keys its map by name alone.
  - **`GEO_LOCALE_REDIRECT_ENABLED` is `true`** — an unprefixed path whose detected locale is `en` gets the 307. The promotion-only order above is what makes that safe: no Persian signal can be outvoted by a VPN's exit country.

## English site: fa-only surfaces

The `en` locale must contain **zero Persian characters**, so anything Persian-only is fa-gated. Verify with `rg -o '\p{Arabic}'` over the rendered `/en` HTML — the expected count is 0.

- **Hero dashboard replica** (`components/app-replica.tsx`) is a live React mockup, not an image. All its strings live in `components/app-replica-copy.ts` as `REPLICA_COPY: Record<Locale, ReplicaCopy>`; the component holds only presentation (icon names, colour tokens, bar/rank percentages) so those are declared once. It takes a `locale` prop and applies `pmapp--rtl` / `pmapp--ltr`. **The CSS mirrors via logical properties only** (`inset-inline-*`, `padding-inline`, `text-align: start|end`) — never add physical `left`/`right`; directional icons get `pa-icon--mirror` and are flipped in LTR.
- **`Features` and `About` render for `fa` only** (`app/[locale]/page.tsx`) — both sections are built entirely around the Persian dashboard screenshots in `public/mockups/`, which are untranslatable. `en.json` therefore has no `sections.about`, and its `sections.features.tabs` keep `label`/`caption` (still read by `StructuredData`) with no `image`/`alt`. The `#features` and `#about` nav/footer links are removed from `en.json` too.
- **`public/mockups/*.jpg` must never be referenced from `en`** — they are Persian panel screenshots. English blog covers use the text-free `public/blog/post-*.jpg` illustrations instead.
- **e-Namad seal is fa-only** (`components/Footer.tsx`) — the remote badge from `trustseal.enamad.ir` is a Persian-language image.
- **`/case-study` is fa-only** — hardcoded Persian, `notFound()` for any other locale.
- `StructuredData` emits the Persian `alternateName` for `fa` only.
- **`app/[locale]/layout.tsx` passes `messages={{}}` to `NextIntlClientProvider`** — client components CANNOT call `useTranslations()`. Resolve strings in the server component and pass them down as props (see `Features` → `FeaturesTabs`, `InstagramDemo` → `InstagramThread`).
- Pages: `/`, `/blog`, `/blog/[slug]`, `/demo`, `/privacy`, `/terms`, `/case-study`. Only `/`, `/blog` and the articles are indexable; the sitemap lists exactly those, for `fa` only.
- **Blog content lives in `content/blog.{fa,en}.ts`** as typed `Article[]` (`types/blog.ts`), read through `lib/blog.ts` — not in `messages/*.json`. Adding an article to `content/blog.fa.ts` automatically adds it to the sitemap, the `/blog` index, the homepage Blog section and the JSON-LD `ItemList`. Both locales must expose the same slugs.
- SEO helpers live in `lib/site.ts` (`absoluteUrl`, `languageAlternates` — hreflang covers `indexedLocales` only) and `components/StructuredData.tsx` / `components/blog/BlogStructuredData.tsx`.

## Styling

- **Colour = `docs/color-system.md`, no exceptions.** `white`/`black` count as Tailwind stock colours and never re-theme — the one sanctioned use is `components/sections/InstagramThread.tsx`, which replicates Instagram's own fixed-dark app chrome (white bubbles text, black notch); that is third-party product UI, not ProMall chrome, so it must NOT be re-tokenised. The two blocks at the top of `app/globals.css` are the ONLY place this repo authors a colour value; `components/app-replica.css`, the case study and every `.ts`/`.tsx` file reference them through `var()`. Keep both in lock-step with `promall-ui/src/app/globals.css`.
- Tailwind **v4** (`@import "tailwindcss"`), no `tailwind.config.js`. Tokens are grouped by the spec's families (ramp / surface / text / semantic / status / border+focus / glass), with `--pw-*` as the landing-facing aliases and a clearly-labelled landing-only section for values with no promall-ui counterpart.

### Two themes

`:root, [data-theme='dark']` carries promall-ui's **dark** values and is what ships by default; `[data-theme='light']` re-authors **only the tokens whose role flips**. `prefers-color-scheme` is deliberately ignored — light is opt-in through the nav toggle alone.

- `lib/theme.ts` owns the storage key, the `data-theme` attribute name, the `PAGE_BACKGROUND` mirror the OS shell needs (`<meta name="theme-color">` + the manifest can't read a CSS variable), and `THEME_BOOTSTRAP_SCRIPT`, which the layout inlines in `<head>` so a returning light visitor never sees a dark frame. `components/ThemeToggle.tsx` is the only writer.
- **Never author a `dark:`-style second ruleset.** If a component needs one, the token is wrong — that is rule 3, and it holds here too. The handful of genuinely per-theme rules that remain are all in `globals.css` and all structural, not colour: hiding the star field, swapping which retint variant is displayed.
- **Channel tokens split by intent.** `--white-rgb`/`--shade-rgb` are fixed literals and carry only mask stops (`mask-image` reads alpha, so the hue is inert), true shadow tints, and the star field. Anything that must read as *elevation* uses `--pw-veil-rgb` and anything that must read as *the page* uses `--pw-canvas-rgb`; both invert with the theme.
- **Tokens that stay put in both themes:** the ink/slate/gold ramp, `--showcase-*` (those panels are ink at night and by day, so they get their own `--showcase-line/-veil` instead of the page's border tokens), `--partner-mark-*` (the e-Namad seal is a fixed dark asset and needs a light tile always), and the `--ig-*`/`--mac-*` facsimiles.
- **Gold has two jobs in light.** `--pw-gold` is the accent that must be SEEN, so it drops to `--gold-ink` bronze on paper (champagne is 1.4:1 there — rule 11); `--pw-gold-fill` stays champagne in both and always pairs with `--text-on-gold`. The primary CTA follows rule 10's asymmetry via `--pw-cta-*`: gold in dark, ink in light. The mark's stem is `--pw-mark-stem`, which becomes `currentColor` in light to match the brand's monochrome light lockup.
- **`/case-study` is pinned to `data-theme="dark"`** — it documents the ink brand and names its own hexes.
- **Retinted rasters ship twice.** `scripts/retint-assets.mjs` reads BOTH token blocks and writes a `-light` sibling for every landscape and blog asset from the pristine copy in `public/_source`; the light ramp inverts polarity (hills are masses against a pale sky, not silhouettes catching light), so each asset carries its own `light:` tone curve. `components/ThemedImage.tsx` renders both and CSS picks one — the hidden copy is `loading="lazy"` inside a `display:none` box, so the browser never fetches it. Re-run the script after touching either block, and check the `docs/qa/retint-*-{dark,light}.png` sheets.
- **Never author a `color-mix()` whose first operand is a `var()`** — Lightning CSS cannot fold it and emits the bare operand as the legacy fallback, i.e. a fully opaque colour where you wanted 5%. Write the complete `rgba()` instead. There are now **zero** in the repo; the two places that had them got real tokens instead — family E gained a `--{status}-border` member (plus `--brand-soft`/`--brand-border`) for the hairline that closes a soft pill, and each star tone carries `--pw-star-halo`/`-wide` alongside its tint so nothing is re-mixed at runtime.
- `pw-*` utility classes MUST live in `@layer components` or Tailwind's cascade wins over them.

### Responsive contract

- **One fluid rhythm, no section-level breakpoints.** `--pw-section-top` is a `clamp()` drawn through 96px at 390px and the authored 180px at 1080px, so a phone is not paying desktop's whitespace ten times over. Sections use `.pw-section-top`; don't re-add a per-section mobile override.
- **`--pw-control` is the drawn height of a pill control, `--pw-touch` (44px) the hittable one.** They are equal on touch and part company under `@media (pointer: fine)`, where the authored 40px pill is exact enough. A control that must stay visually smaller than 44px even on a phone (the header circles, the pricing switch) keeps its size and adds **`.pw-touch-target`** — an invisible centred `::after` overlay, inert on a fine pointer. It needs `position: relative` on the host, and it only ever *adds* hit area. Inline links in a sentence are exempt (WCAG 2.5.8); a link that is its own row is not — give it `min-h-[var(--pw-touch)]` and pay the height back with a negative margin so layout doesn't move.
- **`.pw-section` gutters are `max(--pw-gutter, env(safe-area-inset-*))`** — the notch only bites in landscape, and env() is 0 everywhere else.
- **Horizontal strips bleed, they don't clip.** The features tablist, the FAQ category chips and the integrations diagram run `-mx-[var(--pw-gutter)]` under their breakpoint so a scrollable strip reaches the screen edge and reads as scrollable. Strips also carry `snap-x` + `scroll-px-[var(--pw-gutter)]`, and any control that changes the selection must `scrollIntoView` the new one.
- **The starfield halves itself below 811px** (`.pw-star:nth-child(2n)` + all comets, `display: none`). Same percentage positions in a third of the width is triple the density, and each tuned star is a blurred box-shadow on its own twinkle cycle. Thin by `nth-child`, never by rendering a shorter list — the markup has to stay identical in both so there is no hydration seam.
- **`html[data-scroll-locked]`** is the nav drawer's scroll lock; `NavShell` measures the vanished scrollbar into `--pw-scrollbar-gutter` so the page doesn't jump. The drawer is a `role="dialog" aria-modal` with a Tab trap and focus return — scroll on the outer box, centring on an inner `min-h-full` child, because doing both on one element clips the top of an overflowing flex column.
- Flat, token-driven surfaces — no gradient/glossy "AI-template" look. **Sanctioned exception:** the `--ig-*` tokens (Instagram gradient bubble + story ring) are real Instagram values and are scoped to the DM mockup only.
- Scroll reveals are CSS-driven (`.pw-reveal` + `IntersectionObserver` in `components/Reveal.tsx`), not framer-motion.

## Copy

- **Persian brand is always «پرومال»** — never Latin "ProMall" in fa copy (domains/emails stay Latin).
- **fa copy is intentionally colloquial** — spoken/street tone. Do NOT formalize it. Exception: `privacy` and `terms` stay formal.
