import { supabaseAnon } from '@/lib/supabase'
import { SiteHeader } from './components/SiteHeader'
import { HomeHero } from './components/HomeHero'
import { StudyCard } from './components/StudyCard'
import Link from 'next/link'
import { SiteFooter } from './components/SiteFooter'

export const revalidate = 60

type StudyRow = {
  pmid: string
  title: string
  journal: string | null
  pub_date: string | null
  pubmed_url: string | null
  why: string | null
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
      <main className="min-h-screen bg-saas">
        <SiteHeader />
        <div className="container-saas py-14">
          <h1 className="text-2xl font-semibold">Longevity Daily</h1>
          <p className="mt-4 text-sm text-red-600">Failed to load studies: {error.message}</p>
        </div>
      </main>
    )
  }

  const all = (data || []) as StudyRow[]

  const top7 = all.slice(0, 10)
  const pmidSet = new Set(top7.map((s) => s.pmid))
  const top30 = all.filter((s) => !pmidSet.has(s.pmid)).slice(0, 10)

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <HomeHero total={all.length} />

      <section className="bg-white" id="top7">
        <div className="container-saas py-12">
          {all.length === 0 ? (
            <div className="card p-6">
              <p className="text-sm text-zinc-600">No studies ingested yet.</p>
              <p className="mt-2 text-sm text-zinc-600">
                Run <span className="kbd">/api/ingest</span> or follow the README to ingest locally.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900">Recent (7 days) — Top 10</h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    Ranked newest-first for now; blurbs pulled from{' '}
                    <span className="font-semibold">studies.why</span>.
                  </p>
                </div>
                <div className="text-xs text-zinc-500">No duplicates across sections</div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {top7.map((s) => (
                  <StudyCard key={s.pmid} s={s} />
                ))}
              </div>

              <div className="hr" />

              <section>
                <div className="mb-3">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900">Recent (30 days) — Next 10</h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    More papers worth skimming after this week’s top hits.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {top30.map((s) => (
                    <StudyCard key={s.pmid} s={s} />
                  ))}
                </div>
              </section>

              <div className="hr" />

              <section className="card p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">Sponsors / revenue (soon)</h3>
                    <p className="mt-1 text-sm text-zinc-600">We’re building an evidence-first supplements hub.</p>
                  </div>
                  <Link href="/supplements" className="btn-primary">
                    View Supplements page
                  </Link>
                </div>
              </section>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
