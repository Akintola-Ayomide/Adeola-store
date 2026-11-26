"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import type { Category, SiteSettings } from "@/lib/types";
import { buildGeneralEnquiry, buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/shop", label: "Shop", matches: ["/shop", "/product"] },
  { href: "/collections", label: "Collections", matches: ["/collections"] },
  { href: "/about", label: "About", matches: ["/about"] },
  { href: "/contact", label: "Contact", matches: ["/contact"] },
];

function isActive(pathname: string, matches: string[]) {
  return matches.some(
    (match) => pathname === match || pathname.startsWith(`${match}/`),
  );
}

type SiteHeaderProps = {
  settings: SiteSettings;
  categories: Pick<Category, "id" | "name" | "slug">[];
};

export function SiteHeader({ settings, categories }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const whatsappUrl =
    buildWhatsAppUrl(settings.whatsappPhone, buildGeneralEnquiry()) ?? null;

  useEffect(() => {
    // Close any open overlay on navigation; the dialogs' onClose handlers
    // keep the React state in sync.
    menuRef.current?.close();
    searchRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const dialog = menuRef.current;
    if (!dialog) return;

    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  useEffect(() => {
    const dialog = searchRef.current;
    if (!dialog) return;

    if (searchOpen && !dialog.open) {
      dialog.showModal();
      window.setTimeout(() => searchInputRef.current?.focus(), 30);
    }
    if (!searchOpen && dialog.open) dialog.close();
  }, [searchOpen]);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bone/92 backdrop-blur-md supports-[backdrop-filter]:bg-bone/80">
        <div className="container-editorial">
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-20">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="-ml-2 inline-flex size-10 items-center justify-center text-ink md:hidden"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
              >
                <span className="flex flex-col gap-[5px]">
                  <span className="block h-px w-6 bg-current" />
                  <span className="block h-px w-6 bg-current" />
                  <span className="block h-px w-4 bg-current" />
                </span>
              </button>

              <nav aria-label="Main navigation" className="hidden md:block">
                <ul className="flex items-center gap-7">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "link-underline text-[12px] font-medium tracking-[0.02em] text-ink/80 transition-colors hover:text-ink",
                          isActive(pathname, item.matches) &&
                            "text-ink after:scale-x-100 after:origin-left",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <Link
              href="/"
              aria-label={`${settings.boutiqueName} — home`}
              className="justify-self-center font-display text-[22px] uppercase leading-none tracking-[0.24em] text-ink md:text-[26px] md:tracking-[0.3em]"
            >
              {settings.boutiqueName}
            </Link>

            <div className="flex items-center justify-end gap-1.5 md:gap-4">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex size-10 items-center justify-center text-ink transition-opacity hover:opacity-60"
                aria-label="Search products"
              >
                <Search className="size-[18px]" strokeWidth={1.5} />
              </button>

              <a
                href={whatsappUrl ?? "/contact"}
                {...(whatsappUrl
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="hidden items-center gap-2 border-l border-line pl-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-clay lg:inline-flex"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <dialog
        ref={menuRef}
        onClose={() => setMenuOpen(false)}
        onCancel={() => setMenuOpen(false)}
        aria-label="Navigation menu"
        className="dialog-backdrop m-0 h-dvh max-h-none w-screen max-w-none bg-bone p-0 text-ink"
      >
        <div className="flex min-h-dvh flex-col">
          <div className="container-editorial flex h-16 items-center justify-between border-b border-line">
            <Link
              href="/"
              className="font-display text-[22px] uppercase tracking-[0.24em]"
              onClick={() => setMenuOpen(false)}
            >
              {settings.boutiqueName}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="-mr-2 inline-flex size-10 items-center justify-center"
              aria-label="Close navigation menu"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="container-editorial flex flex-1 flex-col py-8">
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="font-display text-[2.4rem] leading-none">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.16em] text-ink-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-10">
              <p className="eyebrow text-ink-soft">Shop by category</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`/shop?category=${encodeURIComponent(category.slug)}`}
                    onClick={() => setMenuOpen(false)}
                    className="border border-line px-3 py-2 text-[12px] text-ink"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <a
                href={whatsappUrl ?? "/contact"}
                {...(whatsappUrl
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={cn(buttonVariants({ variant: "whatsapp" }), "mt-8 w-full")}
              >
                <WhatsAppIcon className="size-4" />
                Order on WhatsApp
              </a>

              <p className="mt-4 text-center text-[12px] text-ink-soft">
                {settings.address || "Lagos, Nigeria"}
              </p>
            </div>
          </div>
        </div>
      </dialog>

      {/* Search overlay */}
      <dialog
        ref={searchRef}
        onClose={() => setSearchOpen(false)}
        onCancel={() => setSearchOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSearchOpen(false);
        }}
        aria-label="Search products"
        className="dialog-backdrop m-auto w-[min(92vw,42rem)] bg-transparent p-0"
      >
        <div className="dialog-inner bg-paper p-6 text-ink shadow-none md:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow text-clay">Search the boutique</p>
              <p className="mt-2 font-display text-2xl">
                What are you dressing for?
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="-mr-2 -mt-2 inline-flex size-10 items-center justify-center"
              aria-label="Close search"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <form
            action="/shop"
            method="get"
            role="search"
            className="mt-7"
            onSubmit={() => setSearchOpen(false)}
          >
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <div className="flex items-center gap-3 border-b border-ink pb-3">
              <Search className="size-5 shrink-0 text-ink-soft" strokeWidth={1.5} />
              <input
                ref={searchInputRef}
                id="site-search"
                name="q"
                type="search"
                placeholder="Try “emerald lace” or “aso-oke”"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-soft/60"
              />
              <button
                type="submit"
                className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-clay"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="eyebrow text-ink-soft">Popular right now</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${encodeURIComponent(category.slug)}`}
                  onClick={() => setSearchOpen(false)}
                  className="border border-line bg-bone/60 px-3 py-2 text-[12px] transition-colors hover:border-ink"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/shop?sort=price-asc"
                onClick={() => setSearchOpen(false)}
                className="border border-line bg-bone/60 px-3 py-2 text-[12px] transition-colors hover:border-ink"
              >
                Lowest price first
              </Link>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
