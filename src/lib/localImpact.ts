export type StudyLite = {
  pmid: string
  title: string
  journal?: string | null
  pub_date?: string | null
}

// Lightweight, local heuristic (no paid API) to generate 2–3 sentence impact blurbs.
// This is intentionally conservative and avoids claiming results we don't have.

function hasAny(text: string, words: string[]) {
  const t = text.toLowerCase()
  return words.some((w) => t.includes(w))
}

export function localImpactBlurb(study: StudyLite): string {
  const t = `${study.title} ${study.journal || ''}`.trim()

  const humanish = hasAny(t, ['cohort', 'random', 'randomized', 'trial', 'patients', 'prospective', 'community', 'clinic'])
  const agingish = hasAny(t, ['aging', 'ageing', 'lifespan', 'healthspan', 'longevity', 'senescence', 'sarcopenia', 'dementia', 'alzheimer', 'epigenetic', 'telomere'])
  const mechanismish = hasAny(t, ['pathway', 'mechanism', 'methylation', 'microRNA', 'inflammation', 'inflammasome', 'metabolic'])

  const s1 = humanish
    ? 'This is human-relevant because it’s framed around people, cohorts, or clinical measurements rather than purely lab-only observations.'
    : 'This looks relevant to aging/healthspan research, but the title alone doesn’t confirm human outcomes.'

  const s2 = agingish
    ? 'It touches a common driver of healthspan (aging biology, age-linked disease risk, or functional decline), which is where real-world longevity gains usually come from.'
    : 'If it connects to core longevity pathways, it may matter by informing how upstream biology affects downstream disease and function.'

  const s3 = mechanismish
    ? 'The value is in the mechanism: it may point to targets or biomarkers that can be tested in humans over time.'
    : 'Next step would be replication and higher-quality human evidence before treating it as actionable.'

  // 2–3 sentences (Ben requested 2–3)
  return `${s1} ${s2} ${s3}`.replace(/\s+/g, ' ').trim()
}
