create type public.app_role as enum ('admin','customer');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.membership_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  full_name text not null,
  phone text not null,
  address text not null,
  email text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);
grant select, insert, update on public.membership_requests to authenticated;
grant all on public.membership_requests to service_role;
alter table public.membership_requests enable row level security;
create policy "own or admin read" on public.membership_requests for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "insert own pending" on public.membership_requests for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending');
create policy "admin update" on public.membership_requests for update to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (status in ('pending','approved','rejected'));

-- The owner's email becomes admin automatically on sign-up.
create or replace function public.handle_owner_signup()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if lower(new.email) = 'milaanaorganic@gmail.com' then
    insert into public.user_roles(user_id, role) values (new.id, 'admin') on conflict do nothing;
  end if;
  return new;
end $$;
create trigger on_auth_user_created_owner after insert on auth.users
  for each row execute function public.handle_owner_signup();