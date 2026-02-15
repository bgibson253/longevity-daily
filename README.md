# Longevity Daily

A lightweight Next.js site that ingests PubMed studies into Supabase and shows a daily “top studies” feed.

## Local dev

```bash
npm i
npm run dev
```

## Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... # server-only (used by ingest/update)
```

## Database setup

Run the SQL in `supabase.sql` in your Supabase project.

## Ingest workflow

### Option A: API route (works locally + in Vercel)

- Start the dev server
- Visit: `http://localhost:3000/api/ingest`

### Option B: Local script

There are ingestion helpers in `scripts/`.

```bash
ls scripts
```

## Update “why” blurbs (no paid LLM APIs)

We store a short impact blurb in `studies.why`.

Update a batch via the local heuristic updater:

```bash
npm run updatewhy
```

This runs `scripts/update-why.mjs` and writes back to Supabase.

## Deploy (Vercel)

1) Ensure env vars are set in the Vercel project settings
2) Redeploy

If you change database schema, run the updated SQL in Supabase first.
