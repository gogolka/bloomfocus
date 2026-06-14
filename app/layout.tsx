import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bloomfocus.org'),
  title: {
    default: 'bloom focus — ADHD Toolkit & Planners',
    template: '%s | bloom focus',
  },
  description: 'Planning tools designed for ADHD brains. Printable planners, habit trackers, dopamine menus and more — shame-free, gentle, and actually helpful.',
  keywords: ['ADHD planner', 'ADHD toolkit', 'neurodivergent planner', 'ADHD printable', 'dopamine menu', 'habit tracker ADHD', 'ADHD organization', 'printable planner'],
  authors: [{ name: 'bloom focus' }],
  creator: 'bloom focus',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bloomfocus.org',
    siteName: 'bloom focus',
    title: 'bloom focus — ADHD Toolkit & Planners',
    description: 'Planning tools designed for ADHD brains. Shame-free, gentle, and actually helpful.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'bloom focus — ADHD Toolkit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bloom focus — ADHD Toolkit & Planners',
    description: 'Planning tools designed for ADHD brains.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: { google: 'QMxuRFiF-DiD1O_5eOnkqtOdYYD6Rr9Zrud3BfmdXsU' },
  alternates: { canonical: 'https://bloomfocus.org' },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'bloom focus',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-180.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#B8A4E8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
