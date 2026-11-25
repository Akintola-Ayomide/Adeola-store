"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useTransition } from "react";
import { AVAILABILITY_OPTIONS, SORT_OPTIONS } from "@/lib/catalogue";
import type { Category, ProductFilters } from "@/lib/types";
import { cn } from "@/lib/utils";

type ShopControlsProps = {
  categories: Pick<Category, "id" | "name" | "slug">[];
  filters: ProductFilters;
  count: number;
};

function buildQuery(
  filters: ProductFilters,
  overrides: Partial<ProductFilters> = {},
) {
  const next = { ...filters, ...overrides };
  const params = new URLSearchParams();

  if (next.query?.trim()) params.set("q", next.query.trim());
  if (next.category) params.set("category", next.category);
  if (next.availability && next.availability !== "all") {
    params.set("availability", next.availability);
  }
  if (next.sort && next.sort !== "featured") params.set("sort", next.sort);

  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}

export function ShopControls({ categories, filters, count }: ShopControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const activeCategory = filters.category ?? "all";
  const activeAvailability = filters.availability ?? "all";
  const activeSort = filters.sort ?? "featured";

  function update(key: keyof ProductFilters, value: string) {
    const normalized = value === "all" || value === "featured" ? "" : value;
    const href = buildQuery(filters, { [key]: normalized });

    startTransition(() => {
      router.push(href, { scroll: false });
    });
  }

  const activeFilters: { key: keyof ProductFilters; label: string }[] = [];
  if (filters.query?.trim()) {
    activeFilters.push({
      key: "query",
      label: `Search: “${filters.query.trim()}”`,
    });
  }
  if (filters.category) {
    const category = categories.find(
      (item) => item.slug === filters.category,
    );
    activeFilters.push({
      key: "category",
      label: category?.name ?? "Category",
    });
  }
  if (filters.availability && filters.availability !== "all") {
    const availability = AVAILABILITY_OPTIONS.find(
      (item) => item.value === filters.availability,
    );
    activeFilters.push({
      key: "availability",
      label: availability?.label ?? "Availability",
    });
  }

  return (
    <div className="border-y border-line bg-paper">
      <div className="container-editorial">
        <div className="py-4 md:py-5">
          <form
            action={pathname}
            method="get"
            role="search"
            className="flex items-center gap-3 border-b border-ink/20 pb-2 transition-colors focus-within:border-ink"
          >
            <Search
              className="size-4 shrink-0 text-ink-soft"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <input
              id="shop-search"
              name="q"
              type="search"
              defaultValue={filters.query ?? ""}
              placeholder="Search by name, fabric or style"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-[14px] text-ink outline-none placeholder:text-ink-soft/60"
            />
            {filters.category ? (
              <input type="hidden" name="category" value={filters.category} />
            ) : null}
            {filters.availability && filters.availability !== "all" ? (
              <input
                type="hidden"
                name="availability"
                value={filters.availability}
              />
            ) : null}
            {filters.sort && filters.sort !== "featured" ? (
              <input type="hidden" name="sort" value={filters.sort} />
            ) : null}
            <button
              type="submit"
              className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-clay"
            >
              Search
            </button>
          </form>

          <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            <Link
              href={buildQuery(filters, { category: "" })}
              className={cn(
                "shrink-0 border px-3 py-2 text-[11px] font-medium transition-colors",
                activeCategory === "all"
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-transparent text-ink-soft hover:border-ink hover:text-ink",
              )}
              aria-current={activeCategory === "all" ? "page" : undefined}
            >
              All pieces
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={buildQuery(filters, { category: category.slug })}
                className={cn(
                  "shrink-0 border px-3 py-2 text-[11px] font-medium transition-colors",
                  activeCategory === category.slug
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-transparent text-ink-soft hover:border-ink hover:text-ink",
                )}
                aria-current={
                  activeCategory === category.slug ? "page" : undefined
                }
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-3.5 md:flex-row md:items-center md:justify-between">
          <p
            className="text-[11px] uppercase tracking-[0.12em] text-ink-soft"
            aria-live="polite"
          >
            {count === 1 ? "1 piece" : `${count} pieces`}
            {isPending ? (
              <span className="ml-2 inline-block size-1.5 animate-pulse rounded-full bg-clay align-middle" />
            ) : null}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="availability" className="sr-only">
              Filter by availability
            </label>
            <select
              id="availability"
              value={activeAvailability}
              onChange={(event) =>
                update("availability", event.target.value)
              }
              className="h-9 min-w-0 flex-1 cursor-pointer border border-line bg-paper px-2.5 text-[11px] text-ink outline-none focus:border-ink md:min-w-[10rem]"
            >
              {AVAILABILITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label htmlFor="sort" className="sr-only">
              Sort products
            </label>
            <select
              id="sort"
              value={activeSort}
              onChange={(event) => update("sort", event.target.value)}
              className="h-9 min-w-0 flex-1 cursor-pointer border border-line bg-paper px-2.5 text-[11px] text-ink outline-none focus:border-ink md:min-w-[11.5rem]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeFilters.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-line py-3">
            <span className="text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              Filtered by
            </span>
            {activeFilters.map((filter) => (
              <Link
                key={filter.key}
                href={buildQuery(filters, { [filter.key]: "" })}
                className="inline-flex items-center gap-1.5 border border-line bg-bone px-2.5 py-1.5 text-[11px] text-ink transition-colors hover:border-ink"
                aria-label={`Remove filter: ${filter.label}`}
              >
                {filter.label}
                <X className="size-3" strokeWidth={1.5} />
              </Link>
            ))}
            <Link
              href="/shop"
              className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clay underline-offset-4 hover:underline"
            >
              Clear all
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
