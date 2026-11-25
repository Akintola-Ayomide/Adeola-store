# Sanity setup

The storefront works with **no configuration** using a local demo catalogue.
Connect Sanity when you are ready to edit real products.

## 1. Create a project

1. Create a Sanity project at <https://www.sanity.io/manage>.
2. Note the **Project ID**. Keep the default `production` dataset, or create
   another one and use its name.
3. In **API → Tokens**, create:
   - a **Viewer** token for private-dataset reads (optional for public datasets);
   - an **Editor** token for seeding and automation.

## 2. Add environment variables

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19

# Server-only. Never add NEXT_PUBLIC_ to these.
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
```

Restart `npm run dev` after changing environment variables.

## 3. Open the Studio

Visit <http://localhost:3000/studio> and sign in with the Sanity account that
has access to the project. Without the two `NEXT_PUBLIC_SANITY_*` variables,
this route shows a setup screen instead of crashing.

The Studio has four first-class document types:

- **Products** — name, slug, descriptions, price, category, collections,
  fabric, sizes, colours, availability and images.
- **Categories** — the six shop filters.
- **Collections** — editorial groups with cover images.
- **Site settings** — a singleton for contact details, hours, social links and
  the announcement bar.

Drafts are never published to the storefront: every GROQ query excludes
`drafts.**` documents.

## 4. Seed the sample catalogue (optional)

With the write token in place:

```bash
npm run seed
```

The script uploads the local demo images and creates all documents with fixed
IDs, so it can be run again to overwrite seeded content. It reads the same
`lib/demo/content.ts` data the no-Sanity storefront uses.

After seeding, publish the documents in the Studio (or publish them in the
script's dataset via the API if you prefer). Replace the placeholder WhatsApp
number, email and address in **Site settings** before launch.

## 5. Caching and revalidation

Reads use `revalidate: 60` and the `sanity` cache tag. Edits in the Studio
become visible within about a minute. For an immediate refresh, set
`SANITY_REVALIDATE_SECRET` and create a Sanity webhook that POSTs to
`/api/revalidate` with header `x-revalidate-secret: <your secret>`. The route
rejects unconfigured or unauthenticated calls.

## Migrating off demo content

The data layer in `lib/data.ts` returns demo content only when Sanity is not
configured. Once `NEXT_PUBLIC_SANITY_PROJECT_ID` and
`NEXT_PUBLIC_SANITY_DATASET` are set, it reads Sanity exclusively — it does
**not** fall back to demo products if a request fails. This makes a broken CMS
visible instead of silently showing sample inventory as if it were real.
