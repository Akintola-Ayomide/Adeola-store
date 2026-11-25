import Image from "next/image";
import Link from "next/link";
import { AvailabilityLabel } from "@/components/availability-label";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

function cardBadge(product: Product) {
  if (product.availability === "out_of_stock") return "Sold out";
  if (product.availability === "made_to_order") return "Made to order";
  if (product.newArrival) return "New";
  return null;
}

export function ProductCard({
  product,
  priority = false,
  className,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: ProductCardProps) {
  const badge = cardBadge(product);
  const hoverImage = product.gallery[1];

  return (
    <article className={cn("group", className)}>
      <Link
        href={`/product/${product.slug}`}
        className="block focus-visible:outline-offset-4"
        aria-label={`${product.name} — ${formatPrice(product.price)}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            priority={priority}
            quality={82}
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {hoverImage ? (
            <Image
              src={hoverImage.src}
              alt=""
              aria-hidden="true"
              fill
              quality={78}
              sizes={sizes}
              className="hidden object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 md:block"
            />
          ) : null}

          {badge ? (
            <span className="absolute left-2.5 top-2.5 bg-paper/95 px-2 py-1 text-[9px] font-semibold uppercase leading-none tracking-[0.12em] text-ink backdrop-blur-sm md:left-3 md:top-3 md:px-2.5 md:text-[10px]">
              {badge}
            </span>
          ) : null}

          <span className="pointer-events-none absolute bottom-3 right-3 hidden size-9 items-center justify-center border border-ink/15 bg-paper/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:inline-flex">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="size-3.5"
            >
              <path
                d="M3 13 13 3M6 3h7v7"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
        </div>

        <div className="mt-3 md:mt-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[12.5px] font-medium leading-snug tracking-[-0.01em] text-ink md:text-[14px]">
              {product.name}
            </h3>
            <span className="shrink-0 text-[12.5px] leading-snug md:text-[14px]">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] uppercase tracking-[0.1em] text-ink-soft">
            {product.category ? <span>{product.category.name}</span> : null}
            <span aria-hidden="true" className="text-line">
              /
            </span>
            <AvailabilityLabel
              availability={product.availability}
              muted
              className="normal-case tracking-normal"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
