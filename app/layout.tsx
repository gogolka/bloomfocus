import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
  alternates: { canonical: 'https://bloomfocus.org' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
