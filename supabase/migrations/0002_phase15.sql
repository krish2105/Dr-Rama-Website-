-- Phase 1.5: slot requests, child/other option, call-backs, consent log, audit log. NOT applied yet (needs the Supabase project).
-- Run after 0001. The website writes through server routes with the service-role key; every table has RLS on and no public policy.

alter table public.bookings
  add column if not exists status text not null default 'requested' check (status in ('requested','confirmed','cancelled','visited','no_show')),
  add column if not exists patient_type text not null default 'self' check (patient_type in ('self','child','other')),
  add column if not exists guardian_name text,
  add column if not exists visit_type text check (visit_type in ('first','followup','report','notsure')),
  add column if not exists preferred_time_slot time,
  add column if not exists source text not null default 'direct',
  add column if not exists medium text,
  add column if not exists confirmed_at timestamptz,
  add column if not exists last_reminder_at timestamptz;

-- preferred_time was an enum of parts of the day; slot requests now carry an exact time (HH:MM)
alter table public.bookings drop constraint if exists bookings_preferred_time_check;
alter table public.bookings alter column preferred_time type text;
alter table public.bookings drop constraint if exists bookings_reason_check;
alter table public.bookings alter column reason drop not null; -- the free-text reason is no longer collected

create table if not exists public.callbacks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null,
  call_window text not null check (call_window in ('morning','afternoon','evening')),
  source text not null default 'direct',
  status text not null default 'new' check (status in ('new','called','closed')),
  consent_at timestamptz not null,
  locale text not null default 'en' check (locale in ('en','hi'))
);

create table if not exists public.consent_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  record_table text not null,
  record_id uuid not null,
  text_version text not null,
  consented_at timestamptz not null
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  admin_user text not null,
  action text not null,
  target text,
  detail text
);

alter table public.callbacks enable row level security;
alter table public.consent_log enable row level security;
alter table public.audit_log enable row level security;

-- Retention: delete requests and call-backs after the period the doctor chooses (see content/TODO.md). Example for 12 months:
-- delete from public.bookings where created_at < now() - interval '12 months';
-- delete from public.callbacks where created_at < now() - interval '12 months';
