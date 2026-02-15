import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

export const revalidate = 3600

type Supplement = {
  name: string
  why: string
  evidence: 'Strong' | 'Moderate' | 'Emerging'
}

const TOP_10: Supplement[] = [
  {
    name: 'Creatine monohydrate',
    evidence: 'Strong',
    why: 'One of the best-supported supplements for preserving strength, power, and lean mass—key levers for healthspan as people age. Particularly relevant for resistance training and reducing frailty risk through better functional capacity.',
  },
  {
    name: 'Omega-3 (EPA/DHA)',
    evidence: 'Moderate',
    why: 'Supports cardiometabolic health, inflammation balance, and may benefit triglycerides and cardiovascular risk markers. If the goal is “more good years,” lowering CVD risk is a high-impact pathway.',
  },
  {
    name: 'Vitamin D3 (when deficient)',
    evidence: 'Moderate',
    why: 'Best used to correct deficiency, which is associated with worse bone and muscle outcomes. Keeping levels adequate can support falls/fracture risk reduction when paired with strength + protein.',
  },
  {
    name: 'Magnesium (glycinate/citrate)',
    evidence: 'Moderate',
    why: 'Many people under-consume magnesium; adequacy matters for glucose control, blood pressure, sleep quality, and neuromuscular function. The “impact” is often fixing a quiet bottleneck rather than a dramatic boost.',
  },
  {
    name: 'Protein (whey/essential amino acids)',
    evidence: 'Strong',
    why: 'Not sexy, but huge: meeting protein needs supports muscle protein synthesis and helps resist sarcopenia. Muscle is protective for aging—metabolic health, mobility, and recovery all track with it.',
  },
  {
    name: 'Psyllium husk (soluble fiber)',
    evidence: 'Strong',
    why: 'A low-cost way to improve LDL cholesterol, glycemic response, and gut regularity in many people. Better cardiometabolic markers compound over decades—very “longevity math.”',
  },
  {
    name: 'Berberine (for glycemic/lipid goals)',
    evidence: 'Emerging',
    why: 'Often shows improvements in glucose and lipid markers in some studies, making it interesting for metabolic risk management. Main caveat is tolerability/interactions—worth treating as “targeted tool,” not daily candy.',
  },
  {
    name: 'Glycine (or collagen + glycine)',
    evidence: 'Emerging',
    why: 'Potential benefits for sleep quality and connective tissue support; also ties into one-carbon metabolism. The plausible upside is modest but could matter if it improves recovery and training consistency.',
  },
  {
    name: 'Taurine',
    evidence: 'Emerging',
    why: 'Mechanistically linked to mitochondrial and metabolic health and has generated longevity interest. The real impact question is human outcomes—promising, but still waiting for definitive, long-term trials.',
  },
  {
    name: 'Green tea extract / EGCG (carefully dosed)',
    evidence: 'Emerging',
    why: 'Interesting for cardiometabolic and cellular stress-response pathways, but not a guaranteed win. The “impact” is potentially small; safety and dosing discipline matter more than hype.',
  },
]

function EvidencePill({ level }: { level: Supplement['evidence'] }) {
  const cls =
    level === 'Strong'
      ? 'pill pill-strong'
      : level === 'Moderate'
        ? 'pill pill-moderate'
        : 'pill pill-emerging'
  return <span className={cls}>{level} evidence</span>
}

export default function SupplementsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="bg-saas" style={{ paddingTop: 36, paddingBottom: 36 }}>
        <div className="container-saas">
          <div className="mx-auto max-w-3xl">
            <div className="badge">Revenue • affiliate-ready</div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900">Top supplements (v0)</h1>
            <p className="mt-4 text-base text-zinc-700">
              This is a starter list meant to be useful, conservative, and readable. It will evolve into an
              evidence-first directory with PubMed links and disclosure.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-saas py-12">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4">
              {TOP_10.map((s) => (
                <article key={s.name} className="card p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-base font-bold tracking-tight text-zinc-900">{s.name}</h2>
                      <p className="mt-2 text-sm text-zinc-700">{s.why}</p>
                      <p className="mt-3 text-xs text-zinc-500">
                        Links + sourcing coming next (PubMed, dosing ranges, safety notes).
                      </p>
                    </div>
                    <div className="shrink-0">
                      <EvidencePill level={s.evidence} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="hr" />

            <div className="card p-6">
              <h3 className="text-sm font-semibold">Disclosure</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Future versions may use affiliate links. Recommendations will remain evidence-first and will include
                uncertainty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
