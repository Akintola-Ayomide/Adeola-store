import { availabilityLabels } from "@/lib/format";
import type { Availability } from "@/lib/types";
import { cn } from "@/lib/utils";

const dotStyles: Record<Availability, string> = {
  in_stock: "bg-forest",
  low_stock: "bg-clay",
  made_to_order: "bg-gold",
  out_of_stock: "bg-ink-soft/40",
};

export function AvailabilityLabel({
  availability,
  className,
  muted = false,
}: {
  availability: Availability;
  className?: string;
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] leading-none",
        muted ? "text-ink-soft" : "text-ink",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0 rounded-full", dotStyles[availability])}
      />
      {availabilityLabels[availability]}
    </span>
  );
}
