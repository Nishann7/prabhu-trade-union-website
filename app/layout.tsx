import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Prabhu Trade Union',
  description: 'Official website of Prabhu Trade Union',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-gray-50"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}