import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Mathusan Selvakumar | Software Engineer & Digital Creator',
  description: 'Personal portfolio of Mathusan Selvakumar - Software Engineer and Digital Creator passionate about building innovative solutions.',
  keywords: ['Software Engineer', 'Developer', 'Portfolio', 'Web Development', 'React', 'Next.js'],
  authors: [{ name: 'Mathusan Selvakumar' }],
  creator: 'Mathusan Selvakumar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mathusan.me',
    title: 'Mathusan Selvakumar | Software Engineer & Digital Creator',
    description: 'Personal portfolio of Mathusan Selvakumar - Software Engineer and Digital Creator passionate about building innovative solutions.',
    siteName: 'Mathusan Selvakumar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mathusan Selvakumar | Software Engineer & Digital Creator',
    description: 'Personal portfolio of Mathusan Selvakumar - Software Engineer and Digital Creator passionate about building innovative solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#581c87" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}