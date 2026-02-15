import Link from 'next/link'

type StudyRow = {
  pmid: string
  title: string
  journal: string | null
  pub_date: string | null
  pubmed_url: string | null
  why: string | null
}

export function StudyCard({ s }: { s: StudyRow }) {
  return (
    <article className="card card-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs text-zinc-500">
          {s.journal || '—'} {s.pub_date ? `• ${s.pub_date}` : ''}
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-100">
          PMID {s.pmid}
        </span>
      </div>

      <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-zinc-900">
        <Link href={`/studies/${s.pmid}`} className="hover:underline">
          {s.title}
        </Link>
      </h3>

      {s.why ? (
        <p className="mt-3 line-clamp-3 text-sm text-zinc-700">{s.why}</p>
      ) : (
        <p className="mt-3 text-sm text-zinc-500">
          Impact blurb coming soon.
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <a
          className="link text-sm"
          href={s.pubmed_url || `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`}
          target="_blank"
          rel="noreferrer"
        >
          PubMed →
        </a>
        <Link href={`/studies/${s.pmid}`} className="btn-ghost">
          Read
        </Link>
      </div>
    </article>
  )
}
