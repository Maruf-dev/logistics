# Arrogate Transportation — Landing

Production landing page for **Arrogate Transportation**, a licensed B2B dry-van
freight carrier (Katy, TX · USDOT #3822610 · MC #1383751). Built from the design
export in this repo (`arrogate-freight-landing.html` + `brand-spec.md`).

**Stack:** Next.js (App Router) · React 19 · TypeScript · pure CSS design tokens.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (statically prerendered)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Languages

English is the **primary** language; Russian is secondary via an **EN / RU toggle**
in the header (and mobile drawer). The choice persists to `localStorage` and the
`<html lang>` attribute updates with it.

- All copy lives in one place: [`lib/i18n.ts`](lib/i18n.ts) (`en` is the source of
  truth, `ru` mirrors its shape — TypeScript enforces that they stay in sync).
- The default render (SSR) is English, so the static HTML and SEO metadata are
  English with no hydration flash.
- Note: Archivo (the display font) ships Latin-only in `next/font`, so Russian
  **headings** fall back to `system-ui` via the `--font-display` chain in
  `app/globals.css`. Body/mono text (JetBrains Mono includes Cyrillic) renders fine.

## Structure

```
app/
  layout.tsx        Fonts (next/font), SEO metadata, <LanguageProvider>
  page.tsx          Composes the section components
  globals.css       Design tokens + all component styles (ported from the export)
components/
  LanguageProvider  EN/RU context, localStorage persistence, <html lang> sync
  LangToggle        EN / RU segmented control
  SiteHeader        Fixed header, scroll state, mobile drawer
  Hero  Stats  Services  Coverage  Process  Equipment  Why  QuoteForm  Footer
  Brand             Logo + wordmark
  ScrollReveal      Single IntersectionObserver driving all `.reveal` elements
lib/
  i18n.ts           EN + RU dictionary
```

## Design fidelity

Tokens, typography, spacing, radii, shadows, motion timing, and SVG visuals are
ported verbatim from the export per `DESIGN-HANDOFF.md`. The original vanilla-JS
interactions are reimplemented as React:

- Scroll-aware header → `useEffect` scroll listener
- Reveal-on-scroll → `IntersectionObserver` (`ScrollReveal`)
- Animated stat counters → `requestAnimationFrame` count-up, fires on view
- Quote form validation + success state → controlled inputs in `QuoteForm`
- Smooth anchor scrolling → CSS `scroll-behavior` + `scroll-padding-top`
- `prefers-reduced-motion` is respected throughout.

The source design files (`*.html`, `brand-spec.md`, `DESIGN-*.{md,json}`) are kept
as the reference contract; they are not part of the Next.js build.
