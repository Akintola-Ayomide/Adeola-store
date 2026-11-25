import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
