import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { getSiteSettings } from "@/lib/data";
import { breadcrumbJsonLd } from "@/lib/seo";
import { buildGeneralEnquiry, buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact the studio",
  description:
    "Ask ÀRÌKÉ about availability, sizing, aso-ebi group orders and delivery. Send an enquiry or message the Lagos studio on WhatsApp.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact the studio — ÀRÌKÉ",
    description:
      "Availability, sizing, group orders and delivery. We reply personally on WhatsApp.",
    url: "/contact",
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const instagram =
    settings.socialLinks.find((link) =>
      link.label.toLowerCase().includes("instagram"),
    )?.url || settings.instagramUrl;

  const whatsappUrl = buildWhatsAppUrl(
    settings.whatsappPhone,
    buildGeneralEnquiry(
      "Hello ÀRÌKÉ, I would like to ask about an outfit or an order.",
    ),
  );

  const mapUrl = settings.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`
    : null;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <div className="container-editorial pb-16 pt-9 md:pb-24 md:pt-14">
        <header className="max-w-3xl">
          <p className="eyebrow text-clay">Get in touch</p>
          <h1 className="mt-4 font-display text-[clamp(2.7rem,6.8vw,5rem)] leading-[0.96] tracking-[-0.035em]">
            Let&apos;s talk about
            <br />
            <em className="italic">what you&apos;re wearing.</em>
          </h1>
          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-ink-soft md:text-[15px]">
            Every order begins with a conversation. Tell us the occasion, your
            date and the look you have in mind — we will come back with
            availability, sizing and next steps.
          </p>
        </header>

        <div className="mt-10 grid gap-10 border-t border-line pt-9 md:mt-14 md:grid-cols-12 md:gap-14 md:pt-12">
          <div className="md:col-span-7">
            <EnquiryForm />
            {settings.demoContent ? (
              <p className="mt-4 max-w-xl text-[11px] leading-relaxed text-ink-soft">
                Demo notice: no inbox is connected in this build. Unless a
                delivery webhook is configured, the form will offer to hand
                your message over to WhatsApp — it will not claim to have sent
                an email.
              </p>
            ) : null}
          </div>

          <aside className="md:col-span-5">
            <div className="border border-line bg-paper p-6 md:p-8">
              <p className="eyebrow text-clay">Faster reply</p>
              <h2 className="mt-2 font-display text-[1.8rem] leading-tight">
                Order on WhatsApp
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                Share your size, colour and the product link in one message.
                We confirm stock, measurements and delivery before any payment.
              </p>
              <WhatsAppLink
                phone={settings.whatsappPhone}
                message={buildGeneralEnquiry()}
                label="Message the studio"
                size="lg"
                className="mt-6 w-full"
              />

              <div className="mt-7 space-y-4 border-t border-line pt-6">
                {whatsappUrl ? (
                  <div className="flex gap-3">
                    <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-forest" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                        WhatsApp
                      </p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block break-all text-[13px] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {settings.whatsappPhone}
                      </a>
                    </div>
                  </div>
                ) : null}

                {settings.contactEmail ? (
                  <div className="flex gap-3">
                    <Mail
                      className="mt-0.5 size-4 shrink-0 text-ink-soft"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                        Email
                      </p>
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="mt-1 inline-block break-all text-[13px] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                ) : null}

                {settings.address ? (
                  <div className="flex gap-3">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-ink-soft"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                        Studio
                      </p>
                      {mapUrl ? (
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-[13px] leading-relaxed text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                        >
                          {settings.address}
                        </a>
                      ) : (
                        <p className="mt-1 text-[13px] leading-relaxed">
                          {settings.address}
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}

                {settings.businessHours.length > 0 ? (
                  <div className="flex gap-3">
                    <Clock3
                      className="mt-0.5 size-4 shrink-0 text-ink-soft"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                        Studio hours
                      </p>
                      <div className="mt-1 space-y-0.5 text-[13px] text-ink">
                        {settings.businessHours.map((entry) => (
                          <p key={`${entry.days}-${entry.hours}`}>
                            <span className="text-ink-soft">{entry.days}:</span>{" "}
                            {entry.hours}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {instagram ? (
                  <div className="flex gap-3">
                    <InstagramIcon
                      className="mt-0.5 size-4 shrink-0 text-ink-soft"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                        Instagram
                      </p>
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-[13px] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        {settings.instagramHandle || "Follow the studio"}
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-5 border border-line p-6">
              <MessageCircle
                className="size-5 text-clay"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-3 font-display text-xl">
                Before you write
              </h2>
              <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-ink-soft">
                <li>The occasion and, if you have one, the date.</li>
                <li>Your usual size or measurements for made-to-order pieces.</li>
                <li>A colour or fabric preference, even if it is flexible.</li>
                <li>The product link, if you have already found something.</li>
              </ul>
              <Link
                href="/customer-care"
                className="group mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink"
              >
                Read delivery &amp; care
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
