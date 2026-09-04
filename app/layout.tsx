import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Prabhu Union | Official Website",
    template: "%s | Prabhu Union",
  },

  description:
    "Official website of Prabhu Union. Notices, welfare programs, membership information, and union activities.",

  keywords: [
    "Prabhu Union",
    "Prabhu Union Nepal",
    "Prabhu",
    "Union Nepal",
    "Labour Union Nepal",
  ],

  authors: [
    {
      name: "Prabhu Union",
    },
  ],

  creator: "Prabhu Union",

  openGraph: {
    title: "Prabhu Union | Official Website",
    description:
      "Official website of Prabhu Union. Notices, welfare programs, membership information, and union activities.",
    url: "https://prabhu-union.vercel.app",
    siteName: "Prabhu Union",
    locale: "en_NP",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Prabhu Union | Official Website",
    description:
      "Official website of Prabhu Union. Notices, welfare programs, membership information, and union activities.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${playfair.variable} bg-[#f7f5f0] text-[#171717] antialiased`}
      >
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  );
}