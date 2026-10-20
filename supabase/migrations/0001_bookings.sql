-- Minimum personal data for appointment requests. Written only by the server (service role).
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 2 and 80),
  phone         text not null,
  preferred_date date not null,
  preferred_time text not null check (preferred_time in ('morning','afternoon','evening','any')),
  reason        text not null check (char_length(reason) between 3 and 160),
  consent_at    timestamptz not null,
  locale        text not null default 'en' check (locale in ('en','hi'))
);

-- RLS on with no policies: the anon/authenticated roles can neither read nor write.
-- Only the server (service role key) inserts and the clinic reads via the Supabase dashboard.
alter table public.bookings enable row level security;

-- Deletion requests (by email): delete from public.bookings where phone = '<number>';
-- Suggested retention: decide with the doctor (see content/TODO.md) and delete older rows on a schedule.
