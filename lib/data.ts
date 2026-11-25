import type {
  Availability,
  Category,
  Collection,
  Product,
  ProductFilters,
  SiteSettings,
} from "./types";
import {
  demoCategories,
  demoCollections,
  demoProducts,
  demoSiteSettings,
} from "./demo/content";
import { isSanityConfigured } from "./sanity/env";
import { sanityFetch } from "./sanity/client";
import {
  allCategoriesQuery,
  allCollectionsQuery,
  allProductsQuery,
  productBySlugQuery,
  siteSettingsQuery,
} from "./sanity/queries";
import { sanityImage } from "./sanity/image";
import { SITE_DESCRIPTION } from "./site";

type SanityImageDoc = {
  asset?: { _ref?: string } | null;
  alt?: string | null;
  hotspot?: unknown;
  crop?: unknown;
};

type SanityProductDoc = {
  id: string;
  name?: string;
  slug?: string;
  image?: SanityImageDoc | null;
  gallery?: SanityImageDoc[] | null;
  shortDescription?: string;
  description?: string;
  price?: number;
  category?: { id: string; name: string; slug: string } | null;
  collections?: { id: string; name: string; slug: string }[] | null;
  sizes?: string[] | null;
  colours?: { name?: string; hex?: string }[] | null;
  fabric?: string;
  availability?: Availability;
  featured?: boolean;
  newArrival?: boolean;
  sortOrder?: number;
  reference?: string;
};

type SanityCategoryDoc = {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  image?: SanityImageDoc | null;
  order?: number;
};

type SanityCollectionDoc = {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  coverImage?: SanityImageDoc | null;
  featured?: boolean;
  order?: number;
};

type SanitySettingsDoc = {
  boutiqueName?: string;
  tagline?: string;
  logo?: SanityImageDoc | null;
  whatsappPhone?: string;
  contactEmail?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  socialLinks?: { label?: string; url?: string }[] | null;
  address?: string;
  businessHours?: { days?: string; hours?: string }[] | null;
  announcementBar?: string;
  description?: string;
};

const VALID_AVAILABILITY: Availability[] = [
  "in_stock",
  "low_stock",
  "out_of_stock",
  "made_to_order",
];

function normaliseAvailability(value?: string): Availability {
  return VALID_AVAILABILITY.includes(value as Availability)
    ? (value as Availability)
    : "in_stock";
}

function normaliseProduct(doc: SanityProductDoc): Product | null {
  if (!doc?.slug || !doc.name) return null;

  const image = sanityImage(doc.image, doc.name, 1400);
  if (!image) {
    console.warn(`Product "${doc.name}" has no main image and was skipped.`);
    return null;
  }

  const gallery = (doc.gallery ?? [])
    .map((item, index) =>
      sanityImage(item, `${doc.name} — view ${index + 2}`, 1600),
    )
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    image,
    gallery: [image, ...gallery],
    shortDescription: doc.shortDescription ?? "",
    description: doc.description ?? "",
    price: typeof doc.price === "number" ? doc.price : 0,
    category: doc.category ?? null,
    collections: (doc.collections ?? []).filter(
      (collection) => collection?.name && collection?.slug,
    ),
    sizes: (doc.sizes ?? []).filter(Boolean),
    colours: (doc.colours ?? [])
      .filter((colour) => Boolean(colour?.name))
      .map((colour) => ({
        name: colour.name as string,
        hex: colour.hex || "#8A8175",
      })),
    fabric: doc.fabric,
    availability: normaliseAvailability(doc.availability),
    featured: Boolean(doc.featured),
    newArrival: Boolean(doc.newArrival),
    sortOrder: doc.sortOrder ?? 999,
    reference: doc.reference,
  };
}

function normaliseCategory(doc: SanityCategoryDoc): Category | null {
  if (!doc?.slug || !doc.name) return null;

  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    image: sanityImage(doc.image, doc.name, 1200) ?? undefined,
    order: doc.order ?? 999,
  };
}

function normaliseCollection(doc: SanityCollectionDoc): Collection | null {
  if (!doc?.slug || !doc.name) return null;

  return {
    id: doc.id,
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    coverImage: sanityImage(doc.coverImage, doc.name, 1800) ?? undefined,
    featured: Boolean(doc.featured),
    order: doc.order ?? 999,
  };
}

function normaliseSettings(doc: SanitySettingsDoc | null): SiteSettings {
  if (!doc) {
    return {
      boutiqueName: "ÀRÌKÉ",
      tagline: "Nigerian occasion wear, made in Lagos.",
      whatsappPhone: "",
      contactEmail: "",
      instagramUrl: "",
      instagramHandle: "",
      socialLinks: [],
      address: "",
      businessHours: [],
      announcementBar: "",
      description: SITE_DESCRIPTION,
      demoContent: false,
    };
  }

  return {
    boutiqueName: doc.boutiqueName?.trim() || "ÀRÌKÉ",
    tagline:
      doc.tagline?.trim() || "Nigerian occasion wear, made in Lagos.",
    logo: sanityImage(doc.logo, doc.boutiqueName ?? "ÀRÌKÉ", 400) ?? undefined,
    whatsappPhone: doc.whatsappPhone?.trim() || "",
    contactEmail: doc.contactEmail?.trim() || "",
    instagramUrl: doc.instagramUrl?.trim() || "",
    instagramHandle: doc.instagramHandle?.trim() || "",
    socialLinks: (doc.socialLinks ?? [])
      .filter(
        (link): link is { label: string; url: string } =>
          Boolean(link?.label && link?.url),
      )
      .map((link) => ({ label: link.label, url: link.url })),
    address: doc.address?.trim() || "",
    businessHours: (doc.businessHours ?? [])
      .filter(
        (entry): entry is { days: string; hours: string } =>
          Boolean(entry?.days && entry?.hours),
      )
      .map((entry) => ({ days: entry.days, hours: entry.hours })),
    announcementBar: doc.announcementBar?.trim() || "",
    description: doc.description?.trim() || SITE_DESCRIPTION,
    demoContent: false,
  };
}

async function loadSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  try {
    return await sanityFetch<T>(query, params);
  } catch (error) {
    console.error("Sanity request failed:", error);
    throw new Error(
      "We could not load the boutique catalogue. Please try again in a moment.",
    );
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return demoProducts;

  const docs = await loadSanity<SanityProductDoc[]>(allProductsQuery);
  return docs
    .map(normaliseProduct)
    .filter((product): product is Product => Boolean(product));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return demoProducts.find((product) => product.slug === slug) ?? null;
  }

  const doc = await loadSanity<SanityProductDoc | null>(productBySlugQuery, {
    slug,
  });
  return doc ? normaliseProduct(doc) : null;
}

export async function getCategories(): Promise<Category[]> {
  if (!isSanityConfigured) return demoCategories;

  const docs = await loadSanity<SanityCategoryDoc[]>(allCategoriesQuery);
  return docs
    .map(normaliseCategory)
    .filter((category): category is Category => Boolean(category));
}

export async function getCollections(): Promise<Collection[]> {
  if (!isSanityConfigured) return demoCollections;

  const docs = await loadSanity<SanityCollectionDoc[]>(allCollectionsQuery);
  return docs
    .map(normaliseCollection)
    .filter((collection): collection is Collection => Boolean(collection));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return demoSiteSettings;

  const doc = await loadSanity<SanitySettingsDoc | null>(siteSettingsQuery);
  return normaliseSettings(doc);
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  const collections = await getCollections();
  return collections.find((collection) => collection.slug === slug) ?? null;
}

export type { ProductFilters };
