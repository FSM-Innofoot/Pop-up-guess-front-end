import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, DM_Sans } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

/**
 * Barlow Condensed Bold — closest freely available match to Klein Condensed Bold.
 * DM Sans — proportionally similar to Open Sauce, excellent legibility.
 *
 * Both are served via next/font (zero layout shift, self-hosted in production).
 */
const headingFont = Barlow_Condensed({
  weight: ['700', '900'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const bodyFont = DM_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // honours iPhone notch safe-areas
};

export const metadata: Metadata = {
  title: 'Guess the Score — Football Shirt Market',
  description: 'Submit your final score prediction and enter to win a legendary football shirt.',
  openGraph: {
    title: 'Guess the Score — Football Shirt Market',
    description: 'Submit your prediction. A legendary shirt is up for auction on 28th of March.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
