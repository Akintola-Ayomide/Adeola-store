import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 border-b border-line pb-5 md:flex-row md:items-end md:justify-between md:gap-10",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="eyebrow text-clay">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.75rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-ink-soft md:text-[14.5px]">
            {description}
          </p>
        ) : null}
      </div>

      {href ? (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 self-start border-b border-ink/30 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink md:self-auto"
        >
          {linkLabel}
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </Link>
      ) : null}
    </div>
  );
}
