import Link from 'next/link'
import { SiteHeader } from '@/app/components/SiteHeader'

export const revalidate = 3600

export default function HighlyDiscussedPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="bg-saas" style={{ paddingTop: 36, paddingBottom: 36 }}>
        <div className="container-saas">
          <div className="mx-auto max-w-3xl">
            <div className="badge">Placeholder</div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900">Highly discussed</h1>
            <p className="mt-4 text-base text-zinc-700">
              Soon: the studies with the most comment activity, plus what the community is debating.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-saas py-12">
          <div className="mx-auto max-w-3xl">
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-zinc-900">What will show up here</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>• Most commented studies (7d / 30d)</li>
                <li>• Top upvoted comments per study</li>
                <li>• Quick filters (topic, intervention, model organism)</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/" className="btn-secondary">
                  Browse studies
                </Link>
                <Link href="/account" className="btn-primary">
                  Sign in (planned)
                </Link>
              </div>
            </div>

            <footer className="mt-12 border-t border-zinc-200/70 pt-6 text-xs text-zinc-500">Not medical advice.</footer>
          </div>
        </div>
      </section>
    </main>
  )
}
