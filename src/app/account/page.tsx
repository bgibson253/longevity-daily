import { AuthPlaceholder } from '../components/AuthPlaceholder'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

export const revalidate = 3600

export default function AccountPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="bg-saas" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="container-saas">
          <div className="mx-auto max-w-2xl">
            <div className="badge">Google-only (planned)</div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-900">Account</h1>
            <p className="mt-4 text-base text-zinc-700">
              Sign in will unlock commenting, saving studies, and personalized alerts.
            </p>

            <div className="mt-8">
              <AuthPlaceholder />
            </div>

            <div className="mt-10 card p-5">
              <h2 className="text-sm font-semibold">Roadmap</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>• Google OAuth via Supabase Auth</li>
                <li>• Comments (per-study threads)</li>
                <li>• Saved studies</li>
                <li>• Weekly digest email</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
