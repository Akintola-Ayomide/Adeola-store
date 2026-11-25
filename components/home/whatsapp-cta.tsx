import { WhatsAppLink } from "@/components/whatsapp-link";
import { buildGeneralEnquiry } from "@/lib/whatsapp";
import type { SiteSettings } from "@/lib/types";

export function WhatsAppCta({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-clay text-paper">
      <div className="container-editorial py-14 md:py-20">
        <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-paper/65">Personal service</p>
            <h2 className="mt-3 max-w-2xl font-display text-[2.25rem] leading-[1.02] tracking-[-0.02em] md:text-[3.4rem]">
              Tell us the occasion.
              <br />
              <em className="italic">We&apos;ll help with the outfit.</em>
            </h2>
            <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-paper/75 md:text-[14.5px]">
              Send the date, the dress code and a little about the celebration.
              We&apos;ll suggest pieces, confirm availability and talk through
              measurements — all in one WhatsApp conversation.
            </p>
          </div>

          <div className="md:col-span-4 md:justify-self-end">
            <WhatsAppLink
              phone={settings.whatsappPhone}
              message={buildGeneralEnquiry(
                "Hello ÀRÌKÉ, I would like help choosing an outfit. The occasion is:",
              )}
              label="Start a WhatsApp chat"
              variant="light"
              size="lg"
              className="w-full md:w-auto"
            />
            <p className="mt-4 max-w-xs text-[11px] leading-relaxed text-paper/55">
              No checkout required. Nothing is confirmed until you speak with
              the studio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
