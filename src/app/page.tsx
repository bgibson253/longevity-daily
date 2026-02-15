import Link from 'next/link'
import { supabaseAnon } from '@/lib/supabase'

export const revalidate = 60 // refresh at most once per minute

type StudyRow = {
  pmid: string
  title: string
  journal: string | null
  pub_date: string | null
  pubmed_url: string | null
}

export default async function Home() {
  const sb = supabaseAnon()

  // NOTE: we keep "scores" internal if you want the ranking but not to display a numeric score.
  const { data, error } = await sb
    .from('studies')
    .select('pmid,title,journal,pub_date,pubmed_url')
    .order('pub_date', { ascending: false })
    .limit(10)

  if (error) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Longevity Daily</h1>
        <p className="mt-4 text-sm text-red-600">Failed to load studies: {error.message}</p>
      </main>
    )
  }

  const studies = (data || []) as StudyRow[]

  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Longevity Daily</h1>
        <p className="mt-2 text-sm text-zinc-600">
          PubMed-only. Updated daily. Top 10 most consequential studies from the past week.
        </p>
      </header>

      <section className="space-y-3">
        {studies.length === 0 ? (
          <p className="text-sm text-zinc-600">No studies ingested yet.</p>
        ) : (
          studies.map((s) => (
            <article key={s.pmid} className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="text-xs text-zinc-500">
                {s.journal || '—'} {s.pub_date ? `• ${s.pub_date}` : ''}
              </div>
              <h2 className="mt-1 text-base font-medium">
                <Link href={`/studies/${s.pmid}`} className="hover:underline">
                  {s.title}
                </Link>
              </h2>
              <div className="mt-2 flex gap-3 text-sm">
                <a className="text-blue-600 hover:underline" href={s.pubmed_url || `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`} target="_blank" rel="noreferrer">
                  PubMed
                </a>
              </div>
            </article>
          ))
        )}
      </section>

      <footer className="mt-10 border-t pt-4 text-xs text-zinc-500">
        Not medical advice.
      </footer>
    </main>
  )
}
