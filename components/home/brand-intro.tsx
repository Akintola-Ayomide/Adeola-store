import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { demoImages } from "@/lib/demo/images";

const principles = [
  {
    title: "Cloth first",
    copy: "Lace, aso-oke and wax print are chosen in person, for the way they fall and finish.",
  },
  {
    title: "A proper fit",
    copy: "Standard sizes can be adjusted to your measurements before the piece is cut.",
  },
  {
    title: "A real conversation",
    copy: "Sizing, styling and lead times are discussed with the studio on WhatsApp.",
  },
];

export function BrandIntro() {
  return (
    <section className="container-editorial py-14 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-clay">The house</p>
          <h2 className="mt-3 font-display text-[2.2rem] leading-[1.02] tracking-[-0.02em] md:text-[3rem]">
            A Yoruba name.
            <br />
            <em className="italic">A simple idea.</em>
          </h2>

          <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-ink-soft md:text-[14.5px]">
            <p>
              ÀRÌKÉ is a Yoruba name often understood as “one who is
              cherished” — a fitting name for clothes made to be kept and worn
              with pride.
            </p>
            <p>
              We make occasion wear for Nigerian women: aso-ebi for the wedding
              party, lace for the reception, aso-oke for the family matriarch,
              ankara for the woman who dresses for herself.
            </p>
          </div>

          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-ink"
          >
            Read our story
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>

          <dl className="mt-9 space-y-4 border-t border-line pt-5">
            {principles.map((principle, index) => (
              <div key={principle.title} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <dt className="text-[10px] font-semibold tracking-[0.14em] text-clay">
                  0{index + 1}
                </dt>
                <div>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.1em]">
                    {principle.title}
                  </dt>
                  <dd className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                    {principle.copy}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-7">
          <figure className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand md:aspect-[16/11]">
              <Image
                src={demoImages.patternTable.src}
                alt={demoImages.patternTable.alt}
                fill
                quality={84}
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-start justify-between gap-4 border-b border-line pb-3 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              <span>The ÀRÍKÉ atelier, Lagos</span>
              <span className="text-right">Cut · Fit · Finish</span>
            </figcaption>
          </figure>

          <div className="mt-7 grid grid-cols-2 gap-3 md:gap-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <Image
                src={demoImages.beadwork.src}
                alt={demoImages.beadwork.alt}
                fill
                quality={80}
                sizes="(max-width: 768px) 50vw, 29vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <Image
                src={demoImages.handSewing.src}
                alt={demoImages.handSewing.alt}
                fill
                quality={80}
                sizes="(max-width: 768px) 50vw, 29vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
