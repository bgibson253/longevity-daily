import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/70 bg-white">
      <div className="container-saas py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-sm font-black text-white">
                LD
              </span>
              <div className="text-sm font-semibold tracking-tight text-zinc-900">Longevity Daily</div>
            </div>
            <p className="mt-3 max-w-md text-sm text-zinc-600">
              PubMed-only longevity studies, summarized daily. Evidence-first, minimal hype.
            </p>
            <p className="mt-4 text-xs text-zinc-500">Disclaimer: informational only, not medical advice.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <div className="text-xs font-semibold tracking-wide text-zinc-900">Product</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link className="link" href="/">
                    Studies
                  </Link>
                </li>
                <li>
                  <Link className="link" href="/highly-discussed">
                    Highly discussed
                  </Link>
                </li>
                <li>
                  <Link className="link" href="/supplements">
                    Supplements
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wide text-zinc-900">Account</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link className="link" href="/account">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link className="link" href="/account">
                    Saved studies (soon)
                  </Link>
                </li>
                <li>
                  <Link className="link" href="/account">
                    Alerts (soon)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wide text-zinc-900">Legal</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link className="link" href="/">
                    Terms (soon)
                  </Link>
                </li>
                <li>
                  <Link className="link" href="/">
                    Privacy (soon)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200/70 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Longevity Daily</div>
          <div className="text-zinc-500">Built for signal, not noise.</div>
        </div>
      </div>
    </footer>
  )
}
