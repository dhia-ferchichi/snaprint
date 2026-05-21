# Snaprint backend setup

The contact form needs two manual setup steps in your Supabase project
(`btvedtarqcorkukswedi`) before it works end-to-end. The frontend code
and the Edge Function source are already wired in this repo.

## 1. Create the `contact_submissions` table

Run this SQL in **Supabase → SQL Editor** (or `supabase db push`):

```sql
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  project_type text,
  brief text not null,
  honeypot text
);

alter table public.contact_submissions enable row level security;

create policy "anon can insert contact submissions"
  on public.contact_submissions for insert to anon with check (true);

create policy "auth can select contact submissions"
  on public.contact_submissions for select to authenticated using (true);

create policy "auth can update contact submissions"
  on public.contact_submissions for update to authenticated
  using (true) with check (true);

create policy "auth can delete contact submissions"
  on public.contact_submissions for delete to authenticated using (true);
```

## 2. Deploy the Edge Function & set the Resend secret

From your local machine, with the Supabase CLI linked to the project:

```bash
supabase secrets set RESEND_API_KEY=re_7QncHvby_L8b7YFvMuaAz9p2b7kSBG5yQ
supabase functions deploy send-brief-notification --no-verify-jwt
```

The function source is at `supabase/functions/send-brief-notification/index.ts`.
It sends from `noreply@snaprint.tn` to `hello@snaprint.tn` — make sure the
`snaprint.tn` domain is verified in Resend first.

## 3. Frontend

Nothing to do. The form at `src/components/ContactForm.tsx` validates,
inserts into `contact_submissions`, then calls the Edge Function. Both
trigger on the same submit event.
