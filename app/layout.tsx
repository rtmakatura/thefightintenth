import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { bookQuery, siteSettingsQuery } from "@/lib/sanity/queries";
import type { Book, SiteSettings } from "@/lib/sanity/types";

const SITE_URL = "https://michaelmakatura.com";
const FALLBACK_OG_IMAGE =
  "https://images.squarespace-cdn.com/content/v1/68c98d6e69ed0e162cce3f00/76863b32-70dd-4157-baa0-33e41bb1362f/Cover+Finalist.png";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, book] = await Promise.all([
    sanityFetch<SiteSettings | null>(siteSettingsQuery),
    sanityFetch<Book | null>(bookQuery),
  ]);

  const title = settings?.title ?? "The Fightin' Tenth";
  const description =
    settings?.subtitle ??
    "A memoir of the 10th Tactical Fighter Squadron — Cold War to Desert Storm.";

  const ogImageUrl = book?.coverImage
    ? urlFor(book.coverImage)
        .width(1200)
        .height(630)
        .fit("fillmax")
        .bg("141418")
        .url()
    : FALLBACK_OG_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: title,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — book cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-dark-bg text-text-light antialiased">
        {children}
      </body>
    </html>
  );
}
