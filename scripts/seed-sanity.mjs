/**
 * Seed the demo catalogue into a Sanity dataset.
 *
 * Run with credentials in .env.local (or exported in your shell):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_API_WRITE_TOKEN=...
 *
 *   npm run seed
 *
 * The script reads the same demo content the storefront uses, so the CMS and
 * the no-Sanity demo never drift apart. It uses fixed document IDs, making it
 * safe to run again to overwrite the seeded documents.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Load .env.local when available (Node 20.6+).
try {
  process.loadEnvFile?.(".env.local");
} catch {
  // Environment variables may be supplied by the shell or hosting platform.
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId || !token) {
  console.error(
    "Missing credentials. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN, then run npm run seed again.",
  );
  process.exit(1);
}

const { createClient } = await import("sanity");
const client = createClient({ projectId, dataset, token, useCdn: false });

/** Compile the demo TS modules to CommonJS so Node can require them directly. */
function loadDemoContent() {
  const root = process.cwd();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "arike-seed-"));
  const files = [
    ["lib/demo/images.ts", "lib/demo/images.js"],
    ["lib/demo/content.ts", "lib/demo/content.js"],
  ];

  for (const [source, output] of files) {
    const sourcePath = path.join(root, source);
    const outputPath = path.join(tempDir, output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const sourceText = fs.readFileSync(sourcePath, "utf8");
    const { outputText } = ts.transpileModule(sourceText, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
      fileName: sourcePath,
    });
    fs.writeFileSync(outputPath, outputText, "utf8");
  }

  const loaded = require(path.join(tempDir, "lib/demo/content.js"));
  fs.rmSync(tempDir, { recursive: true, force: true });
  return loaded;
}

function collectImageSources(demo) {
  const sources = [];
  const seen = new Set();
  const add = (image) => {
    if (!image?.src || seen.has(image.src)) return;
    seen.add(image.src);
    sources.push(image);
  };

  demo.demoCategories.forEach((category) => add(category.image));
  demo.demoCollections.forEach((collection) => add(collection.coverImage));
  demo.demoProducts.forEach((product) => {
    add(product.image);
    product.gallery?.forEach(add);
  });

  return sources;
}

async function uploadImages(images) {
  const refs = new Map();

  for (const image of images) {
    const filePath = path.join(process.cwd(), "public", image.src);
    if (!fs.existsSync(filePath)) {
      console.warn(`Missing image file, skipped: ${filePath}`);
      continue;
    }

    const filename = path.basename(image.src);
    process.stdout.write(`Uploading ${filename} … `);
    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(filePath),
      { filename },
    );
    refs.set(image.src, asset._id);
    console.log("done");
  }

  return refs;
}

function imageValue(image, refs) {
  if (!image?.src) return undefined;
  const assetRef = refs.get(image.src);
  if (!assetRef) return undefined;

  return {
    _type: "imageWithAlt",
    asset: { _type: "reference", _ref: assetRef },
    alt: image.alt || "",
  };
}

function reference(id) {
  return { _type: "reference", _ref: id };
}

async function main() {
  const demo = loadDemoContent();
  console.log(
    `Seeding ${demo.demoProducts.length} products, ${demo.demoCategories.length} categories and ${demo.demoCollections.length} collections into ${dataset}.`,
  );

  const refs = await uploadImages(collectImageSources(demo));

  const transaction = client.transaction();

  for (const category of demo.demoCategories) {
    transaction.createOrReplace({
      _id: category.id,
      _type: "category",
      name: category.name,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
      image: imageValue(category.image, refs),
      order: category.order,
    });
  }

  for (const collection of demo.demoCollections) {
    transaction.createOrReplace({
      _id: collection.id,
      _type: "collection",
      name: collection.name,
      slug: { _type: "slug", current: collection.slug },
      description: collection.description,
      coverImage: imageValue(collection.coverImage, refs),
      featured: collection.featured,
      order: collection.order,
    });
  }

  for (const product of demo.demoProducts) {
    const gallery = (product.gallery || [])
      .slice(1)
      .map((image) => imageValue(image, refs))
      .filter(Boolean);

    transaction.createOrReplace({
      _id: product.id,
      _type: "product",
      name: product.name,
      slug: { _type: "slug", current: product.slug },
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price,
      category: product.category ? reference(product.category.id) : undefined,
      collections: (product.collections || []).map((collection) =>
        reference(collection.id),
      ),
      fabric: product.fabric,
      sizes: product.sizes || [],
      colours: (product.colours || []).map((colour) => ({
        _type: "colour",
        name: colour.name,
        value: { _type: "color", hex: colour.hex },
      })),
      reference: product.reference,
      image: imageValue(product.image, refs),
      gallery,
      availability: product.availability,
      featured: product.featured,
      newArrival: product.newArrival,
      sortOrder: product.sortOrder,
    });
  }

  const settings = demo.demoSiteSettings;
  transaction.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    boutiqueName: settings.boutiqueName,
    tagline: settings.tagline,
    description: settings.description,
    whatsappPhone: settings.whatsappPhone,
    contactEmail: settings.contactEmail,
    address: settings.address,
    businessHours: settings.businessHours.map((entry) => ({
      _type: "businessHour",
      days: entry.days,
      hours: entry.hours,
    })),
    instagramHandle: settings.instagramHandle,
    instagramUrl: settings.instagramUrl,
    socialLinks: settings.socialLinks.map((link) => ({
      _type: "socialLink",
      label: link.label,
      url: link.url,
    })),
    announcementBar: settings.announcementBar,
  });

  const result = await transaction.commit({ returnDocuments: false });
  console.log(`Seed complete. Transaction: ${result.transactionId}`);
  console.log(
    "Remember to replace the sample WhatsApp number, email and address with real details before launch.",
  );
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
