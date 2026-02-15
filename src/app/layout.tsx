import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://longevitydaily.com'),
  title: {
    default: 'Longevity Daily — PubMed-only longevity studies, summarized daily',
    template: '%s — Longevity Daily',
  },
  description:
    'PubMed-only longevity studies, summarized daily. Fast, evidence-first briefs with an emerald-clean SaaS vibe.',
  openGraph: {
    title: 'Longevity Daily',
    description: 'PubMed-only longevity studies, summarized daily.',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
