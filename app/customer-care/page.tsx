import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SizeGuide } from "@/components/size-guide";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { getSiteSettings } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";
import { buildGeneralEnquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Delivery, sizing & care",
  description:
    "How ordering works at ÀRÌKÉ: WhatsApp confirmation, sizing, nationwide and international delivery, and how to care for lace, aso-oke and ankara.",
  alternates: { canonical: "/customer-care" },
  openGraph: {
    title: "Delivery, sizing & care — ÀRÌKÉ",
    description:
      "Ordering, delivery, made-to-measure and garment care, explained plainly.",
    url: "/customer-care",
  },
};

const sections = [
  {
    id: "ordering",
    label: "01",
    title: "Ordering & payment",
    copy: "There is no online checkout. Add a piece to your WhatsApp enquiry with the size and colour you want, and the studio replies with availability and a total. Measurements, payment method and delivery are agreed in that conversation before anything is made or dispatched.",
    detail:
      "Ready-to-wear pieces can be reserved while stock lasts. Made-to-order pieces begin only after the details are confirmed on WhatsApp.",
  },
  {
    id: "delivery",
    label: "02",
    title: "Delivery",
    copy: "Orders within Nigeria are dispatched by a tracked courier to the address you confirm on WhatsApp. International orders are quoted individually, including the shipping cost and any customs duties applicable to your country.",
    detail:
      "A tracking reference is shared when the parcel is handed over. Delivery dates are estimates confirmed by the studio, not a promise generated at checkout.",
  },
  {
    id: "made-to-measure",
    label: "03",
    title: "Made to measure",
    copy: "For beaded lace, aso-oke and bridal pieces, the studio takes your measurements and agrees the neckline, sleeve and hem before cutting. A fitting can be arranged in Lagos or by video for clients based elsewhere.",
    detail:
      "Timelines depend on the amount of hand-beading and the cloth available. Ask for a realistic date before you commit to an occasion.",
  },
  {
    id: "returns",
    label: "04",
    title: "Exchanges & returns",
    copy: "Please check your piece on arrival and report any damage or sizing error to the studio within 48 hours, with photographs. Faulty items will be repaired or replaced where possible. Made-to-measure and hand-beaded pieces cannot be returned simply for a change of mind.",
    detail:
      "Unworn ready-to-wear pieces may be eligible for exchange. Confirm the exact terms with the studio before sending anything back.",
  },
];

const care = [
  {
    title: "Lace & beading",
    copy: "Dry clean only. Fold with tissue between beaded layers and store flat or hanging by a padded hanger. Avoid perfume and hairspray directly on the surface.",
  },
  {
    title: "Aso-oke",
    copy: "Spot clean where possible and use a specialist cleaner for the full garment. Keep away from direct sunlight when stored, and press on the reverse with a low heat.",
  },
  {
    title: "Ankara & crepe",
    copy: "Hand wash cold with a mild detergent and dry in the shade. Press on the reverse so the print stays bright. Do not tumble dry.",
  },
  {
    title: "Storage",
    copy: "Use a breathable garment bag, not plastic, for long-term storage. Keep beadwork uncompressed and let heavy gowns rest between wears.",
  },
];

export default async function CustomerCarePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Customer care", path: "/customer-care" },
        ])}
      />

      <div className="container-editorial pb-16 pt-9 md:pb-24 md:pt-14">
        <header className="max-w-3xl">
          <p className="eyebrow text-clay">Customer care</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6.4vw,4.8rem)] leading-[0.97] tracking-[-0.035em]">
            The practical details,
            <br />
            <em className="italic">without the small print.</em>
          </h1>
          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-ink-soft md:text-[15px]">
            Ordering a celebration outfit should feel simple. Here is exactly
            how we work — from the first WhatsApp message to the day you wear
            it.
          </p>
          {settings.demoContent ? (
            <p className="mt-4 max-w-xl border-l-2 border-clay pl-4 text-[12px] leading-relaxed text-ink-soft">
              Demo content: these terms are illustrative for this sample
              boutique. Confirm and replace them with your real policy before
              launch.
            </p>
          ) : null}
        </header>

        <div className="mt-12 border-t border-line md:mt-16">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-12 md:py-11"
            >
              <div className="md:col-span-3">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-clay">
                  {section.label}
                </p>
                <h2 className="mt-2 font-display text-[1.7rem] leading-tight md:text-[2rem]">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-3 text-[13.5px] leading-relaxed text-ink-soft md:col-span-8 md:col-start-5 md:text-[14px]">
                <p>{section.copy}</p>
                <p className="text-[12.5px]">{section.detail}</p>
              </div>
            </section>
          ))}
        </div>

        <section
          id="size-guide"
          className="mt-12 grid gap-8 scroll-mt-28 md:mt-16 md:grid-cols-12 md:gap-14"
        >
          <div className="md:col-span-4">
            <p className="eyebrow text-clay">Size & fit</p>
            <h2 className="mt-3 font-display text-[2rem] leading-tight md:text-[2.6rem]">
              Find your fit.
            </h2>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-soft">
              Sizes vary between cloth and silhouette. Use the table as a
              starting point, then let the studio confirm the best fit for the
              piece you love.
            </p>
            <WhatsAppLink
              phone={settings.whatsappPhone}
              message={buildGeneralEnquiry(
                "Hello ÀRÌKÉ, can you help me choose the right size?",
              )}
              label="Ask about sizing"
              variant="secondary"
              className="mt-6"
            />
          </div>
          <div className="md:col-span-8">
            <SizeGuide />
          </div>
        </section>

        <section className="mt-12 border-t border-line pt-9 md:mt-16 md:pt-12">
          <div className="grid gap-9 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-4">
              <p className="eyebrow text-clay">Aftercare</p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight md:text-[2.6rem]">
                Keep it beautiful.
              </h2>
              <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-soft">
                A little care goes a long way with heavily embroidered and
                handwoven cloth. If you are unsure, ask us before cleaning.
              </p>
            </div>
            <div className="grid gap-px bg-line md:col-span-8 sm:grid-cols-2">
              {care.map((item) => (
                <div key={item.title} className="bg-bone p-6 md:p-7">
                  <h3 className="font-display text-[1.3rem]">{item.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 border border-line bg-paper p-7 md:mt-16 md:p-10">
          <div className="grid items-center gap-7 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-clay">Still need help?</p>
              <h2 className="mt-3 font-display text-[2rem] leading-tight md:text-[2.6rem]">
                Ask the studio directly.
              </h2>
              <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-ink-soft">
                We would rather answer a question before you order than after.
                Send a message and we will get back to you personally.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 md:col-span-5 md:items-end">
              <WhatsAppLink
                phone={settings.whatsappPhone}
                message={buildGeneralEnquiry()}
                label="Chat on WhatsApp"
                size="lg"
              />
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink"
              >
                Send an enquiry form
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
