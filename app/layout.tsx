import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/announcement-bar";
import { DemoRibbon } from "@/components/demo-ribbon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories, getCollections, getSiteSettings } from "@/lib/data";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ÀRÌKÉ — Nigerian occasion wear, made in Lagos",
    template: "%s — ÀRÌKÉ",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Nigerian fashion boutique",
    "aso-ebi",
    "aso-oke",
    "ankara dresses",
    "lace gowns Nigeria",
    "iro and buba",
    "Lagos fashion",
    "Nigerian wedding guest outfits",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: SITE_NAME,
    title: "ÀRÌKÉ — Nigerian occasion wear, made in Lagos",
    description: SITE_DESCRIPTION,
    url: "/",
    // Images are provided by app/opengraph-image.tsx via Next.js file
    // conventions, so no hard-coded asset path can go stale.
  },
  twitter: {
    card: "summary_large_image",
    title: "ÀRÌKÉ — Nigerian occasion wear, made in Lagos",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, categories, collections] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getCollections(),
  ]);

  return (
    <html
      lang="en-NG"
      className={`${display.variable} ${sans.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col bg-bone text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-ink focus:px-4 focus:py-3 focus:text-[12px] focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-paper"
        >
          Skip to content
        </a>

        {settings.demoContent ? <DemoRibbon /> : null}
        <AnnouncementBar settings={settings} />
        <SiteHeader settings={settings} categories={categories} />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <SiteFooter
          settings={settings}
          categories={categories}
          collections={collections}
        />
      </body>
    </html>
  );
}
