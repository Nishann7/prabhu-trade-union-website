import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SiteLayout from '@/components/SiteLayout';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Prabhu Trade Union | Official Website',
  description:
    'Official website of Prabhu Trade Union. Notices, welfare programs, membership information, and union activities.',
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
          <SiteLayout>
            {children}
          </SiteLayout>
        </Providers>
      </body>
    </html>
  );
}