# Product management guide

For the boutique owner using the Sanity Studio at `/studio`.

## Adding a product

1. Open **Products → New product**.
2. Fill in the **Details** group:
   - a clear product name and an auto-generated slug;
   - a one- or two-sentence short description for cards;
   - a full description with paragraphs about cloth, fit and occasion;
   - fabric and internal reference, if useful.
3. In **Images**, add a main image and up to six detail shots. Every image needs
   alt text — describe what is visible, not “product photo”.
4. In **Shop settings**:
   - enter the price in whole naira (e.g. `285000`);
   - choose one category and optionally up to four collections;
   - add sizes such as `UK 10` or `Made to measure`;
   - add colour names with a swatch;
   - choose an availability state;
   - tick **Featured** or **New arrival** where appropriate;
   - set a display order (lower numbers come first).
5. Publish. The product appears on the site within a minute.

## Availability states

| State | What the shopper sees |
| --- | --- |
| In stock | Available to enquire and reserve. |
| Low stock | Same flow, with a “limited pieces” label. |
| Out of stock (waitlist) | The WhatsApp message asks to join the waitlist, not to buy. |
| Made to order | Clearly labelled; the message acknowledges made-to-measure production. |

## Collections and categories

- **Categories** drive the shop filters. Keep them short and distinct.
- **Collections** drive the editorial pages and homepage banner. Set
  **Featured** on the collections you want eligible for the banner.

## Site settings

The singleton document controls the boutique name, tagline, site description,
logo, WhatsApp number, email, address, hours, social links and announcement bar.
It is created by `npm run seed`; after that, edit it in place.

**Important:** the seeded contact details are placeholders
(`+234 800 000 0000`, `studio@arike.example`, a generic Lagos address and
generic social URLs). Replace all of them before launch.

## Writing for the site

- Describe fit and fabric plainly. Avoid superlatives you cannot support.
- Do not invent awards, press coverage, review counts, founding dates or
  customer statistics.
- Use naira prices without a currency symbol in the Sanity number field; the
  storefront formats them.
- Keep product descriptions honest about made-to-order timelines.

## Pre-launch checklist

- [ ] Real WhatsApp number tested on mobile.
- [ ] Real email and address.
- [ ] Real Instagram and other social URLs.
- [ ] All products have a main image, alt text, price and category.
- [ ] Placeholder “demo” product copy replaced.
- [ ] Stock states reviewed, especially made-to-order and sold-out pieces.
- [ ] Delivery and returns policy on `/customer-care` replaced with your terms.
- [ ] Contact delivery webhook connected and tested.
