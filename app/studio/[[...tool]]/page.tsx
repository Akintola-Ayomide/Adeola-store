import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { StudioClient } from "@/components/studio/studio-client";
import { buttonVariants } from "@/components/ui/button";
import { isSanityConfigured } from "@/lib/sanity/env";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="container-editorial flex min-h-[65vh] items-center py-16">
        <div className="max-w-2xl">
          <LockKeyhole
            className="size-7 text-clay"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="eyebrow mt-5 text-clay">Setup required</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.98] tracking-[-0.03em]">
            Connect Sanity to
            <br />
            <em className="italic">open the studio.</em>
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
            This demo runs on local sample content. To edit products and site
            details, create a Sanity project and add its credentials to your
            environment, then restart the dev server.
          </p>

          <ol className="mt-7 space-y-3 border-t border-line pt-6 text-[13px] leading-relaxed text-ink-soft">
            <li>
              <span className="font-semibold text-ink">1.</span> Add{" "}
              <code className="bg-sand px-1.5 py-0.5 text-[12px]">
                NEXT_PUBLIC_SANITY_PROJECT_ID
              </code>{" "}
              and{" "}
              <code className="bg-sand px-1.5 py-0.5 text-[12px]">
                NEXT_PUBLIC_SANITY_DATASET
              </code>{" "}
              to <code className="bg-sand px-1.5 py-0.5 text-[12px]">.env.local</code>.
            </li>
            <li>
              <span className="font-semibold text-ink">2.</span> Restart the
              server and sign in at <code className="bg-sand px-1.5 py-0.5 text-[12px]">/studio</code>.
            </li>
            <li>
              <span className="font-semibold text-ink">3.</span> Run{" "}
              <code className="bg-sand px-1.5 py-0.5 text-[12px]">npm run seed</code>{" "}
              with a write token to load the sample catalogue.
            </li>
          </ol>

          <div className="mt-7 flex flex-col gap-2.5 xs:flex-row">
            <Link href="/" className={buttonVariants({ size: "lg" })}>
              Back to the boutique
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Contact support
            </Link>
          </div>

          <p className="mt-6 max-w-xl text-[11.5px] leading-relaxed text-ink-soft">
            Full instructions are in{" "}
            <code className="bg-sand px-1.5 py-0.5 text-[12px]">
              docs/SANITY-SETUP.md
            </code>
            . Never commit your Sanity tokens.
          </p>
        </div>
      </div>
    );
  }

  return <StudioClient />;
}
