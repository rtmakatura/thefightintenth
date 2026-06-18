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

export const metadata: Metadata = {
  title: "The Fightin' Tenth — A Memoir by Captain Michael Makatura",
  description:
    "Behind the wire of one of NATO's most elite tactical fighter squadrons — the 10th — during the final years of the Cold War and Operation Desert Storm. A memoir by Captain Michael Makatura.",
  metadataBase: new URL('https://www.thefightintenth.com'),
  openGraph: {
    title: "The Fightin' Tenth",
    description: 'Cold War to Desert Storm — a memoir by Captain Michael Makatura.',
    type: 'website',
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
