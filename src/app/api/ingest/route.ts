import { NextResponse } from 'next/server'
import { pubmedSearch, pubmedSummary } from '@/lib/pubmed'
import { supabaseService } from '@/lib/supabase'

// Broad longevity query (tune later)
const DEFAULT_TERM = [
  '(longevity OR lifespan OR healthspan OR aging OR ageing OR geroscience OR senescence)',
  'AND (trial OR randomized OR cohort OR mice OR mouse OR rat OR drosophila OR c. elegans OR human)',
].join(' ')

async function upsertStudies(pmids: string[]) {
  const summaries = await pubmedSummary(pmids)
  const sb = supabaseService()

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
  }

  return summaries.map((s) => s.pmid)
}

function takeUnique(source: string[], count: number, exclude: Set<string>) {
  const out: string[] = []
  for (const p of source) {
    if (out.length >= count) break
    if (!exclude.has(p)) {
      exclude.add(p)
      out.push(p)
    }
  }
  return out
}

export async function POST(req: Request) {
  const secret = process.env.INGEST_SECRET
  if (secret) {
    const got = req.headers.get('x-ingest-secret')
    if (got !== secret) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const term = String(body.term || DEFAULT_TERM)

  // Ben decision: 10 from last 7 days + 10 from last 30 days (no duplicates)
  const days7 = Number(body.days7 || 7)
  const days30 = Number(body.days30 || 30)
  const take7 = Number(body.take7 || 10)
  const take30 = Number(body.take30 || 10)

  const pmids7 = await pubmedSearch(term, days7)
  const pmids30 = await pubmedSearch(term, days30)

  const set = new Set<string>()
  const selected7 = takeUnique(pmids7, take7, set)
  const selected30 = takeUnique(pmids30, take30, set)
  const selected = [...selected7, ...selected30]

  const upserted = await upsertStudies(selected)

  return NextResponse.json({
    ok: true,
    total: upserted.length,
    selected7Count: selected7.length,
    selected30Count: selected30.length,
    pmids7: selected7,
    pmids30: selected30,
    windows: { days7, days30 },
  })
}
