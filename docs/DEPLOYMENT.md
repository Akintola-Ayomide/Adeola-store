# Deployment notes (Vercel)

These are setup instructions, not a record of a completed deployment. This
project has **not** been deployed as part of the build.

## 1. Prepare the repository

- Commit `package-lock.json` — do not ignore it.
- Keep `.env.local` out of git. Only `.env.example` is committed.
- Confirm no Sanity tokens or webhook secrets are present in tracked files.

## 2. Import into Vercel

1. Create a new Vercel project from the repository. The framework should be
   detected as **Next.js**.
2. Use the default build command `npm run build` and output settings.
3. Add the environment variables from `.env.example` in
   **Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_READ_TOKEN` (server-only)
   - `NEXT_PUBLIC_SITE_URL` (your production domain, no trailing slash)
   - `CONTACT_WEBHOOK_URL` and `CONTACT_WEBHOOK_SECRET` (optional)
   - `SANITY_REVALIDATE_SECRET` (optional)
4. Build. Leave Sanity variables unset if you want the demo catalogue live;
   the site will still build and run.

## 3. Domain and metadata

- Set `NEXT_PUBLIC_SITE_URL` to the real domain before going live. Canonical
  URLs, `sitemap.xml`, `robots.txt` and Open Graph links depend on it.
- Add the domain to Sanity's **CORS Origins** with credentials allowed if you
  want the embedded Studio at `/studio` to work in production.
- Add the domain to Sanity's allowed **Embeddings**/preview origins as needed.
- For instant content updates, add a Sanity webhook POSTing to
  `/api/revalidate` with `x-revalidate-secret: $SANITY_REVALIDATE_SECRET`.

## 4. Contact form reality check

Without `CONTACT_WEBHOOK_URL`, the form returns an honest **handoff** response
and offers to send the enquiry through WhatsApp. It never claims an email was
delivered. To receive enquiries:

- Point `CONTACT_WEBHOOK_URL` at an endpoint you control (a serverless function,
  automation service or CRM).
- Set `CONTACT_WEBHOOK_SECRET` so the endpoint can verify the bearer token.
- Confirm the endpoint accepts a JSON POST with `fullName`, `email`, `phone`,
  `subject`, `message`, `source` and `submittedAt`.
- Test a real submission after deploying. A successful build does not mean the
  webhook is configured correctly.

## 5. Post-deploy checks

- `/` loads with real imagery and no console errors.
- `/shop`, `/collections`, `/product/<slug>`, `/about`, `/contact` and
  `/customer-care` all render.
- `/sitemap.xml` lists real product URLs with the production domain.
- `/robots.txt` disallows `/studio` and `/api/`.
- The Open Graph image route returns an image and previews correctly.
- WhatsApp links open a chat with the correct prefilled message.
- The contact form shows the correct state for your environment (sent only if
  the webhook is connected).
- Lighthouse/accessibility checks at 390 px and 1280 px show no horizontal
  overflow or contrast regressions.
