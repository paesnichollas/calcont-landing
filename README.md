# Calcont Landing Page

## Analytics (GA4)

1. Set the environment variable `NEXT_PUBLIC_GA_ID` to your Google Analytics 4 measurement ID (`G-XXXXXXX`). This can be configured locally via `.env` or injected in Vercel/CI.
2. When the ID is present, the layout injects the GA4 `<script>` tags after the page becomes interactive, so page views start flowing without blocking render.
3. Events (`click_ja_sou_cliente`, `click_ainda_nao_sou_cliente`, `click_whatsapp`) are dispatched through `lib/analytics.ts` only when GA is enabled; in development without the env var, the handlers safely no-op.

### Verification

- Run `npm run dev` with `NEXT_PUBLIC_GA_ID` set, open the page, and check the Network tab for `gtag/js?id=...` plus the `collect`/`config` payload.
- Click the main CTA buttons in the hero and CTA sections. Open the Console/Network or inspect `window.dataLayer` to see the pushed events. Absence of the env var should stop the scripts from loading and the events from firing.
