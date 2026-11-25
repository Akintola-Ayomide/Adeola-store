import type { SchemaTypeDefinition } from "sanity";
import { category } from "./category";
import { collection } from "./collection";
import { imageWithAlt } from "./imageWithAlt";
import { product } from "./product";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  imageWithAlt,
  product,
  category,
  collection,
  siteSettings,
];
