import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  // This is a singleton: the seed script creates it with a fixed ID and the
  // Studio structure opens that document directly rather than offering a list.
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "appearance", title: "Appearance" },
  ],
  fields: [
    defineField({
      name: "boutiqueName",
      title: "Boutique name",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Site description",
      type: "text",
      rows: 4,
      group: "identity",
      description: "Used in search results and social shares.",
      validation: (Rule) => Rule.required().min(40).max(300),
    }),
    defineField({
      name: "logo",
      title: "Logo image",
      type: "imageWithAlt",
      group: "identity",
      description: "Optional. The wordmark is used when no logo is set.",
    }),
    defineField({
      name: "whatsappPhone",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description: "Use international format, e.g. +234 800 000 0000.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "address",
      title: "Studio address",
      type: "string",
      group: "contact",
      description: "Shown in the footer, e.g. Victoria Island, Lagos, Nigeria.",
    }),
    defineField({
      name: "businessHours",
      title: "Business hours",
      type: "array",
      group: "contact",
      of: [
        {
          type: "object",
          name: "businessHour",
          fields: [
            defineField({
              name: "days",
              title: "Days",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "hours",
              title: "Hours",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "days", subtitle: "hours" },
          },
        },
      ],
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
      group: "social",
      description: "e.g. @arike.atelier",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "socialLinks",
      title: "Other social links",
      type: "array",
      group: "social",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "announcementBar",
      title: "Announcement bar",
      type: "string",
      group: "appearance",
      description: "Short message at the very top of the site.",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
