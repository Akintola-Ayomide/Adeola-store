export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_NAME = "ÀRÌKÉ";
export const SITE_DESCRIPTION =
  "Nigerian occasion wear, aso-ebi and traditional couture, made in Lagos. Shop lace gowns, aso-oke, ankara and iro and buba, with personal ordering on WhatsApp.";
