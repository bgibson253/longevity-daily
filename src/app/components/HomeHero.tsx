import Link from 'next/link'

export function HomeHero({ total }: { total: number }) {
  return (
    <section className="bg-saas">
      <div className="container-saas py-14">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Updated daily
            </span>
            <span className="badge">
              <span className="font-semibold text-zinc-900">{total.toLocaleString()}</span> studies indexed
            </span>
            <span className="badge">No medical advice</span>
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-zinc-900 sm:text-6xl">
            Find the <span className="text-emerald-700">highest-impact</span> longevity studies.
          </h1>

          <p className="mt-5 text-base text-zinc-700 prose-tight">
            Longevity Daily watches new PubMed content and surfaces the top papers with a short “impact” blurb.
            Fast to skim, easy to click through.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href="#top7">
              See top studies
            </a>
            <Link className="btn-secondary" href="/supplements">
              Supplements (soon)
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="card p-5">
              <div className="text-sm font-semibold">Signal first</div>
              <p className="mt-2 text-sm text-zinc-600">Ranks likely impact. Avoids the “just a list” problem.</p>
            </div>
            <div className="card p-5">
              <div className="text-sm font-semibold">Evidence only</div>
              <p className="mt-2 text-sm text-zinc-600">Direct links to PubMed. No paywalled summaries.</p>
            </div>
            <div className="card p-5">
              <div className="text-sm font-semibold">Community soon</div>
              <p className="mt-2 text-sm text-zinc-600">Google-auth comments to debate what actually matters.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
