import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Auto-Loc | Premium Car Rental',
  description: 'Experience the drive of your life with Auto-Loc premium car rentals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={cn(
        outfit.variable, 
        "font-sans bg-neutral-950 text-neutral-50 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200"
      )}>
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="pt-20 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
