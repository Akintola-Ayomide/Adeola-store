import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ProductGrid } from "@/components/product-grid";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import {
  countProductsForCollection,
  getProductsForCollection,
} from "@/lib/catalogue";
import {
  getCollectionBySlug,
  getCollections,
  getProducts,
  getSiteSettings,
} from "@/lib/data";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { buildGeneralEnquiry } from "@/lib/whatsapp";
import { pluralise } from "@/lib/format";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection not found" };
  }

  const description =
    collection.description ||
    `${collection.name} — Nigerian occasion wear by ÀRÌKÉ, made in Lagos.`;

  return {
    title: collection.name,
    description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.name} — ÀRÌKÉ`,
      description,
      url: `/collections/${collection.slug}`,
      images: collection.coverImage
        ? [
            {
              url: absoluteUrl(collection.coverImage.src),
              alt: collection.coverImage.alt,
            },
          ]
        : undefined,
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const [settings, collection, products, collections] = await Promise.all([
    getSiteSettings(),
    getCollectionBySlug(slug),
    getProducts(),
    getCollections(),
  ]);

  if (!collection) notFound();

  const collectionProducts = getProductsForCollection(products, collection.slug);
  const otherCollections = collections
    .filter((item) => item.slug !== collection.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: collection.name, path: `/collections/${collection.slug}` },
        ])}
      />

      <section className="container-editorial pb-8 pt-7 md:pb-12 md:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] uppercase tracking-[0.14em] text-ink-soft"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/collections"
                className="transition-colors hover:text-ink"
              >
                Collections
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {collection.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-7 md:grid-cols-12 md:items-center md:gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-clay">Collection</p>
            <h1 className="mt-3 font-display text-[2.6rem] leading-[0.97] tracking-[-0.03em] md:text-[3.9rem]">
              {collection.name}
            </h1>
            {collection.description ? (
              <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-ink-soft md:text-[14.5px]">
                {collection.description}
              </p>
            ) : null}
            <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {pluralise(
                countProductsForCollection(products, collection.slug),
                "piece",
              )}{" "}
              · Made in Lagos
            </p>
            <div className="mt-7 flex flex-col gap-2.5 xs:flex-row">
              <Link
                href="#pieces"
                className={buttonVariants({ variant: "primary" })}
              >
                Shop the edit
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
              <WhatsAppLink
                phone={settings.whatsappPhone}
                message={buildGeneralEnquiry(
                  `Hello ÀRÌKÉ, I would like help with a piece from the ${collection.name} collection.`,
                )}
                label="Ask the studio"
                variant="secondary"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand md:aspect-[16/10]">
              {collection.coverImage ? (
                <Image
                  src={collection.coverImage.src}
                  alt={collection.coverImage.alt}
                  fill
                  priority
                  quality={84}
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-display text-2xl text-ink-soft/60">
                  {collection.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="pieces"
        className="container-editorial scroll-mt-24 border-t border-line py-9 md:py-14"
      >
        {collectionProducts.length > 0 ? (
          <ProductGrid products={collectionProducts} priorityCount={2} />
        ) : (
          <div className="max-w-xl border border-line bg-paper p-7 md:p-10">
            <p className="eyebrow text-clay">In preparation</p>
            <h2 className="mt-3 font-display text-3xl">
              Pieces from this edit are on their way.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              The studio is finishing the next set. Tell us what you need and we
              will let you know what is available.
            </p>
            <WhatsAppLink
              phone={settings.whatsappPhone}
              message={buildGeneralEnquiry(
                `Hello ÀRÌKÉ, I would like to know about upcoming pieces in the ${collection.name} collection.`,
              )}
              label="Ask the studio"
              className="mt-6"
            />
          </div>
        )}
      </section>

      {otherCollections.length > 0 ? (
        <section className="border-t border-line bg-paper">
          <div className="container-editorial py-10 md:py-14">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-2xl md:text-3xl">
                Continue exploring
              </h2>
              <Link
                href="/collections"
                className="hidden border-b border-ink/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-ink sm:inline-block"
              >
                All collections
              </Link>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3 md:gap-5">
              {otherCollections.map((item) => (
                <Link
                  key={item.id}
                  href={`/collections/${item.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-line py-4 md:border md:p-5"
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-clay">
                      Collection
                    </p>
                    <p className="mt-1.5 font-display text-xl leading-tight">
                      {item.name}
                    </p>
                  </div>
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
