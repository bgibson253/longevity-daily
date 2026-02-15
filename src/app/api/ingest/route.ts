import { NextResponse } from 'next/server'
import { pubmedSearch, pubmedSummary } from '@/lib/pubmed'
import { supabaseService } from '@/lib/supabase'

// Working query: broad + tunable later
const DEFAULT_TERM = [
  '(longevity OR lifespan OR healthspan OR aging OR ageing OR geroscience OR senescence)',
  'AND (trial OR randomized OR cohort OR mice OR mouse OR rat OR drosophila OR c. elegans OR human)',
].join(' ')

export async function POST(req: Request) {
  const secret = process.env.INGEST_SECRET
  if (secret) {
    const got = req.headers.get('x-ingest-secret')
    if (got !== secret) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const term = String(body.term || DEFAULT_TERM)
  const days = Number(body.days || 7)

  const pmids = await pubmedSearch(term, days)
  const summaries = await pubmedSummary(pmids)

  const sb = supabaseService()
  const inserted: string[] = []

  for (const s of summaries) {
    const { error } = await sb.from('studies').upsert(
      {
        pmid: s.pmid,
        title: s.title,
        journal: s.journal,
        pub_date: s.pubDate,
        authors: s.authors,
        pubmed_url: `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`,
      },
      { onConflict: 'pmid' },
    )
    if (error) throw new Error(error.message)
    inserted.push(s.pmid)
  }

  return NextResponse.json({ ok: true, count: inserted.length, pmids: inserted })
}
