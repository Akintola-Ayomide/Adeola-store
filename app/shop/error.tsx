"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShopError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-editorial py-20 md:py-28">
      <div className="max-w-xl border border-line bg-paper p-7 md:p-10">
        <p className="eyebrow text-clay">Something went wrong</p>
        <h1 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
          The catalogue didn&apos;t load.
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          This is usually temporary. Try loading the pieces again — if it
          persists, contact the studio and we will help directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Button onClick={reset}>
            <RotateCcw className="size-4" strokeWidth={1.5} />
            Try again
          </Button>
          <a
            href="/contact"
            className="inline-flex h-12 items-center border border-ink px-6 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
          >
            Contact the studio
          </a>
        </div>
      </div>
    </div>
  );
}
