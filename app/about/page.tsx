import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { buttonVariants } from "@/components/ui/button";
import { demoImages } from "@/lib/demo/images";
import { getSiteSettings } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";
import { buildGeneralEnquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "ÀRÌKÉ is a Lagos-based Nigerian occasion-wear label. Read about our approach to lace, aso-oke, ankara and iro & buba, and how we make each piece.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our story — ÀRÌKÉ",
    description:
      "Nigerian occasion wear, made in Lagos. Our approach to cloth, fit and personal service.",
    url: "/about",
    images: [{ url: demoImages.atelier.src, alt: demoImages.atelier.alt }],
  },
};

const principles = [
  {
    title: "Considered cloth",
    copy: "We choose lace for its hand, aso-oke for its weight and wax print for the way the pattern sits across the body. The fabric comes first; the silhouette follows.",
  },
  {
    title: "A modern fit",
    copy: "Traditional shapes are re-cut for the way women move today — a cleaner shoulder, a softer waist, a skirt that walks. Standard sizes can be adjusted to your measurements.",
  },
  {
    title: "A personal finish",
    copy: "Beading, finishing and final checks happen in the Lagos studio. You speak to the people making your piece, not a call centre.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your piece",
    copy: "Browse the collection or send the studio a reference. We will confirm what is available, what can be made and the realistic timeline.",
  },
  {
    number: "02",
    title: "Confirm on WhatsApp",
    copy: "Size, colour, fabric and delivery are agreed in one conversation. Made-to-measure pieces start with your measurements.",
  },
  {
    number: "03",
    title: "Made & delivered",
    copy: "Your piece is cut and finished in Lagos, checked by the studio, then dispatched nationwide or internationally.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <article>
        <header className="container-editorial pb-8 pt-8 md:pb-12 md:pt-14">
          <p className="eyebrow text-clay">Our story</p>
          <div className="mt-4 grid gap-7 md:grid-cols-12 md:items-end md:gap-12">
            <h1 className="font-display text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.93] tracking-[-0.035em] md:col-span-8">
              A love letter to Nigerian craft,
              <br />
              <em className="italic">made to be worn.</em>
            </h1>
            <p className="max-w-sm text-[13.5px] leading-relaxed text-ink-soft md:col-span-4 md:text-[14.5px]">
              ÀRÌKÉ is a Lagos-based occasion-wear label for women who dress
              with intention — for weddings, owambe, family celebrations and the
              moments that deserve more than something off a rail.
            </p>
          </div>

          <div className="relative mt-8 aspect-[4/5] overflow-hidden bg-sand sm:aspect-[16/10] md:mt-10 md:aspect-[2/1]">
            <Image
              src={demoImages.beadwork.src}
              alt={demoImages.beadwork.alt}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </header>

        <section className="container-editorial border-t border-line py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-clay">The name</p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] md:text-[2.7rem]">
                “One who is cherished.”
              </h2>
            </div>
            <div className="space-y-5 text-[14px] leading-relaxed text-ink-soft md:col-span-7 md:col-start-6 md:text-[15px]">
              <p>
                ÀRÌKÉ is a Yoruba name often understood as “one who is
                cherished” — the child who is looked after, dressed well and
                sent out into the world with pride. It felt like the right name
                for clothes made for women who deserve to feel exactly that.
              </p>
              <p>
                The premise is simple: Nigerian occasion wear can be
                mass-produced and forgettable, or beautiful but hard to access.
                ÀRÌKÉ is the middle path — considered pieces, rooted in Nigerian
                textile traditions, made in Lagos and available without a plane
                ticket.
              </p>
              <p>
                We work with lace, handwoven aso-oke, wax print and fluid crepe.
                We keep the shapes modern and the finish traditional:
                hand-beading, proper lining, seams that hold. The result is
                clothing that can be worn to a wedding on Saturday and kept for
                the next generation.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-paper">
          <div className="container-editorial py-12 md:py-20">
            <div className="grid gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={demoImages.atelier.src}
                    alt={demoImages.atelier.alt}
                    fill
                    quality={84}
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 border-b border-line pb-3 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  The studio, Lagos · Cut, fit, finish
                </p>
              </div>

              <div className="md:col-span-6 md:col-start-7 md:pt-8">
                <p className="eyebrow text-clay">The approach</p>
                <h2 className="mt-3 font-display text-[2.2rem] leading-[1.03] md:text-[3rem]">
                  Rooted in tradition.
                  <br />
                  <em className="italic">Cut for now.</em>
                </h2>
                <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-ink-soft md:text-[14.5px]">
                  <p>
                    Traditional Nigerian dressing is not costume. It is a living
                    language of cloth, colour and occasion. Aso-oke carries the
                    history of Yoruba handweaving; lace speaks to the ceremony of
                    weddings and receptions; ankara holds everyday memory.
                  </p>
                  <p>
                    We treat those references with respect, then cut them for the
                    woman wearing them today. A fitted bodice, a considered
                    neckline, a hem that works with the shoes she already owns.
                  </p>
                </div>

                <dl className="mt-8 space-y-5 border-t border-line pt-6">
                  {principles.map((principle, index) => (
                    <div
                      key={principle.title}
                      className="grid grid-cols-[1.5rem_1fr] gap-3"
                    >
                      <dt className="text-[10px] font-semibold tracking-[0.14em] text-clay">
                        0{index + 1}
                      </dt>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                          {principle.title}
                        </dt>
                        <dd className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                          {principle.copy}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="container-editorial py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow text-clay">How it works</p>
              <h2 className="mt-3 font-display text-[2.2rem] leading-[1.03] md:text-[3rem]">
                From conversation
                <br />
                <em className="italic">to celebration.</em>
              </h2>
              <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-soft">
                There is no online checkout. Every order starts with a
                conversation, so you know exactly what you are getting and when.
              </p>
              <WhatsAppLink
                phone={settings.whatsappPhone}
                message={buildGeneralEnquiry(
                  "Hello ÀRÌKÉ, I would like to start an order or ask about a piece.",
                )}
                label="Start a conversation"
                size="lg"
                className="mt-6"
              />
            </div>

            <div className="md:col-span-7">
              <ol className="border-t border-line">
                {steps.map((step) => (
                  <li
                    key={step.number}
                    className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-6 md:grid-cols-[3rem_1fr] md:gap-5"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.12em] text-clay">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.4rem] leading-tight md:text-[1.6rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink-soft">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-paper">
          <div className="container-editorial grid gap-2 py-2 sm:grid-cols-3">
            {[demoImages.handSewing, demoImages.redBeadwork, demoImages.boutique].map(
              (image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative aspect-[4/3] overflow-hidden bg-sand"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>
        </section>

        <section className="container-editorial py-14 md:py-20">
          <div className="grid items-center gap-6 border border-line bg-paper p-7 md:grid-cols-12 md:p-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-clay">Your next celebration</p>
              <h2 className="mt-3 font-display text-[2.1rem] leading-[1.02] md:text-[3rem]">
                Let&apos;s make something
                <br />
                <em className="italic">worth keeping.</em>
              </h2>
              <p className="mt-4 max-w-lg text-[13.5px] leading-relaxed text-ink-soft">
                Tell us the date, the dress code and the feeling you want. We
                will help you find the right piece or make it to your
                measurements.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 md:col-span-5 md:items-end">
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
                label="Chat on WhatsApp"
                variant="secondary"
                size="lg"
              />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
