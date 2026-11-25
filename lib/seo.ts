import type { Product, SiteSettings } from "./types";
import { availabilityLabels } from "./format";
import { getSiteUrl } from "./site";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd(settings: SiteSettings) {
  const sameAs = [
    settings.instagramUrl,
    ...settings.socialLinks.map((link) => link.url),
  ].filter((url, index, all) => Boolean(url) && all.indexOf(url) === index);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${getSiteUrl()}/#organization`,
        name: settings.boutiqueName,
        url: getSiteUrl(),
        description: settings.description,
        ...(sameAs.length ? { sameAs } : {}),
        ...(settings.contactEmail
          ? { email: settings.contactEmail }
          : {}),
        ...(settings.whatsappPhone
          ? {
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: settings.whatsappPhone,
                  contactType: "customer service",
                  areaServed: "Worldwide",
                  availableLanguage: ["English"],
                },
              ],
            }
          : {}),
        ...(settings.address
          ? {
              address: {
                "@type": "PostalAddress",
                addressLocality: settings.address,
                addressCountry: "NG",
              },
            }
          : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${getSiteUrl()}/#website`,
        url: getSiteUrl(),
        name: settings.boutiqueName,
        description: settings.description,
        publisher: { "@id": `${getSiteUrl()}/#organization` },
        inLanguage: "en-NG",
      },
    ],
  };
}

const availabilitySchema = {
  in_stock: "https://schema.org/InStock",
  low_stock: "https://schema.org/LimitedAvailability",
  out_of_stock: "https://schema.org/OutOfStock",
  made_to_order: "https://schema.org/PreOrder",
};

export function productJsonLd(product: Product, settings: SiteSettings) {
  const images = [product.image, ...product.gallery]
    .map((image) => absoluteUrl(image.src))
    .filter((url, index, all) => all.indexOf(url) === index);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${getSiteUrl()}/product/${product.slug}#product`,
    name: product.name,
    description: product.shortDescription || product.description,
    image: images,
    sku: product.reference || product.id,
    brand: {
      "@type": "Brand",
      name: settings.boutiqueName,
    },
    category: product.category?.name,
    material: product.fabric,
    color: product.colours.map((colour) => colour.name).join(", ") || undefined,
    size: product.sizes.join(", ") || undefined,
    url: absoluteUrl(`/product/${product.slug}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.price,
      availability: availabilitySchema[product.availability],
      url: absoluteUrl(`/product/${product.slug}`),
      seller: { "@type": "Organization", name: settings.boutiqueName },
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export { availabilityLabels };
