import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/home/hero";
import { CategoryTiles } from "@/components/home/category-tiles";
import { CollectionBanner } from "@/components/home/collection-banner";
import { BrandIntro } from "@/components/home/brand-intro";
import { WhatsAppCta } from "@/components/home/whatsapp-cta";
import { SocialStrip } from "@/components/home/social-strip";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppLink } from "@/components/whatsapp-link";
import {
  countProductsForCollection,
  getFeaturedProducts,
  getNewArrivals,
  takeWithFill,
} from "@/lib/catalogue";
import { getCategories, getCollections, getProducts, getSiteSettings } from "@/lib/data";
import { organizationJsonLd } from "@/lib/seo";
import { buildGeneralEnquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const assurances = [
  {
    title: "Made in Lagos",
    copy: "Cut, fitted and finished by our studio team.",
  },
  {
    title: "Nationwide & worldwide",
    copy: "Delivery arranged for each order, including the diaspora.",
  },
  {
    title: "Personal ordering",
    copy: "Sizing, styling and availability confirmed on WhatsApp.",
  },
];

export default async function HomePage() {
  const [settings, products, categories, collections] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getCategories(),
    getCollections(),
  ]);

  const newArrivals = getNewArrivals(products, 4);
  const newArrivalIds = new Set(newArrivals.map((product) => product.id));
  const featured = takeWithFill(
    products.filter(
      (product) => product.featured && !newArrivalIds.has(product.id),
    ),
    getFeaturedProducts(products, 8),
    4,
  );

  const featuredCollections = collections.filter(
    (collection) => collection.featured,
  );
  const bannerCollection =
    featuredCollections[1] ?? featuredCollections[0] ?? collections[0] ?? null;

  const seenSocialImages = new Set<string>();
  const socialImages = [...newArrivals, ...featured, ...products]
    .flatMap((product) => [product.image, ...product.gallery])
    .filter((image) => {
      if (seenSocialImages.has(image.src)) return false;
      seenSocialImages.add(image.src);
      return true;
    })
    .slice(0, 6);

  return (
    <>
      <JsonLd data={organizationJsonLd(settings)} />
      <Hero settings={settings} />

      <section
        aria-label="How we work"
        className="border-b border-line bg-paper"
      >
        <div className="container-editorial grid md:grid-cols-3">
          {assurances.map((item, index) => (
            <div
              key={item.title}
              className={`py-5 md:px-7 md:py-6 ${
                index > 0
                  ? "border-t border-line md:border-l md:border-t-0"
                  : ""
              } ${index === 0 ? "md:pl-0" : ""} ${
                index === assurances.length - 1 ? "md:pr-0" : ""
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                {item.title}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CategoryTiles categories={categories} />

      {products.length > 0 ? (
        <section className="container-editorial pb-14 md:pb-20">
          <SectionHeading
            eyebrow="Just in"
            title="New arrivals"
            description="The latest pieces from the studio, ready to try or made to your measurements."
            href="/shop?sort=newest"
            linkLabel="Shop all new"
          />
          <ProductGrid products={newArrivals} className="mt-7 md:mt-9" priorityCount={2} />
        </section>
      ) : (
        <section className="container-editorial py-16 md:py-24">
          <div className="max-w-xl border border-line bg-paper p-7 md:p-10">
            <p className="eyebrow text-clay">Catalogue update</p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              New pieces are on their way.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              The studio is preparing the next collection. In the meantime, tell
              us what you are dressing for and we will help.
            </p>
            <WhatsAppLink
              phone={settings.whatsappPhone}
              message={buildGeneralEnquiry()}
              label="Ask the studio"
              className="mt-6"
            />
          </div>
        </section>
      )}

      {bannerCollection ? (
        <CollectionBanner
          collection={bannerCollection}
          productCount={countProductsForCollection(
            products,
            bannerCollection.slug,
          )}
        />
      ) : null}

      <BrandIntro />

      {products.length > 0 ? (
        <section className="border-y border-line bg-paper">
          <div className="container-editorial py-14 md:py-20">
            <SectionHeading
              eyebrow="Studio selection"
              title="The occasion edit"
              description="Pieces the studio is styling for weddings, receptions and the parties around them."
              href="/shop?sort=featured"
              linkLabel="Shop the edit"
            />
            <ProductGrid products={featured} className="mt-7 md:mt-9" />
          </div>
        </section>
      ) : null}

      <WhatsAppCta settings={settings} />

      {socialImages.length > 0 ? (
        <SocialStrip images={socialImages} settings={settings} />
      ) : null}

      <section className="container-editorial pb-16">
        <div className="flex flex-col items-start justify-between gap-5 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="max-w-xl text-[12px] leading-relaxed text-ink-soft">
            Looking for a specific colour, fabric or coordinated aso-ebi for a
            group? The studio can source and make to order.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink"
          >
            Make an enquiry
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </section>
    </>
  );
}
