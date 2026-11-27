import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { ProductGrid } from "@/components/product-grid";
import { ShopControls } from "@/components/shop/shop-controls";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { AVAILABILITY_OPTIONS, filterProducts } from "@/lib/catalogue";
import { getCategories, getProducts, getSiteSettings } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";
import { buildGeneralEnquiry } from "@/lib/whatsapp";
import type { ProductFilters } from "@/lib/types";

export const metadata: Metadata = {
  title: "Shop Nigerian occasion wear",
  description:
    "Shop lace gowns, aso-ebi, aso-oke, ankara and iro & buba by ÀRÌKÉ. Filter by category and availability, then order or enquire on WhatsApp.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop Nigerian occasion wear — ÀRÌKÉ",
    description:
      "Lace, aso-ebi, aso-oke, ankara and iro & buba, made in Lagos.",
    url: "/shop",
  },
};

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function normaliseSort(value: string): string {
  return ["featured", "newest", "price-asc", "price-desc", "name-asc"].includes(
    value,
  )
    ? value
    : "featured";
}

function normaliseAvailability(value: string): string {
  return AVAILABILITY_OPTIONS.some(
    (option) => option.value !== "all" && option.value === value,
  )
    ? value
    : "";
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />

      <section className="container-editorial pb-7 pt-7 md:pb-10 md:pt-12">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              Shop
            </li>
          </ol>
        </nav>

        <div className="mt-7 grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-8">
            <p className="eyebrow text-clay">The collection</p>
            <h1 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.96] tracking-[-0.03em]">
              Occasion wear,
              <br />
              <em className="italic">made in Lagos.</em>
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="max-w-sm text-[13.5px] leading-relaxed text-ink-soft md:text-[14px]">
              Lace, aso-ebi, aso-oke, ankara and iro &amp; buba — a focused edit
              for weddings, owambe and the celebrations in between. Every piece
              is ordered through the studio.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<ShopResultsFallback />}>
        <ShopResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}

function ShopResultsFallback() {
  return (
    <p className="container-editorial py-10 text-[13px] text-ink-soft">
      Loading the collection…
    </p>
  );
}

async function ShopResults({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const [settings, products, categories] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getCategories(),
  ]);

  const filters: ProductFilters = {
    query: first(params.q).slice(0, 120),
    category: categories.some((category) => category.slug === first(params.category))
      ? first(params.category)
      : "",
    availability: normaliseAvailability(first(params.availability)),
    sort: normaliseSort(first(params.sort)),
  };

  const results = filterProducts(products, filters);
  const hasCatalogue = products.length > 0;
  const hasFilters = Boolean(
    filters.query || filters.category || filters.availability,
  );

  return (
    <>
      <ShopControls categories={categories} filters={filters} count={results.length} />

      <section className="container-editorial py-8 md:py-12">
        {results.length > 0 ? (
          <ProductGrid products={results} priorityCount={4} />
        ) : hasCatalogue ? (
          <div className="max-w-2xl border border-line bg-paper p-7 md:p-10">
            <p className="eyebrow text-clay">Nothing matched</p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              We couldn&apos;t find that piece.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              Try a different search or remove a filter. If you are looking for a
              specific colour or fabric, the studio can source it for you.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 xs:flex-row">
              <Link
                href="/shop"
                className={buttonVariants({ variant: "primary" })}
              >
                Clear filters
              </Link>
              <WhatsAppLink
                phone={settings.whatsappPhone}
                message={buildGeneralEnquiry(
                  "Hello ÀRÌKÉ, I am looking for a specific piece. Please help me find it.",
                )}
                label="Ask the studio"
                variant="secondary"
              />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl border border-line bg-paper p-7 md:p-10">
            <p className="eyebrow text-clay">Catalogue update</p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              The next collection is being prepared.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              New pieces will appear here as soon as they are published. In the
              meantime, tell us what you are dressing for and we will help
              personally.
            </p>
            <WhatsAppLink
              phone={settings.whatsappPhone}
              message={buildGeneralEnquiry()}
              label="Ask the studio"
              className="mt-6"
            />
          </div>
        )}

        {hasFilters && results.length > 0 ? (
          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
            <p className="text-[12px] leading-relaxed text-ink-soft">
              Not seeing the right colour or fabric? The studio can source and
              make to order.
            </p>
            <Link
              href="/contact"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              Make an enquiry
            </Link>
          </div>
        ) : null}
      </section>
    </>
  );
}
