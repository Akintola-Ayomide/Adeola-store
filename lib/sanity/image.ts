import imageUrlBuilder from "@sanity/image-url";
import type { CmsImage } from "../types";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

type SanityImageSource = {
  asset?: { _ref?: string } | null;
  alt?: string | null;
  hotspot?: unknown;
  crop?: unknown;
};

export function sanityImage(
  source: SanityImageSource | null | undefined,
  fallbackAlt: string,
  width = 1600,
): CmsImage | null {
  if (!source?.asset || !builder) return null;

  try {
    return {
      src: builder
        .image(source)
        .width(width)
        .quality(82)
        .auto("format")
        .fit("max")
        .url(),
      alt: source.alt?.trim() || fallbackAlt,
    };
  } catch (error) {
    console.error("Failed to build Sanity image URL", error);
    return null;
  }
}
