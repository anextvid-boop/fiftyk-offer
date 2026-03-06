import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Jahronimo — The 50k Project',
  description: 'A premium experimental project offer by Jahronimo. Value first, but mystery remains.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans lux-cursor bg-[#050505] text-white selection:bg-white selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
