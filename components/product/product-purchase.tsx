"use client";

import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { availabilityDescription, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { buildProductEnquiry, buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type ProductPurchaseProps = {
  product: Product;
  phone: string;
  productUrl: string;
};

export function ProductPurchase({
  product,
  phone,
  productUrl,
}: ProductPurchaseProps) {
  const [size, setSize] = useState<string | null>(null);
  const [colour, setColour] = useState<string | null>(null);

  const soldOut = product.availability === "out_of_stock";
  const message = buildProductEnquiry(product, {
    size,
    colour,
    url: productUrl,
  });
  const whatsappUrl = buildWhatsAppUrl(phone, message);
  const ctaLabel = soldOut ? "Join the waitlist" : "Order on WhatsApp";
  const shortCta = soldOut ? "Join waitlist" : "Order on WhatsApp";

  return (
    <>
      <div className="mt-6 space-y-5">
        {product.sizes.length > 0 ? (
          <fieldset>
            <legend className="flex w-full items-baseline justify-between gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Size
              </span>
              <span className="text-[11px] text-ink-soft" aria-live="polite">
                {size ?? "Select a size"}
              </span>
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setSize((current) => (current === option ? null : option))
                  }
                  aria-pressed={size === option}
                  className={cn(
                    "min-h-10 border px-3 py-2 text-[11.5px] transition-colors",
                    size === option
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper text-ink hover:border-ink",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {product.colours.length > 0 ? (
          <fieldset>
            <legend className="flex w-full items-baseline justify-between gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Colour
              </span>
              <span className="text-[11px] text-ink-soft" aria-live="polite">
                {colour ?? "Select a colour"}
              </span>
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {product.colours.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() =>
                    setColour((current) =>
                      current === option.name ? null : option.name,
                    )
                  }
                  aria-pressed={colour === option.name}
                  aria-label={`Colour: ${option.name}`}
                  title={option.name}
                  className={cn(
                    "inline-flex items-center gap-2 border px-2 py-1.5 text-[11.5px] transition-colors",
                    colour === option.name
                      ? "border-ink bg-paper text-ink"
                      : "border-line bg-paper text-ink-soft hover:border-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="size-4 border border-ink/15"
                    style={{ backgroundColor: option.hex }}
                  />
                  {option.name}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="border-t border-line pt-4">
          <p className="text-[12px] leading-relaxed text-ink-soft">
            {availabilityDescription(product.availability)}
          </p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  variant: soldOut ? "secondary" : "whatsapp",
                  size: "lg",
                }),
                "mt-4 w-full",
              )}
            >
              <WhatsAppIcon className="size-4" />
              {ctaLabel}
            </a>
          ) : (
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "mt-4 w-full",
              )}
            >
              Contact the studio
            </Link>
          )}

          <p className="mt-3 text-center text-[10px] leading-relaxed text-ink-soft/80">
            {whatsappUrl
              ? "You will be redirected to WhatsApp. This is an order enquiry — payment and delivery are confirmed with the studio."
              : "WhatsApp ordering is being set up. Send an enquiry through the contact form and the studio will reply."}
          </p>

          {product.sizes.length === 0 && product.colours.length === 0 ? (
            <p className="mt-3 text-center text-[11px] text-ink-soft">
              Sizing and finish are confirmed with the studio before any order
              is placed.
            </p>
          ) : null}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pb-[calc(0.7rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] uppercase tracking-[0.1em] text-ink-soft">
              {product.name}
            </p>
            <p className="mt-0.5 text-[14px] font-medium">
              {formatPrice(product.price)}
            </p>
          </div>
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: soldOut ? "secondary" : "whatsapp",
                size: "sm",
              })}
            >
              <WhatsAppIcon className="size-3.5" />
              {shortCta}
            </a>
          ) : (
            <Link
              href="/contact"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              Contact studio
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
