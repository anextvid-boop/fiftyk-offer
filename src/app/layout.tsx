import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-serif' });

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
      <body className={`${inter.variable} ${dmSerif.variable} font-sans lux-cursor bg-[#050505] text-white selection:bg-white selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
