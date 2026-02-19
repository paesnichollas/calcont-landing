# Calcont Landing Page

## Analytics (GA4)

1. Set the environment variable `NEXT_PUBLIC_GA_ID` to your Google Analytics 4 measurement ID (`G-XXXXXXX`). This can be configured locally via `.env` or injected in Vercel/CI.
2. When the ID is present, the layout injects the GA4 `<script>` tags after the page becomes interactive, so page views start flowing without blocking render.
3. Events (`click_ja_sou_cliente`, `click_ainda_nao_sou_cliente`, `click_whatsapp`) are dispatched through `lib/analytics.ts` only when GA is enabled; in development without the env var, the handlers safely no-op.

### Verification

- Run `npm run dev` with `NEXT_PUBLIC_GA_ID` set, open the page, and check the Network tab for `gtag/js?id=...` plus the `collect`/`config` payload.
- Click the main CTA buttons in the hero and CTA sections. Open the Console/Network or inspect `window.dataLayer` to see the pushed events. Absence of the env var should stop the scripts from loading and the events from firing.

## Metadata and Open Graph

1. Metadata (title, description, Open Graph, Twitter, icons) lives in `app/layout.tsx`. It shares the same headline/description copy as the hero so the page preview matches the landing message.
2. Open Graph/Twitter cards reference `/og-image.png`, giving social previews a consistent placeholder until actual photography is available.
3. Icons reference `/favicon.svg` so browsers pick up the brand mark across tabs/pinned shortcuts.

### Preview checklist

- Use the browser’s devtools (“Elements > head”) or run `curl -I https://localhost:3000` to see the new meta tags and icon links.
- Paste the live URL into Facebook’s Sharing Debugger or Twitter’s Card Validator to confirm they pull the updated title, description, and `/og-image.png`.
- Replace `/og-image.png` with new photography later; the README notes ensure maintainers overwrite the placeholder when assets arrive.
