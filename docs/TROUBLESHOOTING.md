# Troubleshooting

## The site shows demo products after connecting Sanity

Check that both `NEXT_PUBLIC_SANITY_PROJECT_ID` and
`NEXT_PUBLIC_SANITY_DATASET` are set, then restart the dev server. These
variables are read at module load. The data layer switches completely to Sanity
once they are present; it does not merge demo and CMS content.

## Sanity requests fail or show “could not load the boutique catalogue”

- Confirm the project ID and dataset.
- If the dataset is private, set `SANITY_API_READ_TOKEN` with a viewer token.
- Check the network tab for a GROQ error and paste it into the Studio's
  Vision tool to debug.
- Confirm the schema documents are **published**, not drafts. All queries
  exclude `drafts.**`.
- Check that products have a slug, a name and a main image — incomplete products
  are skipped by the normalizer.

## Images do not appear

- For local demo images, confirm files exist under `public/images/`.
- For Sanity images, confirm the `image` field has an uploaded asset. The
  storefront skips products without a main image.
- Regenerate the demo seed if you renamed files: `npm run seed`.

## The Studio at `/studio` shows a setup screen

That is expected until Sanity is configured. Add the two `NEXT_PUBLIC_SANITY_*`
variables and restart. If they are set and you still see the screen, make sure
they are not only in a server-only Secret on Vercel — `NEXT_PUBLIC_` variables
must be available at build time.

## Contact form says “One last step”

This is intentional. With no `CONTACT_WEBHOOK_URL`, nothing is emailed, so the
site offers a WhatsApp handoff instead of claiming delivery. Configure the
webhook if you want `sent` status. The form also uses a honeypot and a 2.5-second
minimum fill time, so very fast automated submissions are rejected.

## The contact form reports “could not verify this enquiry”

Refresh the page and fill the form again. Browsers or extensions that restore
form state instantly can trip the timing check.

## Build fails on Google fonts

`next/font/google` downloads Fraunces and Manrope at build time. Ensure the
build environment can reach Google Fonts, or vendor local font files and swap
the imports in `app/layout.tsx`.

## `npm install` fails with `Invalid Version` or `ECONNRESET`

Delete `node_modules` and `package-lock.json`, then retry:

```bash
npm install --prefer-offline --no-audit --no-fund
```

A corporate proxy or an interrupted download is the usual cause. Avoid running
two installs at once.

## Playwright tests cannot find a browser

Install the browser binaries:

```bash
npx playwright install chromium
```

On a restricted machine, run only checks that do not need a browser, or use the
system Chrome channel in `playwright.config.ts`.

## Visual issues at a specific width

The supported widths are 390, 768, 1280 and 1440 px. Most overflow problems come
from long product names or filter rows. Check `container-editorial` usage and
keep tables inside `overflow-x-auto` wrappers (the size guide already does).
