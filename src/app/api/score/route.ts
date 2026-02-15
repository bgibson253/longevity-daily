import { NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabase'
import { anthropicText } from '@/lib/anthropic'

// This endpoint only generates a short impact blurb (2–3 sentences)
// and stores it on studies. We do NOT display a numerical score.

export async function POST(req: Request) {
  const secret = process.env.INGEST_SECRET
  if (secret) {
    const got = req.headers.get('x-ingest-secret')
    if (got !== secret) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const limit = Number(body.limit || 20)

  const sb = supabaseService()
  const { data: studies, error } = await sb
    .from('studies')
    .select('pmid,title,journal,pub_date')
    .order('pub_date', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)

  const results: any[] = []
  for (const st of studies || []) {
    const prompt = `Write a concise 2-3 sentence "Impact" blurb explaining why this study could matter for human lifespan/healthspan.

Rules:
- No medical advice.
- Be conservative.
- Do not invent results; if unclear from title/metadata, say what it *appears* to investigate.
- Plain language.

Study:
PMID: ${st.pmid}
Title: ${st.title}
Journal: ${st.journal || ''}
Date: ${st.pub_date || ''}

Return ONLY the blurb text.`

    const why = await anthropicText(prompt)

    const { error: upErr } = await sb
      .from('studies')
      .update({ why })
      .eq('pmid', st.pmid)

    if (upErr) throw new Error(upErr.message)

    results.push({ pmid: st.pmid, why })
  }

  return NextResponse.json({ ok: true, updated: results.length, results })
}
