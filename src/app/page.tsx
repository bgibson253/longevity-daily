import Link from 'next/link'
import { supabaseAnon } from '@/lib/supabase'

export const revalidate = 60

type StudyRow = {
  pmid: string
  title: string
  journal: string | null
  pub_date: string | null
  pubmed_url: string | null
  why: string | null
}

function Card({ s }: { s: StudyRow }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-xs text-zinc-500">
        {s.journal || '—'} {s.pub_date ? `• ${s.pub_date}` : ''}
      </div>
      <h2 className="mt-1 text-base font-semibold leading-snug">
        <Link href={`/studies/${s.pmid}`} className="hover:underline">
          {s.title}
        </Link>
      </h2>
      {s.why ? <p className="mt-2 text-sm text-zinc-700">{s.why}</p> : null}
      <div className="mt-3 flex gap-3 text-sm">
        <a
          className="text-blue-600 hover:underline"
          href={s.pubmed_url || `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`}
          target="_blank"
          rel="noreferrer"
        >
          PubMed
        </a>
      </div>
    </article>
  )
}

export default async function Home() {
  const sb = supabaseAnon()

  const { data, error } = await sb
    .from('studies')
    .select('pmid,title,journal,pub_date,pubmed_url,why')
    .order('pub_date', { ascending: false })
    .limit(200)

  if (error) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-semibold">Longevity Daily</h1>
        <p className="mt-4 text-sm text-red-600">Failed to load studies: {error.message}</p>
      </main>
    )
  }

  const all = (data || []) as StudyRow[]

  const top7 = all.slice(0, 10)
  const pmidSet = new Set(top7.map((s) => s.pmid))
  const top30 = all.filter((s) => !pmidSet.has(s.pmid)).slice(0, 10)

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Longevity Daily</h1>
              <p className="mt-1 text-sm text-zinc-600">PubMed-only. Not medical advice.</p>
            </div>
            <div className="text-sm text-zinc-500">Google sign-in + comments: next</div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {all.length === 0 ? (
          <p className="text-sm text-zinc-600">No studies ingested yet.</p>
        ) : (
          <div className="space-y-10">
            <section>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-lg font-semibold">Recent (7 days) — Top 10</h2>
                <span className="text-xs text-zinc-500">No duplicates across sections</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {top7.map((s) => (
                  <Card key={s.pmid} s={s} />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-3">
                <h2 className="text-lg font-semibold">Recent (30 days) — Next 10</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {top30.map((s) => (
                  <Card key={s.pmid} s={s} />
                ))}
              </div>
            </section>
          </div>
        )}

        <footer className="mt-10 border-t pt-4 text-xs text-zinc-500">
          Disclaimer: informational only, not medical advice.
        </footer>
      </div>
    </main>
  )
}
