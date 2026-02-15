type ESearchResult = {
  esearchresult: {
    idlist: string[]
  }
}

type ESummaryItem = {
  uid: string
  title?: string
  pubdate?: string
  source?: string
  authors?: { name: string }[]
  elocationid?: string
}

type ESummaryResult = {
  result: Record<string, ESummaryItem> & { uids: string[] }
}

function baseParams() {
  const tool = process.env.NCBI_TOOL || 'longevity-daily'
  const email = process.env.NCBI_EMAIL
  const p = new URLSearchParams({ tool })
  if (email) p.set('email', email)
  return p
}

export async function pubmedSearch(term: string, days: number) {
  const p = baseParams()
  p.set('db', 'pubmed')
  p.set('term', term)
  p.set('retmax', '50')
  p.set('sort', 'pub+date')
  // limit to last N days
  p.set('reldate', String(days))
  p.set('datetype', 'pdat')

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?retmode=json&${p.toString()}`
  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) throw new Error(`PubMed ESearch failed: ${res.status}`)
  const json = (await res.json()) as ESearchResult
  return json.esearchresult.idlist
}

export async function pubmedSummary(pmids: string[]) {
  if (pmids.length === 0) return []
  const p = baseParams()
  p.set('db', 'pubmed')
  p.set('id', pmids.join(','))

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?retmode=json&${p.toString()}`
  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) throw new Error(`PubMed ESummary failed: ${res.status}`)
  const json = (await res.json()) as ESummaryResult

  return json.result.uids
    .map((uid) => json.result[uid])
    .filter(Boolean)
    .map((it) => ({
      pmid: it.uid,
      title: it.title || '(untitled)',
      pubDate: it.pubdate || null,
      journal: it.source || null,
      authors: (it.authors || []).map((a) => a.name),
      elocationid: it.elocationid || null,
    }))
}
