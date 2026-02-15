import Link from 'next/link'

export const revalidate = 3600

export default function SupplementsPage() {
  return (
    <main className="min-h-screen bg-saas">
      <div className="container-saas py-14">
        <div className="mx-auto max-w-3xl">
          <div className="badge">Revenue • affiliate-ready</div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900">
            Supplements (coming soon)
          </h1>
          <p className="mt-4 text-base text-zinc-700">
            This page will curate supplements with <span className="font-semibold">evidence-first</span> summaries and clear “who it’s for” guidance.
            No hype, no sketchy claims.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <h2 className="text-sm font-semibold">What will be here</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>• Study-backed ingredients and dosing ranges</li>
                <li>• Safety notes + interactions (where available)</li>
                <li>• Links to the strongest PubMed evidence</li>
                <li>• Clear “net impact” score and uncertainty</li>
              </ul>
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-semibold">Want this sooner?</h2>
              <p className="mt-3 text-sm text-zinc-700">
                If you tell me what you’re currently taking, I’ll prioritize those first.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link className="btn-primary opacity-60" href="#" aria-disabled>
                  Join waitlist
                </Link>
                <Link className="btn-secondary" href="/">
                  Back to studies
                </Link>
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                (Waitlist + email capture will be added after auth.)
              </p>
            </div>
          </div>

          <div className="hr" />

          <div className="card p-6">
            <h2 className="text-sm font-semibold">Disclosure</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Future versions may use affiliate links. Recommendations will remain evidence-first.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
