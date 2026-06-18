# Apply form → email delivery (Web3Forms)

**Date:** 2026-06-18
**Status:** Approved
**Component(s):** `components/ApplyModal.tsx`, `lib/i18n.ts`, `app/globals.css`, env files, `README.md`

## Problem

The "Drive with us → Apply now" section renders two role-specific application
forms (Owner Operator, Company Driver) via a single `ApplyModal`. On submit the
modal only runs client-side validation and flips to a success screen — **the
submitted data is discarded and nothing is emailed.** The business needs every
submission delivered to `topcdltrucking@gmail.com`.

## Approach

Submit the form to **Web3Forms** (`https://api.web3forms.com/submit`) via a
client-side `fetch` POST (JSON / AJAX mode). Web3Forms emails the submission to
the configured address. Chosen over a Next.js API route + Resend/SMTP because:

- No backend, no server runtime required — works on any host (static or Node).
- No private secrets: the Web3Forms access key is designed to be public.
- Fastest, most robust setup for a low-traffic B2B landing page.

Trade-off accepted: dependency on a third-party service; free tier ~250
submissions/month (ample here).

## Behaviour

### Submission flow
1. User fills a form and submits.
2. Existing client-side validation runs (name / phone / email required + format).
   On failure, abort as today — no network call.
3. On pass, transition `idle → sending`: disable the submit button, show a
   "Sending…" label.
4. `fetch` POST a JSON payload to Web3Forms.
5. On `res.ok && data.success` → `success` (existing success screen).
   Otherwise (HTTP error, `success:false`, network throw, or missing access
   key) → `error`: show an inline error banner **inside the form** with the
   user's values preserved, so the submit button doubles as retry.

### State model
Replace the boolean `submitted` with
`status: 'idle' | 'sending' | 'success' | 'error'`. Reset to `'idle'` whenever a
card reopens the modal (existing fresh-form effect).

### Payload (Web3Forms)
Reserved fields: `access_key`, `subject`, `from_name`, `replyto`.
Body fields use human-readable keys (they become the email's labels) and
resolved values (e.g. CDL `a` → `Class A`; empty optionals → `"Not specified"`):

- `Application type` — `Owner Operator` / `Company Driver` (distinguishes the two forms)
- `Full name`, `Phone`, `Email`, `CDL class`, `Years of experience`
- Owner only: `Truck / trailer type`, `Own authority (MC / DOT)`
- Company only: `Endorsements`, `Available from`

`subject` = `New <Application type> application — Harb Trucking`.
`replyto` = applicant's email (so a recruiter can reply directly).

### Spam protection
A hidden honeypot field (`botcheck`) bound to state and positioned off-screen.
Web3Forms rejects submissions where it is filled. Because the existing focus
trap and initial-focus logic select all `input`s, harden them to skip
non-visible elements (`offsetParent === null`) so the honeypot never receives
focus or breaks Tab wrap-around. (Built-in Web3Forms spam filtering also applies;
hCaptcha can be enabled later in their dashboard if needed.)

## Access key handling

Read from `process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (inlined at build time;
public-safe). `.env.local` (gitignored) holds the real key; `.env.example`
(committed) documents it. If the var is absent at build, submit fails into the
`error` state (fail loud, never a fake success).

## Copy / i18n

Add to `apply.form` in `lib/i18n.ts`:
- `sending` — submit button label while in flight.
- `error` — inline error banner text (includes the direct email as a fallback).

## Styling

Add to `app/globals.css` near the modal block:
- `.modal-error` — error banner (reuses the existing red `oklch(... 25)` tokens).
- `.modal-form .btn-accent:disabled` — dimmed / not-allowed cursor while sending.
- `.hp` — visually-hidden honeypot.

## Out of scope (YAGNI)
No backend route, no Resend/SMTP, no captcha widget, no submission database or
logging, no file uploads, no test framework (project has none; verified via
`tsc`, `next lint`, `next build`).
