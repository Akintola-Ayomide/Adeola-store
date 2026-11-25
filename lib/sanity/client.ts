import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;

export const sanityConfig = {
  projectId: projectId || "your-project-id",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published" as const,
};

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!sanityClient) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
    );
  }

  return sanityClient.fetch<T>(query, params, {
    next: { revalidate: 60, tags: ["sanity"] },
  });
}
