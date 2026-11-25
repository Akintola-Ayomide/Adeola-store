# Design audit — from Stitch concept to production storefront

The supplied Stitch screens established a useful starting point: a warm,
editorial take on Nigerian occasion wear. They were not production ready. This
document records what was changed and why, so future edits do not reintroduce
the same problems.

## What was weak in the source concepts

| Area | Issue in the concept | Decision here |
| --- | --- | --- |
| Typography | A generic display serif paired with a geometric sans, used at similar weights everywhere. | Fraunces for display, Manrope for UI, with a clear type scale and generous line height. |
| Colour | Low-contrast neutrals, thin gold accents and soft gradients that reduced legibility. | Bone/ink foundation with clay and forest as deliberate accents. No decorative gradients. |
| Components | Pill buttons, heavily rounded cards and repeated drop shadows read as a template, not a boutique. | Square edges, hairline rules, large photographic fields and restrained hover states. |
| Imagery | Mixed aspect ratios and a few mock-up screenshots used as if they were editorial photos. | Consistent 4:5 product crops, curated 16:10/2:1 editorial crops. UI screenshots were removed. |
| Content | Invented awards, review counts, “years of experience” and customer statistics. | No fabricated history. The About page describes approach and process only. |
| Commerce | Checkout-style language and buttons despite no payment integration. | Every purchase action is an explicit WhatsApp **enquiry** with prefilled details. Out of stock becomes a waitlist. |
| Forms | Success message implied delivery without a backend. | The API only reports `sent` when a webhook actually accepts the enquiry; otherwise it returns a WhatsApp handoff. |
| Navigation | Several footer links pointed nowhere. | Added a real `/customer-care` page and honest 404/error states. |
| Accessibility | Tiny uppercase labels, low contrast, missing alt text and invisible focus styles. | AA-minded contrast, visible focus rings, skip link, alt text on all imagery, semantic landmarks and reduced-motion support. |
| Responsive | Desktop-first layouts that collapsed poorly on small screens. | Tested at 390, 768, 1280 and 1440 px. Sticky mobile order bar, scrollable filter rows and size guide. |
| Performance | Large uncropped images and blocking fonts. | `next/image` with explicit sizes, `display: swap` fonts and route-level caching. |

## What was kept

- The brand name **ÀRÌKÉ** and its Nigerian positioning.
- A warm, editorial, photography-led feel.
- The idea of grouping products by occasion and by textile tradition.
- A short path from product to a personal conversation.

## What was deliberately not copied

- Fake testimonials, press logos, awards, review stars or “10,000+ happy
  customers” counters.
- Payment or delivery promises the site cannot keep.
- Decorative UI that looks premium but hides the actual next step.

The whole catalogue is demo content. Replace names, prices, imagery and contact
details through Sanity before treating the site as a live store.
