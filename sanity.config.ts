"use client";

import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "@/lib/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "arike",
  title: "ÀRÌKÉ Studio",
  basePath: "/studio",
  projectId: projectId || "your-project-id",
  dataset,
  apiVersion,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("ÀRÌKÉ")
          .items([
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site settings"),
              ),
            S.divider(),
            S.listItem()
              .title("Products")
              .child(
                S.documentTypeList("product")
                  .title("Products")
                  .defaultOrdering([{ field: "sortOrder", direction: "asc" }]),
              ),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("collection").title("Collections"),
            S.divider(),
            S.documentTypeListItems().filter(
              (item) =>
                item.getId() !== "product" &&
                item.getId() !== "category" &&
                item.getId() !== "collection" &&
                item.getId() !== "siteSettings",
            ),
          ]),
    }),
    visionTool(),
    colorInput(),
  ],
  schema: { types: schemaTypes },
});
