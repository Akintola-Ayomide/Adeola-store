export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2025-02-19";

export const isSanityConfigured = Boolean(projectId && dataset);
