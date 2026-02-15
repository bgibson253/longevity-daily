-- Minimal schema for Longevity Daily (v0)
-- Notes:
-- - This keeps ONLY the studies you decide to store (e.g., top 10/20).
-- - We store a short LLM-generated impact blurb (2–3 sentences).
-- - Comments can come later (requires auth + UI).

create table if not exists public.studies (
  pmid text primary key,
  title text not null,
  journal text,
  pub_date text,
  pubmed_url text,
  impact text,
  created_at timestamptz not null default now()
);
