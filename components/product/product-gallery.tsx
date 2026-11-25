"use client";

import Image from "next/image";
import { useState } from "react";
import type { CmsImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  productName,
}: {
  images: CmsImage[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div className="grid gap-3 md:grid-cols-[72px_1fr] lg:grid-cols-[80px_1fr]">
      <div className="order-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar md:order-1 md:flex-col md:overflow-visible md:pb-0">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View image ${index + 1} of ${images.length}`}
            aria-pressed={index === active}
            className={cn(
              "relative aspect-[4/5] w-16 shrink-0 overflow-hidden border bg-sand transition-opacity md:w-full",
              index === active
                ? "border-ink opacity-100"
                : "border-transparent opacity-55 hover:opacity-100",
            )}
          >
            <Image
              src={image.src}
              alt=""
              fill
              quality={60}
              sizes="80px"
              className="object-cover object-top"
            />
          </button>
        ))}
      </div>

      <div className="order-1 md:order-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority
            quality={86}
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-[center_22%]"
          />
          <span className="absolute bottom-3 right-3 bg-paper/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-ink backdrop-blur-sm">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-ink-soft md:hidden">
          Tap a thumbnail to view · {productName}
        </p>
      </div>
    </div>
  );
}
