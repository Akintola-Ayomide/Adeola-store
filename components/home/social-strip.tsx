import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons";
import type { CmsImage, SiteSettings } from "@/lib/types";

export function SocialStrip({
  images,
  settings,
}: {
  images: CmsImage[];
  settings: SiteSettings;
}) {
  const showcase = images.slice(0, 6);
  if (showcase.length === 0) return null;

  const href = settings.instagramUrl || "/shop";
  const external = Boolean(settings.instagramUrl);

  return (
    <section className="container-editorial py-14 md:py-20">
      <div className="mb-7 flex flex-col gap-3 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-clay">Styled in ÀRÍKÉ</p>
          <h2 className="mt-2 font-display text-[2rem] leading-none tracking-[-0.02em] md:text-[2.6rem]">
            From the atelier
          </h2>
        </div>
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="inline-flex items-center gap-2 self-start text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-ink md:self-auto"
        >
          <InstagramIcon className="size-4" strokeWidth={1.5} />
          {settings.instagramHandle || "Instagram"}
        </a>
      </div>

      <div className="grid grid-cols-3 gap-1.5 md:grid-cols-6 md:gap-2">
        {showcase.map((image, index) => (
          <a
            key={`${image.src}-${index}`}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group relative aspect-square overflow-hidden bg-sand"
            aria-label={
              external
                ? `View ${settings.instagramHandle || "our Instagram"}`
                : "Shop the collection"
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={76}
              sizes="(max-width: 768px) 33vw, 16vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-paper opacity-0 transition-all duration-300 group-hover:bg-ink/30 group-hover:opacity-100">
              <InstagramIcon className="size-5" strokeWidth={1.5} />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <Link
          href="/shop"
          className="border-b border-ink/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-ink"
        >
          Shop the pieces
        </Link>
      </div>
    </section>
  );
}
