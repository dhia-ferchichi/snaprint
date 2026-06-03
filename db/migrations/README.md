# Database migrations

Plain SQL migrations for the Snaprint Supabase project. Apply each file once,
in numeric order, via the Supabase SQL Editor (Dashboard → SQL → New query).

These files are committed to git so the schema is portable across hosting
providers (Supabase remains the database; the app can be deployed on
Cloudflare Workers, Vercel, etc. without changes to schema management).

## Apply order
1. `0001_contact_submissions.sql` — contact form table, RLS, grants

## Conventions
- One feature per file. Files are append-only — never edit a migration that
  has already been applied to a shared environment. Create a new file
  (`0002_…`, `0003_…`) for follow-up changes.
- Always include `GRANT` statements alongside `CREATE TABLE` (PostgREST does
  not grant defaults on the `public` schema).
- Always `ENABLE ROW LEVEL SECURITY` and define explicit policies.
