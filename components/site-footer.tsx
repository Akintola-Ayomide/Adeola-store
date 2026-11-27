import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { getCachedNow } from "@/lib/cached-time";
import type { Category, Collection, SiteSettings } from "@/lib/types";
import { buildGeneralEnquiry, buildWhatsAppUrl } from "@/lib/whatsapp";

type SiteFooterProps = {
  settings: SiteSettings;
  categories: Pick<Category, "id" | "name" | "slug">[];
  collections: Pick<Collection, "id" | "name" | "slug">[];
};

export async function SiteFooter({
  settings,
  categories,
  collections,
}: SiteFooterProps) {
  const year = (await getCachedNow()).getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappPhone,
    buildGeneralEnquiry(),
  );
  const instagram =
    settings.socialLinks.find((link) =>
      link.label.toLowerCase().includes("instagram"),
    )?.url || settings.instagramUrl;
  const otherSocials = settings.socialLinks.filter(
    (link) => link.url !== instagram,
  );
  const mapUrl = settings.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`
    : null;

  return (
    <footer className="bg-ink text-bone">
      <div className="container-editorial py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-display text-[26px] uppercase tracking-[0.28em] text-bone"
              aria-label={`${settings.boutiqueName} — home`}
            >
              {settings.boutiqueName}
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-bone/65">
              {settings.tagline}
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-bone/45">
              Considered Nigerian occasion wear, made in Lagos. Aso-ebi, lace,
              aso-oke, ankara and iro &amp; buba.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {instagram ? (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-10 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                >
                  <InstagramIcon className="size-4" strokeWidth={1.5} />
                </a>
              ) : null}
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex size-10 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                >
                  <WhatsAppIcon className="size-4" />
                </a>
              ) : null}
              {otherSocials.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center border border-bone/20 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bone/45">
              Shop
            </h2>
            <ul className="mt-4 space-y-2.5 text-[13px] text-bone/75">
              <li>
                <Link href="/shop" className="transition-colors hover:text-bone">
                  All pieces
                </Link>
              </li>
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(category.slug)}`}
                    className="transition-colors hover:text-bone"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bone/45">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-[13px] text-bone/75">
              <li>
                <Link
                  href="/collections"
                  className="transition-colors hover:text-bone"
                >
                  Collections
                </Link>
              </li>
              {collections.slice(0, 3).map((collection) => (
                <li key={collection.id}>
                  <Link
                    href={`/collections/${encodeURIComponent(collection.slug)}`}
                    className="transition-colors hover:text-bone"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="transition-colors hover:text-bone">
                  Our story
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-care"
                  className="transition-colors hover:text-bone"
                >
                  Customer care
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-bone/45">
              Visit &amp; contact
            </h2>
            <ul className="mt-4 space-y-3.5 text-[13px] text-bone/75">
              {settings.address ? (
                <li className="flex gap-2.5">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-bone/40"
                    strokeWidth={1.5}
                  />
                  {mapUrl ? (
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-relaxed transition-colors hover:text-bone"
                    >
                      {settings.address}
                    </a>
                  ) : (
                    <span className="leading-relaxed">{settings.address}</span>
                  )}
                </li>
              ) : null}
              {settings.contactEmail ? (
                <li className="flex gap-2.5">
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-bone/40"
                    strokeWidth={1.5}
                  />
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="break-all transition-colors hover:text-bone"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
              ) : null}
              {settings.businessHours.length > 0 ? (
                <li className="space-y-1.5 border-t border-bone/15 pt-3.5">
                  {settings.businessHours.map((entry) => (
                    <div
                      key={`${entry.days}-${entry.hours}`}
                      className="flex justify-between gap-4 text-[12px]"
                    >
                      <span className="text-bone/55">{entry.days}</span>
                      <span>{entry.hours}</span>
                    </div>
                  ))}
                </li>
              ) : null}
            </ul>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border-b border-bone/35 pb-1 text-[12px] font-semibold text-bone transition-colors hover:border-bone"
              >
                Chat with the studio
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/15 pt-6 text-[11px] text-bone/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.boutiqueName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/customer-care" className="hover:text-bone">
              Delivery &amp; care
            </Link>
            <Link href="/customer-care#size-guide" className="hover:text-bone">
              Size guide
            </Link>
            <span>Made in Lagos, Nigeria</span>
          </div>
        </div>

        {settings.demoContent ? (
          <p className="mt-4 max-w-4xl text-[10px] leading-relaxed text-bone/35">
            Demo catalogue: product names, prices, imagery and contact details
            are sample content for demonstration and do not represent a live
            inventory. Business details are managed in Sanity.
          </p>
        ) : null}
      </div>
    </footer>
  );
}
