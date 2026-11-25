import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Collection } from "@/lib/types";
import { pluralise } from "@/lib/format";

export function CollectionBanner({
  collection,
  productCount,
}: {
  collection: Collection;
  productCount: number;
}) {
  return (
    <section className="bg-ink text-bone">
      <div className="container-editorial py-12 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink/40 md:aspect-[16/11]">
              {collection.coverImage ? (
                <Image
                  src={collection.coverImage.src}
                  alt={collection.coverImage.alt}
                  fill
                  quality={84}
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-display text-3xl text-bone/40">
                  {collection.name}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-5 md:pl-2 lg:pl-6">
            <p className="eyebrow text-[#d9b08c]">Featured collection</p>
            <h2 className="mt-3 font-display text-[2.2rem] leading-[1.02] tracking-[-0.02em] md:text-[3.1rem]">
              {collection.name}
            </h2>
            {collection.description ? (
              <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-bone/65 md:text-[14px]">
                {collection.description}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link
                href={`/collections/${collection.slug}`}
                className={buttonVariants({
                  variant: "outlineLight",
                  size: "lg",
                })}
              >
                Explore the collection
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
              <span className="text-[10px] uppercase tracking-[0.14em] text-bone/45">
                {pluralise(productCount, "piece")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
