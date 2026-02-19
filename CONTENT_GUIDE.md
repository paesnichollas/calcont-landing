# Weekly content guide

All editable copy and image references live under `content/*.ts`. Update those files and reload the page to confirm the UI still renders safely.

## Hero, CTA, footer and navbar (`content/landing.ts`)

- `heroContent` controls eyebrow, headline, description, CTA labels, hero background image, and hero carousel slides.
- `ctaContent` controls the final CTA section copy.
- `footerContent` controls brand/legal copy.
- `navbarContent.navigation` controls section anchors. IDs must match section `id` attributes.

Fallback behavior:
- Empty text fields are skipped in render.
- `heroSlides` empty array falls back to `heroImageSrc`.

## Signature band (`content/signature.ts`)

- `text`: short brand sentence in the red signature band.
- `ctaLabel`: button label.
- `ctaTarget`: `"whatsapp"` or `"portal_login"`.

Fallback behavior:
- If both `text` and `ctaLabel` are empty, the section is hidden.

## Highlights carousel (`content/highlights.ts`)

- `title` and `description` control section heading.
- `items` contains cards with `title`, `description`, `icon`, optional `emphasis`.
- `icon` must match one of the mapped Lucide names in the section component.

Fallback behavior:
- Empty `items` hides the section.

## Gallery carousel (`content/gallery.ts`)

- `title` and `description` control section heading.
- `items` contains `src`, `alt`, and `label` for each image card.

Fallback behavior:
- Empty `items` hides the section.
- Empty `label` hides overlay text.
- Empty `alt` falls back to a generic alt string.

## Services (`content/services.ts`)

- `badge`, `title`, `description` control heading text.
- `items` powers the accordion cards.
- `id` must remain unique (also used by navbar services menu selection).

Fallback behavior:
- Empty `details` uses `emptyStateLabel`.
- Empty `items` hides the section.

## Team (`content/team.ts`)

- `title`, `description`, `cityLabels`, `members`, `emptyStateLabel` control the tabbed city section.

Fallback behavior:
- Empty city member list shows `emptyStateLabel`.

## Numbers (`content/numbers.ts`)

- `title`, `description`, `items` control the stat cards.

Fallback behavior:
- Empty `items` hides the section.

## Testimonials (`content/testimonials.ts`)

- `title`, `description`, `videoLinkLabel`, `items` control testimonial carousel cards.
- Each item can have `text`, `videoUrl`, or both.

Fallback behavior:
- Empty `items` hides the section.
- Empty `videoUrl` hides the video button.

## Links (`content/links.ts`)

- `clientPortalLoginUrl`, `clientPortalSignupUrl`, `whatsappUrl` are consumed by all CTAs.

## Quick weekly verification

1. Edit one field in each touched file and reload the page.
2. Confirm navbar anchors still point to visible sections.
3. Confirm hero and gallery images render without layout jumps.
4. Confirm CTA links open correctly.
5. Confirm sections hide cleanly when arrays are emptied.
