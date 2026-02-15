import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Longevity Daily',
  description: 'PubMed-only longevity studies, summarized daily.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
