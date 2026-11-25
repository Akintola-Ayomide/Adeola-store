import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { AvailabilityLabel } from "@/components/availability-label";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductGrid } from "@/components/product-grid";
import { SectionHeading } from "@/components/section-heading";
import { SizeGuide } from "@/components/size-guide";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, getProducts, getSiteSettings } from "@/lib/data";
import { getRelatedProducts } from "@/lib/catalogue";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  productJsonLd,
} from "@/lib/seo";
import { buildGeneralEnquiry } from "@/lib/whatsapp";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const description =
    product.shortDescription ||
    `${product.name} — ${formatPrice(product.price)}. Nigerian occasion wear by ÀRÌKÉ, made in Lagos.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} — ÀRÌKÉ`,
      description,
      url: `/product/${product.slug}`,
      images: [
        {
          url: absoluteUrl(product.image.src),
          alt: product.image.alt,
        },
      ],
    },
  };
}

function DetailDisclosure({
  title,
  children,
  open = false,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  return (
    <details
      open={open}
      className="group border-b border-line py-4 first:border-t"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <Plus
          className="size-4 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-45"
          strokeWidth={1.5}
        />
      </summary>
      <div className="pt-3 text-[13px] leading-relaxed text-ink-soft">
        {children}
      </div>
    </details>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [settings, product, allProducts] = await Promise.all([
    getSiteSettings(),
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) notFound();

  const related = getRelatedProducts(product, allProducts, 4);
  const productUrl = absoluteUrl(`/product/${product.slug}`);
  const descriptionParagraphs = product.description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product, settings),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            ...(product.category
              ? [
                  {
                    name: product.category.name,
                    path: `/shop?category=${product.category.slug}`,
                  },
                ]
              : []),
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ]}
      />

      <div className="container-editorial pb-28 pt-6 lg:pb-20 lg:pt-9">
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] uppercase tracking-[0.13em] text-ink-soft"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="transition-colors hover:text-ink">
                Shop
              </Link>
            </li>
            {product.category ? (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/shop?category=${product.category.slug}`}
                    className="transition-colors hover:text-ink"
                  >
                    {product.category.name}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              <span className="line-clamp-1">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.gallery}
              productName={product.name}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                {product.category ? (
                  <Link
                    href={`/shop?category=${product.category.slug}`}
                    className="text-clay transition-colors hover:text-clay-dark"
                  >
                    {product.category.name}
                  </Link>
                ) : null}
                {product.collections.length > 0 ? (
                  <>
                    <span aria-hidden="true" className="text-line">
                      ·
                    </span>
                    <span>
                      {product.collections
                        .map((collection) => collection.name)
                        .join(" / ")}
                    </span>
                  </>
                ) : null}
              </div>

              <h1 className="mt-3 font-display text-[2.4rem] leading-[1.02] tracking-[-0.03em] md:text-[3.3rem]">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4">
                <p className="text-[1.35rem] font-medium tracking-[-0.01em]">
                  {formatPrice(product.price)}
                </p>
                <span aria-hidden="true" className="h-3 w-px bg-line" />
                <AvailabilityLabel availability={product.availability} />
              </div>

              {product.shortDescription ? (
                <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-ink-soft md:text-[14px]">
                  {product.shortDescription}
                </p>
              ) : null}

              <ProductPurchase
                product={product}
                phone={settings.whatsappPhone}
                productUrl={productUrl}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-9 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-clay">The piece</p>
            <div className="mt-3 space-y-4 text-[13.5px] leading-relaxed text-ink-soft md:text-[14px]">
              {descriptionParagraphs.length > 0 ? (
                descriptionParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))
              ) : (
                <p>
                  Full details for this piece are being added. Contact the
                  studio for fabric, fit and availability.
                </p>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-x-9 gap-y-4 border-t border-line pt-5">
              {product.fabric ? (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Fabric
                  </p>
                  <p className="mt-1.5 text-[12.5px]">{product.fabric}</p>
                </div>
              ) : null}
              {product.sizes.length > 0 ? (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Sizes
                  </p>
                  <p className="mt-1.5 text-[12.5px]">
                    {product.sizes.join(" · ")}
                  </p>
                </div>
              ) : null}
              {product.colours.length > 0 ? (
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    Colours
                  </p>
                  <p className="mt-1.5 text-[12.5px]">
                    {product.colours.map((colour) => colour.name).join(" · ")}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="md:col-span-5">
            <DetailDisclosure title="Size & fit" open>
              <SizeGuide compact />
            </DetailDisclosure>
            <DetailDisclosure title="Fabric & care">
              <p>
                {product.fabric
                  ? `Made in ${product.fabric}. `
                  : ""}
                Dry clean only. Store away from direct sunlight, and keep
                beaded or lace pieces folded with tissue to protect the surface.
                The studio can advise on care for a specific cloth.
              </p>
            </DetailDisclosure>
            <DetailDisclosure title="Ordering & delivery">
              <p>
                Orders are confirmed on WhatsApp with the studio. We confirm
                availability, measurements and the delivery timeline before
                payment. Ready-to-wear pieces are dispatched nationwide; made-to-
                order and international orders are quoted individually.
              </p>
              <Link
                href="/customer-care"
                className="mt-3 inline-block border-b border-ink/30 pb-0.5 text-[12px] font-medium text-ink transition-colors hover:border-ink"
              >
                Read delivery &amp; care
              </Link>
            </DetailDisclosure>
          </div>
        </div>
      </div>

      <section className="border-t border-line bg-paper">
        <div className="container-editorial py-12 md:py-16">
          <SectionHeading
            eyebrow="You may also admire"
            title="Complete the look"
            href="/shop"
            linkLabel="Shop all"
          />
          {related.length > 0 ? (
            <ProductGrid products={related} className="mt-7 md:mt-9" />
          ) : (
            <div className="mt-6">
              <WhatsAppLink
                phone={settings.whatsappPhone}
                message={buildGeneralEnquiry(
                  `Hello ÀRÌKÉ, I like the ${product.name}. What else would you suggest?`,
                )}
                label="Ask the studio"
                variant="secondary"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
