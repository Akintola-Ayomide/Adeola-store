"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="container-editorial flex min-h-[60vh] items-center py-16">
      <div className="max-w-xl">
        <AlertCircle className="size-7 text-clay" strokeWidth={1.5} />
        <p className="eyebrow mt-5 text-clay">Something went wrong</p>
        <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.98] tracking-[-0.03em]">
          We could not load
          <br />
          <em className="italic">this page.</em>
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
          This is usually temporary. Try again in a moment — if the problem
          continues, message the studio on WhatsApp and we will help.
        </p>

        <div className="mt-7 flex flex-col gap-2.5 xs:flex-row">
          <button
            type="button"
            onClick={reset}
            className={buttonVariants({ size: "lg" })}
          >
            <RotateCcw className="size-4" strokeWidth={1.5} />
            Try again
          </button>
          <Link
            href="/"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
