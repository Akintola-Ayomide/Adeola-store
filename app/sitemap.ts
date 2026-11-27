import type { MetadataRoute } from "next";
import { getCachedNow } from "@/lib/cached-time";
import { getCategories, getCollections, getProducts } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = await getCachedNow();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/shop"), lastModified, changeFrequency: "daily", priority: 0.9 },
    {
      url: absoluteUrl("/collections"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    {
      url: absoluteUrl("/customer-care"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const [products, categories, collections] = await Promise.all([
      getProducts(),
      getCategories(),
      getCollections(),
    ]);

    return [
      ...staticRoutes,
      ...products.map((product) => ({
        url: absoluteUrl(`/product/${product.slug}`),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
      ...collections.map((collection) => ({
        url: absoluteUrl(`/collections/${collection.slug}`),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...categories.map((category) => ({
        url: absoluteUrl(`/shop?category=${encodeURIComponent(category.slug)}`),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      })),
    ];
  } catch (error) {
    // A CMS outage should not take down the sitemap. Static routes are still
    // valid and will be enriched once Sanity is reachable again.
    console.error("Sitemap could not include CMS routes:", error);
    return staticRoutes;
  }
}
