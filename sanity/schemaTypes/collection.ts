import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "display", title: "Display" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Collection name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Collection description",
      type: "text",
      rows: 6,
      group: "content",
      description: "Shown on the collection page and in search results.",
      validation: (Rule) => Rule.required().min(40).max(900),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "imageWithAlt",
      group: "display",
    }),
    defineField({
      name: "featured",
      title: "Featured collection",
      type: "boolean",
      group: "display",
      description: "Eligible for the homepage collection banner.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "display",
      initialValue: 999,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
      media: "coverImage.asset",
    },
  },
});
