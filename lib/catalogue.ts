import type { Availability, Product, ProductFilters } from "./types";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A–Z" },
] as const;

export const AVAILABILITY_OPTIONS: {
  value: Availability | "all";
  label: string;
}[] = [
  { value: "all", label: "All availability" },
  { value: "in_stock", label: "In stock" },
  { value: "low_stock", label: "Low stock" },
  { value: "made_to_order", label: "Made to order" },
  { value: "out_of_stock", label: "Sold out" },
];

function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function matchesQuery(product: Product, query: string): boolean {
  const haystack = normalise(
    [
      product.name,
      product.shortDescription,
      product.description,
      product.fabric ?? "",
      product.category?.name ?? "",
      ...product.collections.map((collection) => collection.name),
    ].join(" "),
  );

  return normalise(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function sortProducts(
  products: Product[],
  sort: string | undefined,
): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return sorted.sort(
        (a, b) =>
          Number(b.newArrival) - Number(a.newArrival) ||
          a.sortOrder - b.sortOrder ||
          a.name.localeCompare(b.name),
      );
    case "featured":
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          a.sortOrder - b.sortOrder ||
          a.name.localeCompare(b.name),
      );
  }
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  const query = filters.query?.trim() ?? "";
  const category = filters.category?.trim() ?? "";
  const availability = filters.availability?.trim() ?? "";

  const filtered = products.filter((product) => {
    if (category && product.category?.slug !== category) return false;
    if (availability && availability !== "all" && product.availability !== availability) {
      return false;
    }
    if (query && !matchesQuery(product, query)) return false;
    return true;
  });

  return sortProducts(filtered, filters.sort);
}

export function takeWithFill(
  primary: Product[],
  pool: Product[],
  limit: number,
): Product[] {
  const result = [...primary];
  const seen = new Set(result.map((product) => product.id));

  for (const product of pool) {
    if (result.length >= limit) break;
    if (!seen.has(product.id)) {
      result.push(product);
      seen.add(product.id);
    }
  }

  return result.slice(0, limit);
}

export function getNewArrivals(products: Product[], limit = 4): Product[] {
  const sorted = [...products].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
  );
  const arrivals = sorted.filter((product) => product.newArrival);
  return takeWithFill(arrivals, sorted, limit);
}

export function getFeaturedProducts(products: Product[], limit = 4): Product[] {
  const sorted = [...products].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
  );
  const featured = sorted.filter((product) => product.featured);
  return takeWithFill(featured, sorted, limit);
}

export function getRelatedProducts(
  product: Product,
  products: Product[],
  limit = 4,
): Product[] {
  const sameCategory = products.filter(
    (item) =>
      item.id !== product.id &&
      item.category?.slug &&
      item.category.slug === product.category?.slug,
  );
  const sameCollection = products.filter(
    (item) =>
      item.id !== product.id &&
      item.collections.some((collection) =>
        product.collections.some((own) => own.slug === collection.slug),
      ),
  );
  const pool = products.filter((item) => item.id !== product.id);

  return takeWithFill(
    [...sameCategory, ...sameCollection].filter(
      (item, index, array) =>
        array.findIndex((candidate) => candidate.id === item.id) === index,
    ),
    pool,
    limit,
  );
}

export function getProductsForCollection(
  products: Product[],
  collectionSlug: string,
): Product[] {
  return products.filter((product) =>
    product.collections.some(
      (collection) => collection.slug === collectionSlug,
    ),
  );
}

export function getProductsForCategory(
  products: Product[],
  categorySlug: string,
): Product[] {
  return products.filter(
    (product) => product.category?.slug === categorySlug,
  );
}

export function countProductsForCategory(
  products: Product[],
  categorySlug: string,
): number {
  return getProductsForCategory(products, categorySlug).length;
}

export function countProductsForCollection(
  products: Product[],
  collectionSlug: string,
): number {
  return getProductsForCollection(products, collectionSlug).length;
}
