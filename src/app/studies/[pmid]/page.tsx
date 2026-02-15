import Link from 'next/link'
import { supabaseAnon } from '@/lib/supabase'
import { SiteHeader } from '@/app/components/SiteHeader'
import { CommentsPlaceholder } from '@/app/components/CommentsPlaceholder'

export const revalidate = 60

type StudyRow = {
  pmid: string
  title: string
  journal: string | null
  pub_date: string | null
  pubmed_url: string | null
  why: string | null
}

type Params = { pmid: string }

export default async function StudyPage({ params }: { params: Promise<Params> | Params }) {
  const resolved = (params as any).then ? await (params as Promise<Params>) : (params as Params)
  const pmid = resolved.pmid

  const sb = supabaseAnon()
  const { data, error } = await sb
    .from('studies')
    .select('pmid,title,journal,pub_date,pubmed_url,why')
    .eq('pmid', pmid)
    .maybeSingle()

  return (
    <main className="min-h-screen bg-saas">
      <SiteHeader />
      <div className="container-saas py-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="link text-sm">
            ← Back
          </Link>

          {error ? (
            <div className="mt-6 card p-6">
              <p className="text-sm text-red-600">Failed to load study: {error.message}</p>
            </div>
          ) : !data ? (
            <div className="mt-6 card p-6">
              <p className="text-sm text-zinc-700">Not found.</p>
            </div>
          ) : (
            <>
              <h1 className="mt-6 text-3xl font-black tracking-tight text-zinc-900">{data.title}</h1>
              <div className="mt-2 text-sm text-zinc-600">
                {data.journal || '—'} {data.pub_date ? `• ${data.pub_date}` : ''}
              </div>

              {data.why ? (
                <div className="mt-6 card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-zinc-900">Impact</h2>
                    <span className="badge">from studies.why</span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-700 leading-relaxed">{data.why}</p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  className="btn-secondary"
                  href={data.pubmed_url || `https://pubmed.ncbi.nlm.nih.gov/${data.pmid}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on PubMed
                </a>
                <span className="text-xs text-zinc-500">PMID {data.pmid}</span>
              </div>

              <div className="mt-10">
                <CommentsPlaceholder />
              </div>
            </>
          )}

          <footer className="mt-12 border-t border-zinc-200/70 pt-6 text-xs text-zinc-500">Not medical advice.</footer>
        </div>
      </div>
    </main>
  )
}
