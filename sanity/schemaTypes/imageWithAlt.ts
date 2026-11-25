import { defineField, defineType } from "sanity";

/**
 * Shared image type with accessible alt text and crop/hotspot support.
 * Keeping this as an `image` type (rather than an object wrapping an image)
 * means the stored value has the standard shape our image-url builder expects.
 */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      description:
        "Describe the image for screen readers, e.g. “Model wearing a green lace gown”.",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(160)
          .warning("Keep alt text short but descriptive."),
    }),
  ],
  preview: {
    select: { media: "asset", title: "alt" },
    prepare({ media, title }) {
      return { media, title: title || "Untitled image" };
    },
  },
});
