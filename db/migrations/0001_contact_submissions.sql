-- Snaprint contact form: minimal, append-only persistence.
-- Run in Supabase SQL Editor on the project owned by Snaprint.
-- This file is committed for GitHub/Vercel portability.

create extension if not exists "pgcrypto";

-- Status enum: lifecycle of a brief (managed via Supabase Dashboard for now).
do $$
begin
  if not exists (select 1 from pg_type where typname = 'contact_status') then
    create type public.contact_status as enum ('new', 'contacted', 'closed');
  end if;
end$$;

create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 2 and 120),
  email         text not null check (char_length(email) between 3 and 200),
  company       text     check (company is null or char_length(company) <= 200),
  project_type  text     check (project_type is null or char_length(project_type) <= 40),
  brief         text not null check (char_length(brief) between 10 and 1500),
  user_agent    text     check (user_agent is null or char_length(user_agent) <= 500),
  status        public.contact_status not null default 'new',
  notified_at   timestamptz
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Grants. Anon can only INSERT (form submission). Authenticated can read
-- (future dashboard). service_role has full access for server-side ops
-- (setting notified_at, manual dashboard work).
grant insert on public.contact_submissions to anon;
grant select on public.contact_submissions to authenticated;
grant all    on public.contact_submissions to service_role;

alter table public.contact_submissions enable row level security;

-- Anonymous form submissions (public website).
drop policy if exists "anon_can_insert" on public.contact_submissions;
create policy "anon_can_insert"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Authenticated users (signed into Supabase) can read submissions.
drop policy if exists "auth_can_select" on public.contact_submissions;
create policy "auth_can_select"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

-- No UPDATE / DELETE policies. service_role bypasses RLS for the server
-- function and for any direct dashboard edits.
