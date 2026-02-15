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

export async function POST(req: Request) {
  const secret = process.env.INGEST_SECRET
  if (secret) {
    const got = req.headers.get('x-ingest-secret')
    if (got !== secret) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const term = String(body.term || DEFAULT_TERM)

  // We ingest TWO windows and keep <= 20 total unique (7d + 30d without duplicates)
  const days7 = Number(body.days7 || 7)
  const days30 = Number(body.days30 || 30)
  const maxTotal = Number(body.maxTotal || 20)

  const pmids7 = await pubmedSearch(term, days7)
  const pmids30 = await pubmedSearch(term, days30)

  // prefer 7-day first, then fill from 30-day excluding duplicates
  const set = new Set<string>()
  const selected: string[] = []

  for (const p of pmids7) {
    if (selected.length >= maxTotal) break
    if (!set.has(p)) {
      set.add(p)
      selected.push(p)
    }
  }

  for (const p of pmids30) {
    if (selected.length >= maxTotal) break
    if (!set.has(p)) {
      set.add(p)
      selected.push(p)
    }
  }

  const upserted = await upsertStudies(selected)

  return NextResponse.json({ ok: true, count: upserted.length, pmids: upserted, windows: { days7, days30 }, maxTotal })
}
