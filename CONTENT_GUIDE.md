# Weekly content guide

All editable copy and links live under `content/*.ts`. Update those files once per week as instructed by Caio, and then reload the landing page to confirm the UI still renders without missing pieces. The sections below map each file to the UI component it drives, plus the built-in fallbacks.

## Hero, CTA & footer (landing.ts)

- **`heroContent`** – controls the eyebrow, headline, description, CTA labels, and hero illustration. Keep `heroImageSrc` pointed at a real brand photo; if the photography isn't ready, leave a placeholder image URL and update `heroImageAlt` for accessibility.
- **`ctaContent`** – feeds the final section’s title, description, and all three CTAs. CTA labels can be customized to match the week’s offer, but avoid empty strings (buttons render even when the text is blank).
- **`footerContent`** – brand/legal text beneath the page.
- **`navbarContent`** – brand name, navigation links (IDs link to section anchors), action label, and the services menu hint text. Adjust the `navigation` array if you add/rename sections; IDs must match the target section `id`.

Fallbacks: every field is optional at render time, so missing copy simply removes the `<p>`/`<h2>` node rather than breaking the layout. The CTA buttons are always rendered even if their labels are empty, so keep them populated for clarity.

## Services (services.ts)

- **`badge`, `title`, `description`** – headline text above the accordion.
- **`items`** – each entry represents an accordion card.
  * `id` – must stay unique (used by the dropdown menu + collapse state).
  * `title`/`summary` – always shown.
  * `details` – optional; falls back to `emptyStateLabel`.
  * `highlights` – array of strings rendered as list bullets; omit if there are none.

Add/remove items freely; the UI simply renders whatever is present. Removing all items hides the accordion completely (nothing breaks). Use `emptyStateLabel` for the fallback paragraph when `details` are missing.

## Team by city (team.ts)

- `title`, `description`, `emptyStateLabel` – headline copy.
- `cityLabels` – displayed on the tab triggers and inside each card header. Keep the keys aligned to the `TeamCity` union.
- `members` – each person needs `name`, `role`, and `city` (`"maceio"` or `"marechal"`). Add as many cards as necessary; the active tab filters by city.

Removing all members for a city shows the `emptyStateLabel` message. No further action needed.

## Numbers (numbers.ts)

- `title`/`description` – section headline.
- `items` – each stat needs an `id`, `label`, and `value`. The cards render whenever the array contains entries; clearing the array hides the grid entirely.

Keep values rounded or abbreviated as desired (e.g., `12 anos`, `000+`). Labels appear in uppercase.

## Testimonials (testimonials.ts)

- `title`, `description`, `videoLinkLabel` – headings.
- `items` – `author`, `role`, optional `text`, optional `videoUrl`. You can supply a video link instead of text or both; empty fields are simply skipped.

When replacing testimonials, remove an entry and refresh to ensure the grid keeps flowing (empty arrays hide the section).

## Links (links.ts)

- `clientPortalLoginUrl`, `clientPortalSignupUrl`, `whatsappUrl` – used by the CTA buttons and navbar action. Update them whenever the Onvio or WhatsApp URLs change.

## Verifying after updates (weekly checklist)

1. Update one content file (e.g., remove a service or change a testimonial) and reload the page to ensure nothing crashes and the agreed empty states appear.
2. Confirm the tabs still switch cities when team members change; missing text just hides the paragraph.
3. Delete all numbers/statistics temporarily to make sure the grid hides cleanly.
4. Change CTA labels in `landing.ts` and ensure the buttons still render.
5. Validate external links (Onvio/WhatsApp) in `content/links.ts` by clicking a CTA in the UI.

Maintaining this doc ensures Caio knows exactly which file to edit for each weekly update while the UI keeps rendering safely even when fields are omitted.
