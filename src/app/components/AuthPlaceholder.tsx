export function AuthPlaceholder({ compact }: { compact?: boolean }) {
  return (
    <div className={compact ? '' : 'card p-5'}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Sign in</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Google-only auth coming soon. This will unlock comments, saved items, and alerts.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary opacity-60"
          disabled
          aria-disabled
          title="Auth not wired yet"
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}
