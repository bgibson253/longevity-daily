import { NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabase'
import { anthropicText } from '@/lib/anthropic'

export async function POST(req: Request) {
  const secret = process.env.INGEST_SECRET
  if (secret) {
    const got = req.headers.get('x-ingest-secret')
    if (got !== secret) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const limit = Number(body.limit || 10)

  const sb = supabaseService()
  const { data: studies, error } = await sb
    .from('studies')
    .select('pmid,title,journal,pub_date')
    .order('pub_date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)

  const results: any[] = []
  for (const st of studies || []) {
    const prompt = `You are ranking PubMed longevity studies by likely impact on humans.\n\nReturn STRICT JSON with keys: score (0-100), why (1-3 concise sentences).\nNo medical advice. Be conservative.\n\nStudy:\nPMID: ${st.pmid}\nTitle: ${st.title}\nJournal: ${st.journal || ''}\nDate: ${st.pub_date || ''}`
    const text = await anthropicText(prompt)

    // best-effort JSON parse
    let parsed: any = null
    try {
      parsed = JSON.parse(text)
    } catch {
      parsed = { score: null, why: text }
    }

    const { error: upErr } = await sb.from('study_scores').upsert(
      {
        pmid: st.pmid,
        score: parsed.score ?? null,
        why: parsed.why ?? null,
      },
      { onConflict: 'pmid' },
    )
    if (upErr) throw new Error(upErr.message)

    results.push({ pmid: st.pmid, ...parsed })
  }

  return NextResponse.json({ ok: true, results })
}
