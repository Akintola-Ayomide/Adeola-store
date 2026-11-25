# ÀRÌKÉ — Nigerian occasion-wear boutique

A production-minded storefront for a Lagos-based women's fashion boutique,
built with Next.js App Router, TypeScript, Tailwind CSS and Sanity CMS. Orders
are handled as personal WhatsApp enquiries — there is no checkout or payment
integration.

> **Demo project.** The catalogue, imagery, prices and contact details are
> sample content. Nothing here should be read as a live business, and no
> deployment is claimed.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. With no environment variables the site runs from
the local demo catalogue in `lib/demo/content.ts`, including the demo ribbon
and footer notice.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run seed` | Seed demo content into Sanity (requires a write token) |
| `npm run test:e2e` | Playwright end-to-end checks |

## Pages

- `/` — editorial home: hero, assurances, categories, new arrivals, collection
  banner, brand intro, featured edit, WhatsApp CTA and social strip.
- `/shop` — filterable and sortable catalogue with URL-based state, search,
  loading and error states.
- `/collections` and `/collections/[slug]` — editorial collections.
- `/product/[slug]` — gallery, details, size guide and WhatsApp enquiry bar.
- `/about` — brand approach and process, with no invented history.
- `/contact` — validated enquiry form plus direct contact options.
- `/customer-care` — ordering, delivery, sizing and garment care.
- `/studio` — embedded Sanity Studio, or a friendly setup screen when unconfigured.

## How ordering works

Every purchase action builds a prefilled WhatsApp message containing the
product name, price, availability, selected size and colour, and a link back to
the product. Shoppers then agree measurements, delivery and payment directly
with the studio. Out-of-stock pieces join a waitlist; made-to-order pieces are
labelled as such.

## Contact form behaviour

The form uses React Hook Form + Zod, with a honeypot, a minimum fill time and
in-memory rate limiting. The API route has two honest outcomes:

- with `CONTACT_WEBHOOK_URL` configured and accepting the POST, it returns
  `sent`;
- without it, it returns `handoff` with a WhatsApp URL and never claims an
  email was delivered.

See `docs/DEPLOYMENT.md` for webhook setup.

## Documentation

- `docs/DESIGN-AUDIT.md` — what changed from the Stitch concepts and why.
- `docs/SANITY-SETUP.md` — project, Studio, seeding and caching.
- `docs/PRODUCT-MANAGEMENT.md` — owner guide for products and settings.
- `docs/DEPLOYMENT.md` — Vercel environment and post-deploy checks.
- `docs/TROUBLESHOOTING.md` — common setup and runtime issues.
