import Link from 'next/link'
import { MobileNav } from './MobileNav'

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
    >
      {children}
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur">
      <div className="container-saas flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-sm font-black text-white">
              LD
            </span>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">Longevity Daily</span>
          </Link>
          <span className="hidden sm:inline-flex" />
          <span className="hidden sm:inline-flex badge">PubMed-only • daily signal</span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/">Studies</NavLink>
          <NavLink href="/highly-discussed">Highly discussed</NavLink>
          <NavLink href="/supplements">Supplements</NavLink>
          <NavLink href="/account">Account</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/account" className="btn-secondary hidden sm:inline-flex">
            Sign in
          </Link>
          <Link href="/supplements" className="btn-primary">
            Explore
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
