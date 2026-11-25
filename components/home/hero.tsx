import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { demoImages } from "@/lib/demo/images";
import type { SiteSettings } from "@/lib/types";
import { buildGeneralEnquiry } from "@/lib/whatsapp";

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative bg-ink">
      <div className="relative min-h-[36rem] overflow-hidden md:min-h-[42rem] lg:min-h-[45rem]">
        <Image
          src={demoImages.asoEbiParty.src}
          alt={demoImages.asoEbiParty.alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-[60%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/10 md:bg-gradient-to-r md:from-ink/55 md:via-ink/15 md:to-transparent"
        />

        <div className="container-editorial relative flex min-h-[36rem] items-end pb-8 pt-16 md:min-h-[42rem] md:items-center md:pb-0 lg:min-h-[45rem]">
          <div className="page-reveal w-full max-w-[33rem] border border-paper/15 bg-bone/95 p-6 backdrop-blur-md md:p-10 lg:bg-bone/93">
            <p className="eyebrow text-clay">
              Lagos atelier · Aso-ebi &amp; occasion wear
            </p>

            <h1 className="mt-5 font-display text-[clamp(2.65rem,6.8vw,4.9rem)] leading-[0.94] tracking-[-0.035em] text-ink">
              Dressed for the moments that{" "}
              <em className="italic text-clay">matter.</em>
            </h1>

            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink-soft md:text-[15px]">
              Considered Nigerian occasion wear for weddings, owambe and the
              celebrations in between. Made in Lagos, finished by hand, and
              chosen with you on WhatsApp.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 xs:flex-row">
              <Link
                href="/shop"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Shop the collection
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
              <WhatsAppLink
                phone={settings.whatsappPhone}
                message={buildGeneralEnquiry()}
                label="Order on WhatsApp"
                variant="secondary"
                size="lg"
                showIcon
              />
            </div>

            <p className="mt-5 text-[10px] uppercase tracking-[0.12em] text-ink-soft/80">
              Nationwide &amp; worldwide delivery · Made-to-order available
            </p>
          </div>
        </div>

        <p className="absolute right-5 top-5 hidden text-[9px] uppercase tracking-[0.2em] text-paper/70 md:block">
          Lagos · Nigeria
        </p>
      </div>
    </section>
  );
}
