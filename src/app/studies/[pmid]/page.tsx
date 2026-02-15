import Link from 'next/link'
import { supabaseAnon } from '@/lib/supabase'

export const revalidate = 60

type StudyRow = {
  pmid: string
  title: string
  journal: string | null
  pub_date: string | null
  pubmed_url: string | null
}

type Params = { pmid: string }

export default async function StudyPage({ params }: { params: Promise<Params> | Params }) {
  const resolved = (params as any).then ? await (params as Promise<Params>) : (params as Params)
  const pmid = resolved.pmid

  const sb = supabaseAnon()
  const { data, error } = await sb
    .from('studies')
    .select('pmid,title,journal,pub_date,pubmed_url')
    .eq('pmid', pmid)
    .maybeSingle()

  if (error) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-sm text-red-600">Failed to load study: {error.message}</p>
        <Link href="/" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          ← Back
        </Link>
      </main>
    )
  }

  const s = data as StudyRow | null
  if (!s) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="text-sm">Not found.</p>
        <Link href="/" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          ← Back
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight">{s.title}</h1>
      <div className="mt-2 text-sm text-zinc-600">
        {s.journal || '—'} {s.pub_date ? `• ${s.pub_date}` : ''}
      </div>

      <div className="mt-4 flex gap-3 text-sm">
        <a className="text-blue-600 hover:underline" href={s.pubmed_url || `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`} target="_blank" rel="noreferrer">
          View on PubMed
        </a>
      </div>

      <section className="mt-10 rounded-lg border border-zinc-200 bg-white p-4">
        <h2 className="text-sm font-semibold">Comments</h2>
        <p className="mt-2 text-sm text-zinc-600">
          (Hooking up Google sign-in + comments UI next.)
        </p>
      </section>

      <footer className="mt-10 border-t pt-4 text-xs text-zinc-500">Not medical advice.</footer>
    </main>
  )
}
