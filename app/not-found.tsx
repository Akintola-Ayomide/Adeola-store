import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { getSiteSettings } from "@/lib/data";
import { buildGeneralEnquiry } from "@/lib/whatsapp";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <div className="container-editorial flex min-h-[60vh] flex-col justify-center py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow text-clay">404 · Page not found</p>
        <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] tracking-[-0.035em]">
          This page has
          <br />
          <em className="italic">left the fitting room.</em>
        </h1>
        <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink-soft md:text-[15px]">
          The link may have changed, or the piece may no longer be in the
          catalogue. Start again from the shop, or ask the studio directly.
        </p>

        <div className="mt-8 flex flex-col gap-2.5 xs:flex-row">
          <Link href="/shop" className={buttonVariants({ size: "lg" })}>
            Shop the collection
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </Link>
          <WhatsAppLink
            phone={settings.whatsappPhone}
            message={buildGeneralEnquiry(
              "Hello ÀRÌKÉ, I followed a link that no longer works. Can you help me find the piece?",
            )}
            label="Ask the studio"
            variant="secondary"
            size="lg"
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-5 text-[12px] text-ink-soft">
          <Link href="/" className="link-underline hover:text-ink">
            Home
          </Link>
          <Link href="/collections" className="link-underline hover:text-ink">
            Collections
          </Link>
          <Link href="/about" className="link-underline hover:text-ink">
            Our story
          </Link>
          <Link href="/contact" className="link-underline hover:text-ink">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
