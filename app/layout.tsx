import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

const SITE_TITLE = "The Fightin' Tenth — A Memoir by Capt. Michael Makatura";
const SITE_DESCRIPTION =
  "Cold War to Desert Storm with the 10th — one of NATO's most elite tactical fighter squadrons. A memoir by Captain Michael Makatura.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL('https://www.thefightintenth.com'),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://www.thefightintenth.com',
    siteName: "The Fightin' Tenth",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
