import type { Availability } from "./types";

export function formatPrice(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return "Price on request";
  }

  return `₦${new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export const availabilityLabels: Record<Availability, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Sold out",
  made_to_order: "Made to order",
};

export function availabilityDescription(availability: Availability): string {
  switch (availability) {
    case "in_stock":
      return "Ready to dispatch from our Lagos studio.";
    case "low_stock":
      return "Limited pieces remaining. Confirm availability on WhatsApp.";
    case "out_of_stock":
      return "This piece is currently sold out. Join the waitlist and we will let you know when it returns.";
    case "made_to_order":
      return "Made to order in your size. Lead time is confirmed on WhatsApp before you commit.";
  }
}

export function isPurchasable(availability: Availability): boolean {
  return availability !== "out_of_stock";
}

export function pluralise(count: number, singular: string, plural?: string) {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}
