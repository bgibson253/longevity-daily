-- Minimal schema for Longevity Daily

create table if not exists public.studies (
  pmid text primary key,
  title text not null,
  journal text,
  pub_date text,
  authors text[] default '{}',
  pubmed_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.study_scores (
  pmid text primary key references public.studies(pmid) on delete cascade,
  score int,
  why text,
  updated_at timestamptz not null default now()
);

-- Comments (publicly readable; insert requires auth)
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('study','supplement')),
  entity_id text not null,
  user_id uuid not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- RLS policies (you'll enable RLS in Supabase UI if desired)
-- alter table public.comments enable row level security;
-- create policy "public can read comments" on public.comments
--   for select using (true);
-- create policy "signed-in can insert own comments" on public.comments
--   for insert with check (auth.uid() = user_id);
