import Link from 'next/link'
import { supabaseAnon } from '@/lib/supabase'
import { SiteHeader } from '@/app/components/SiteHeader'
import { CommentsPlaceholder } from '@/app/components/CommentsPlaceholder'
import { SiteFooter } from '@/app/components/SiteFooter'

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

  const study = (data || null) as StudyRow | null

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="bg-saas" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="container-saas">
          <div className="mx-auto max-w-3xl">
            <Link href="/" className="link text-sm">
              ← Back
            </Link>

            {error ? (
              <div className="mt-6 card p-6">
                <p className="text-sm text-red-600">Failed to load study: {error.message}</p>
              </div>
            ) : !study ? (
              <div className="mt-6 card p-6">
                <p className="text-sm text-zinc-700">Not found.</p>
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge">PMID {study.pmid}</span>
                  <span className="badge">PubMed-only</span>
                </div>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900">{study.title}</h1>
                <div className="mt-3 text-sm text-zinc-600">
                  {study.journal || '—'} {study.pub_date ? `• ${study.pub_date}` : ''}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    className="btn-primary"
                    href={study.pubmed_url || `https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on PubMed
                  </a>
                  <Link href="/highly-discussed" className="btn-secondary">
                    Highly discussed
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-saas py-12">
          <div className="mx-auto max-w-3xl">
            {study?.why ? (
              <div className="card p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-zinc-900">Impact</h2>
                  <span className="badge">from studies.why</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">{study.why}</p>
              </div>
            ) : (
              <div className="card p-6">
                <h2 className="text-sm font-semibold text-zinc-900">Impact</h2>
                <p className="mt-2 text-sm text-zinc-600">
                  No summary yet for this paper. Soon: model/organism, intervention, key endpoints, and a conservative
                  takeaway.
                </p>
              </div>
            )}

            <div className="mt-10">
              <CommentsPlaceholder />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
