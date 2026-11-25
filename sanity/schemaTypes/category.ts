import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "display", title: "Display" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Category name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      description: "Used in shop links, e.g. aso-ebi.",
      options: { source: "name", maxLength: 60 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "image",
      title: "Category image",
      type: "imageWithAlt",
      group: "display",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "display",
      description: "Lower numbers appear first. Use whole numbers.",
      initialValue: 999,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current", media: "image.asset" },
  },
});
