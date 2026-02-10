-- 1. Create Profiles Table (Linked to auth.users)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  
  primary key (id)
);

-- 2. Create Plans Table (IPTV Packages)
create table public.plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  duration_months integer not null, -- e.g., 1, 6, 12
  features text[], -- Array of features
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- 3. Create User Subscriptions Table
create table public.user_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  plan_id uuid references public.plans(id) not null,
  status text not null default 'pending', -- active, expired, pending, cancelled
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  m3u_url text, -- Unique playlist URL
  mac_address text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 4. Automation: Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Security: Enable RLS
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.user_subscriptions enable row level security;

-- Policies
-- Profiles: Users can see/edit their own profile
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using ( true );

create policy "Users can insert their own profile." on public.profiles
  for insert with check ( auth.uid() = id );

create policy "Users can update own profile." on public.profiles
  for update using ( auth.uid() = id );

-- Plans: Everyone can view active plans
create policy "Plans are viewable by everyone." on public.plans
  for select using ( true );

-- Subscriptions: Users can only see their own subscriptions
create policy "Users can view own subscriptions." on public.user_subscriptions
  for select using ( auth.uid() = user_id );
