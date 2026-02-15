export function CommentsPlaceholder() {
  return (
    <section className="card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-zinc-900">Comments</h2>
        <span className="badge">soon</span>
      </div>
      <p className="mt-2 text-sm text-zinc-600">
        Threaded comments will live here (Google sign-in required). First version: simple text comments + upvotes.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm text-zinc-500">No comments yet.</p>
        <div className="mt-3 flex items-center gap-2">
          <input
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            placeholder="Sign in to comment…"
            disabled
          />
          <button className="btn-primary opacity-60" disabled>
            Post
          </button>
        </div>
      </div>
    </section>
  )
}
