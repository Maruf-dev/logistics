# Brand spec — Arrogate Transportation (freight landing)

> Source note: the reference site (arrogatetransportation.com) is fully
> JS-rendered, so no real CSS/colors were extractable. This is an **inferred**
> industrial-freight system grounded in the company's real public profile
> (USDOT #3822610, MC #1383751, dry-van carrier, Katy TX), not copied tokens.
> Audience: B2B shippers & distributors.

## Color tokens (OKLch)

```css
:root {
  --bg:      oklch(98% 0.005 245);   /* cool near-white page */
  --surface: oklch(100% 0 0);        /* cards */
  --fg:      oklch(22% 0.025 258);   /* deep navy ink */
  --muted:   oklch(50% 0.02 258);    /* secondary text */
  --border:  oklch(90% 0.008 258);   /* hairlines */
  --accent:  oklch(70% 0.175 55);    /* amber / safety-orange — used <=2x/screen */

  --ink:     oklch(18% 0.025 260);   /* dark hero + footer canvas */
  --ink-2:   oklch(23% 0.03 260);    /* raised panel on dark */
  --ink-line: oklch(100% 0 0 / 0.08);/* hairline on dark */
}
```

## Type

- Display: `'Archivo', system-ui, sans-serif` — weights 700–900, tight tracking
- Body:    `-apple-system, 'Segoe UI', system-ui, sans-serif`
- Mono:    `ui-monospace, 'JetBrains Mono', Menlo, monospace` — DOT#/MC#/lanes/stats

## Posture (observed-genre rules)

1. Small radii (4–8px), squared industrial cards with hairline borders — no soft pill aesthetic.
2. Dark hero + dark footer bookend a light content body; amber accent appears at most twice per screen (one kicker/underline + one CTA).
3. Tabular mono numerics for all compliance + metric data; uppercase labels tracked 0.08em+.
4. Heavy display weights for headlines, tight negative tracking; one decisive hero motif (animated route line), no gradient soup.
5. Honest data only — real authority numbers; service commitments framed as commitments, never fake performance brags.
