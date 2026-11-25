import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { countProductsForCollection } from "@/lib/catalogue";
import { getCollections, getProducts, getSiteSettings } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";
import { buildGeneralEnquiry } from "@/lib/whatsapp";
import { pluralise } from "@/lib/format";

export const metadata: Metadata = {
  title: "Curated collections",
  description:
    "Explore ÀRÍKÉ's curated edits: aso-ebi, lace and ceremony, aso-oke heritage, ankara, iro & buba and bridal. Nigerian occasion wear made in Lagos.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "Curated collections — ÀRÍKÉ",
    description:
      "Aso-ebi, lace, aso-oke, ankara, iro & buba and bridal edits from Lagos.",
    url: "/collections",
  },
};

export default async function CollectionsPage() {
  const [settings, collections, products] = await Promise.all([
    getSiteSettings(),
    getCollections(),
    getProducts(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />

      <section className="container-editorial pb-7 pt-8 md:pb-10 md:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] uppercase tracking-[0.14em] text-ink-soft"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              Collections
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-8">
            <p className="eyebrow text-clay">Curated edits</p>
            <h1 className="mt-3 font-display text-[clamp(2.7rem,6.5vw,5rem)] leading-[0.94] tracking-[-0.035em]">
              Celebrations,
              <br />
              <em className="italic">one edit at a time.</em>
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="max-w-sm text-[13.5px] leading-relaxed text-ink-soft md:text-[14px]">
              Each collection is a way into the wardrobe: the family dressing
              together, the bride&apos;s second look, the mother of the
              occasion, the modern ankara dress.
            </p>
          </div>
        </div>
      </section>

      {collections.length > 0 ? (
        <section aria-label="Collections" className="border-t border-line">
          {collections.map((collection, index) => {
            const count = countProductsForCollection(products, collection.slug);
            const imageFirst = index % 2 === 1;

            return (
              <article
                key={collection.id}
                className="border-b border-line"
              >
                <div className="container-editorial py-10 md:py-16">
                  <div className="grid items-center gap-6 md:grid-cols-12 md:gap-12">
                    <div
                      className={`md:col-span-7 ${
                        imageFirst ? "md:order-2" : ""
                      }`}
                    >
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="group block"
                        aria-label={`Explore ${collection.name}`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-sand md:aspect-[16/10]">
                          {collection.coverImage ? (
                            <Image
                              src={collection.coverImage.src}
                              alt={collection.coverImage.alt}
                              fill
                              quality={82}
                              sizes="(max-width: 768px) 100vw, 58vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center font-display text-2xl text-ink-soft/60">
                              {collection.name}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>

                    <div
                      className={`md:col-span-5 ${
                        imageFirst ? "md:order-1 md:pr-4" : "md:pl-4"
                      }`}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay">
                        {String(index + 1).padStart(2, "0")} ·{" "}
                        {pluralise(count, "piece")}
                      </p>
                      <h2 className="mt-3 font-display text-[2rem] leading-[1.02] tracking-[-0.02em] md:text-[2.8rem]">
                        {collection.name}
                      </h2>
                      {collection.description ? (
                        <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-ink-soft md:text-[14px]">
                          {collection.description}
                        </p>
                      ) : null}
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="group mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-ink"
                      >
                        Explore collection
                        <ArrowRight
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          strokeWidth={1.5}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="container-editorial py-14">
          <div className="max-w-xl border border-line bg-paper p-8">
            <h2 className="font-display text-3xl">Collections coming soon.</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              The studio is preparing the edits. Tell us the occasion and we
              will help you find the right piece in the meantime.
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

      <section className="container-editorial py-12 md:py-16">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-clay">Not sure where to start?</p>
            <h2 className="mt-2 font-display text-[1.9rem] leading-tight md:text-[2.4rem]">
              Tell us the occasion. We&apos;ll help you choose.
            </h2>
          </div>
          <div className="flex flex-col gap-2.5 xs:flex-row">
            <Link
              href="/shop"
              className={buttonVariants({ variant: "primary" })}
            >
              Shop all pieces
            </Link>
            <WhatsAppLink
              phone={settings.whatsappPhone}
              message={buildGeneralEnquiry(
                "Hello ÀRÌKÉ, I would like help choosing a look for an occasion.",
              )}
              label="Chat on WhatsApp"
              variant="secondary"
            />
          </div>
        </div>
      </section>
    </>
  );
}
