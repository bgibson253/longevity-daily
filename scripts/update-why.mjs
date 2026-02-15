import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const service = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !service) {
  console.error('Missing SUPABASE_URL and/or SUPABASE_SERVICE_KEY')
  process.exit(1)
}

function hasAny(text, words) {
  const t = String(text || '').toLowerCase()
  return words.some((w) => t.includes(w))
}

function localImpactBlurb(study) {
  const t = `${study.title || ''} ${study.journal || ''}`.trim()

  const humanish = hasAny(t, ['cohort', 'random', 'randomized', 'trial', 'patients', 'prospective', 'community', 'clinic'])
  const agingish = hasAny(t, ['aging', 'ageing', 'lifespan', 'healthspan', 'longevity', 'senescence', 'sarcopenia', 'dementia', 'alzheimer', 'epigenetic', 'telomere'])
  const mechanismish = hasAny(t, ['pathway', 'mechanism', 'methylation', 'microrna', 'inflammation', 'inflammasome', 'metabolic', 'biomarker'])

  const s1 = humanish
    ? 'This is human-relevant because it’s framed around people, cohorts, or clinical measurements rather than purely lab-only observations.'
    : 'This looks relevant to aging/healthspan research, but the title alone doesn’t confirm human outcomes.'

  const s2 = agingish
    ? 'It touches a common driver of healthspan (aging biology, age-linked disease risk, or functional decline), which is where real-world longevity gains usually come from.'
    : 'If it connects to core longevity pathways, it may matter by informing how upstream biology affects downstream disease and function.'

  const s3 = mechanismish
    ? 'The value is in the mechanism: it may point to targets or biomarkers that can be tested in humans over time.'
    : 'Next step would be replication and higher-quality human evidence before treating it as actionable.'

  return `${s1} ${s2} ${s3}`.replace(/\s+/g, ' ').trim()
}

const sb = createClient(url, service, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const limit = Number(process.argv[2] || 20)

const { data, error } = await sb
  .from('studies')
  .select('pmid,title,journal,pub_date')
  .order('pub_date', { ascending: false })
  .limit(limit)

if (error) throw error

let updated = 0
for (const st of data || []) {
  const why = localImpactBlurb(st)
  const { error: upErr } = await sb.from('studies').update({ why }).eq('pmid', st.pmid)
  if (upErr) throw upErr
  updated++
}

console.log(JSON.stringify({ ok: true, updated }, null, 2))
