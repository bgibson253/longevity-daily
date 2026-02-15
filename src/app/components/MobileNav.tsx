'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Studies' },
  { href: '/highly-discussed', label: 'Highly discussed' },
  { href: '/supplements', label: 'Supplements' },
  { href: '/account', label: 'Account' },
]

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 10h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onMouseDown(e: MouseEvent) {
      if (!open) return
      const el = panelRef.current
      if (el && !el.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onMouseDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onMouseDown)
    }
  }, [open])

  return (
    <div className="relative md:hidden" ref={panelRef}>
      <button
        type="button"
        className="btn-secondary px-3"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open navigation"
        aria-expanded={open}
      >
        <MenuIcon />
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-lg">
          <div className="p-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                  pathname === l.href
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
