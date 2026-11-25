const productFields = `{
  "id": _id,
  name,
  "slug": slug.current,
  image,
  gallery,
  shortDescription,
  description,
  price,
  category->{ "id": _id, name, "slug": slug.current },
  collections[]->{ "id": _id, name, "slug": slug.current },
  sizes,
  colours[]{ name, "hex": value.hex },
  fabric,
  availability,
  featured,
  newArrival,
  sortOrder,
  reference
}`;

export const allProductsQuery = `
  *[
    _type == "product" &&
    defined(slug.current) &&
    !(_id in path("drafts.**"))
  ] | order(coalesce(sortOrder, 999) asc, name asc) ${productFields}
`;

export const productBySlugQuery = `
  *[
    _type == "product" &&
    slug.current == $slug &&
    !(_id in path("drafts.**"))
  ][0] ${productFields}
`;

export const allCategoriesQuery = `
  *[_type == "category" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(coalesce(order, 999) asc, name asc) {
      "id": _id,
      name,
      "slug": slug.current,
      description,
      image,
      "order": coalesce(order, 999)
    }
`;

export const allCollectionsQuery = `
  *[_type == "collection" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(coalesce(order, 999) asc, name asc) {
      "id": _id,
      name,
      "slug": slug.current,
      description,
      coverImage,
      "featured": coalesce(featured, false),
      "order": coalesce(order, 999)
    }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    boutiqueName,
    tagline,
    logo,
    whatsappPhone,
    contactEmail,
    instagramUrl,
    instagramHandle,
    socialLinks[]{ label, url },
    address,
    businessHours[]{ days, hours },
    announcementBar,
    description
  }
`;
