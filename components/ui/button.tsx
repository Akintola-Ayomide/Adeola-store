import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border text-center transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-3",
  {
    variants: {
      variant: {
        primary:
          "border-ink bg-ink text-paper hover:border-clay-dark hover:bg-clay-dark",
        secondary:
          "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        outlineLight:
          "border-paper/45 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-ink",
        light: "border-paper bg-paper text-ink hover:border-clay-soft hover:bg-clay-soft",
        whatsapp:
          "border-forest bg-forest text-paper hover:border-[#162d24] hover:bg-[#162d24]",
        ghost: "border-transparent bg-transparent text-ink hover:bg-sand",
        clay: "border-clay bg-clay text-paper hover:border-clay-dark hover:bg-clay-dark",
      },
      size: {
        sm: "h-10 px-4 text-[10px] font-semibold uppercase tracking-[0.16em]",
        default:
          "h-12 px-6 text-[11px] font-semibold uppercase tracking-[0.16em]",
        lg: "h-14 px-8 text-[11px] font-semibold uppercase tracking-[0.16em]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
