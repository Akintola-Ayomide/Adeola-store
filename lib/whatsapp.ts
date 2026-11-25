import { formatPrice, availabilityLabels } from "./format";
import type { Product } from "./types";

/**
 * Convert the phone number stored in Sanity into the international format
 * used by wa.me. Nigerian local numbers (080...) are converted to 234...
 */
export function normalizeWhatsAppPhone(input?: string | null): string | null {
  if (!input) return null;

  const digits = input.replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith("234")) {
    return digits.length >= 12 && digits.length <= 15 ? digits : null;
  }

  if (digits.startsWith("0") && digits.length === 11) {
    return `234${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `234${digits}`;
  }

  // Other international numbers: accept a reasonable E.164-length value.
  if (digits.length >= 8 && digits.length <= 15) {
    return digits;
  }

  return null;
}

export function buildWhatsAppUrl(
  phone: string | null | undefined,
  message: string,
): string | null {
  const normalized = normalizeWhatsAppPhone(phone);
  if (!normalized) return null;

  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

type EnquiryOptions = {
  size?: string | null;
  colour?: string | null;
  url?: string | null;
};

/**
 * Builds an order-enquiry message. This is deliberately an enquiry, not an
 * order confirmation: payment, measurements and delivery are agreed on
 * WhatsApp with the studio.
 */
export function buildProductEnquiry(
  product: Pick<Product, "name" | "price" | "availability">,
  options: EnquiryOptions = {},
): string {
  const isWaitlist = product.availability === "out_of_stock";
  const isMadeToOrder = product.availability === "made_to_order";

  const lines = [
    `Hello ÀRÌKÉ,`,
    "",
    isWaitlist
      ? `I would like to join the waitlist for the ${product.name}.`
      : `I would like to enquire about the ${product.name}.`,
    `Price: ${formatPrice(product.price)}`,
    `Availability: ${availabilityLabels[product.availability]}`,
    `Size: ${options.size?.trim() || "To be confirmed"}`,
    `Colour: ${options.colour?.trim() || "To be confirmed"}`,
  ];

  if (options.url) lines.push(`Link: ${options.url}`);
  if (isMadeToOrder) lines.push("I understand this piece is made to order.");
  lines.push("", "Please confirm availability and next steps. Thank you.");

  return lines.join("\n");
}

export function buildContactWhatsAppMessage(input: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return [
    "Hello ÀRÌKÉ,",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");
}

export function buildGeneralEnquiry(
  message = "Hello ÀRÌKÉ, I would like some help choosing an outfit.",
): string {
  return message;
}
