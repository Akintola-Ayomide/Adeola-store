import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";

export function CategoryTiles({ categories }: { categories: Category[] }) {
  const featured = categories.slice(0, 4);
  if (featured.length === 0) return null;

  return (
    <section className="container-editorial py-14 md:py-20">
      <div className="mb-7 flex flex-col gap-3 md:mb-9 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-clay">The wardrobe</p>
          <h2 className="mt-2 font-display text-[2rem] leading-none tracking-[-0.02em] md:text-[2.6rem]">
            Shop by tradition
          </h2>
        </div>
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 self-start border-b border-ink/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-ink md:self-auto"
        >
          All pieces
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
        {featured.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${encodeURIComponent(category.slug)}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-sand">
              {category.image ? (
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-4 text-center font-display text-xl text-ink-soft">
                  {category.name}
                </div>
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-70" />
              <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-paper md:bottom-4 md:left-4 md:right-4">
                <span className="font-display text-[1.35rem] leading-none md:text-[1.6rem]">
                  {category.name}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </div>
            {category.description ? (
              <p className="mt-2.5 line-clamp-2 text-[11px] leading-relaxed text-ink-soft md:text-[12px]">
                {category.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
