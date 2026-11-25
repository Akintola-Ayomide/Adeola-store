import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-line bg-paper px-2 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-ink",
        className,
      )}
      {...props}
    />
  );
}

export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-1.5 shrink-0 rounded-full", className)}
    />
  );
}
