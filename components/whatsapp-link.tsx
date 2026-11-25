import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type WhatsAppLinkProps = {
  phone: string | null | undefined;
  message: string;
  label?: string;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  showIcon?: boolean;
};

export function WhatsAppLink({
  phone,
  message,
  label = "Order on WhatsApp",
  className,
  variant = "whatsapp",
  size = "default",
  showIcon = true,
}: WhatsAppLinkProps) {
  const url = buildWhatsAppUrl(phone, message);

  if (!url) {
    return (
      <Link
        href="/contact"
        className={cn(buttonVariants({ variant, size }), className)}
      >
        Contact the studio
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {showIcon ? <WhatsAppIcon className="size-4" /> : null}
      {label}
    </a>
  );
}
