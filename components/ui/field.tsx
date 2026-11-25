import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full border border-line bg-paper px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ink aria-[invalid=true]:border-danger";

export function Input({
  className,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input type={type} className={cn(fieldBase, "h-12", className)} {...props} />
  );
}

export function Textarea({
  className,
  rows = 5,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={cn(fieldBase, "min-h-32 resize-y", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, "h-12 cursor-pointer pr-8", className)} {...props}>
      {children}
    </select>
  );
}

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft",
        className,
      )}
      {...props}
    />
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 text-[13px] leading-snug text-danger" role="alert">
      {children}
    </p>
  );
}
