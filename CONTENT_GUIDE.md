# Weekly content guide

All editable copy and image references live under `content/*.ts`. Update those files and reload the page to confirm the UI still renders safely.

## SEO config (`content/seo.ts`)

- `siteName`, `siteUrl`, `titleDefault`, `titleTemplate`, and `descriptionDefault` feed global metadata.
- `keywords` controls SEO keywords in `app/layout.tsx`.
- `canonicalPath` controls canonical URL.
- `ogImagePath` controls the default social image (current: `/og/og-default.png`).
- `twitterHandle` is optional. Leave empty to skip handle metadata.

## Copy base (`content/copy.ts`)

- `nav` centralizes navbar labels, theme menu labels, and navigation item labels by id.
- `hero` feeds headline/subheadline/CTA labels used by hero section.
- `closingCta` feeds the final CTA card labels and text.
- `sections.services`, `sections.team`, `sections.testimonials`, and `sections.numbers` centralize section heading copy and key labels.
- `common.backToTopAriaLabel` centralizes accessibility copy for utility controls.
- `differentials`, `services`, `howItWorks`, and `faq` keep strategic copy in one place for future sections.

## Hero, CTA, footer and navbar navigation (`content/landing.ts`)

- `heroContent` controls eyebrow, headline, description, CTA labels, hero background image, and hero carousel slides.
- `ctaContent` controls the final CTA section copy.
- `footerContent` controls brand/legal copy.
- `navbarContent.brand` controls the navbar brand label fallback.
- `navbarContent.navigation` controls section anchors. IDs must match section `id` attributes.
- `navbarContent.themeMenuLabel`, `themeOptionLight`, `themeOptionDark`, and `themeOptionSystem` control the theme switcher labels.

Fallback behavior:
- Empty text fields are skipped in render.
- `heroSlides` empty array falls back to `heroImageSrc`.
- Hero and final CTA labels/text also fallback to `content/landing.ts` when `content/copy.ts` fields are empty.

## Branding (`content/branding.ts`)

- `brandName` controls the primary navbar brand label.
- `logoSrc` controls the navbar logo source with deterministic options only: `"/brand/calcont-logo.png"` or `"/favicon.svg"`.
- `logoAlt` controls the logo alt text.

Fallback behavior:
- Keep `logoSrc` as `"/favicon.svg"` until `public/brand/calcont-logo.png` exists in the repository.

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

- `title`, `description`, `cityLabels`, `cityHighlights` control section heading and city selectors.
- `membersByCity` controls the team card carousel per city.
- Each member supports `name`, `role`, `description`, `imageSrc`, `imageAlt`, and `clientBenefits`.
- `emptyStateLabelNoCity` appears before selecting a city.
- `emptyStateLabelCityWithoutMembers` appears when a selected city has no members.
- `fallbackDescription`, `fallbackImageSrc`, `fallbackBenefits`, and `benefitsTitle` control card fallbacks and benefit block.

Fallback behavior:
- No selected city shows `emptyStateLabelNoCity`.
- Empty city member list shows `emptyStateLabelCityWithoutMembers`.
- Empty member fields use fallback values from the same file.

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
6. Confirm `/robots.txt` and `/sitemap.xml` respond as expected.
