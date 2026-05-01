# 🚀 Auto-Loc: Supabase Setup Guide for Production

Hey there! The frontend code is already fully written and ready for production. 
All the Supabase frontend integration is handled in `lib/api.ts` and gated by the `NEXT_PUBLIC_USE_MOCK_DATA` environment variable.

To connect Supabase, you just need to:
1. Add your project keys to `.env.local`.
2. Change `NEXT_PUBLIC_USE_MOCK_DATA` to `false`.
3. Run the following SQL in your Supabase SQL Editor to construct the necessary tables, relationships, and RLS policies!

---

## 🛠️ The SQL Schema (Copy & Paste into Supabase SQL Editor)

```sql
-- ==========================================
-- 1. TABLE A: profiles (Users)
-- Linked to Supabase Auth
-- ==========================================
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Automate Profile Creation on Signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- 2. TABLE B: cars (Resources)
-- ==========================================
create table public.cars (
  id uuid default gen_random_uuid() primary key,
  brand text not null,
  model text not null,
  year integer not null,
  price_per_day numeric not null,
  image_url text,
  category text,
  status text default 'available'
);

-- Insert some dummy data so the UI isn't empty
insert into public.cars (brand, model, year, price_per_day, category, image_url) values
('Mercedes-Benz', 'G-Class AMG 63', 2024, 450, 'Luxury', 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000'),
('Porsche', '911 Carrera', 2023, 350, 'Sports', 'https://images.unsplash.com/photo-1503376760367-1b01d9321523?auto=format&fit=crop&q=80&w=1000');

-- ==========================================
-- 3. TABLE C: reservations (Interactions)
-- ==========================================
create table public.reservations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  car_id uuid references public.cars(id) on delete cascade not null,
  start_date date not null,
  end_date date not null,
  status text default 'pending',
  license_photo_url text,
  total_price numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 4. STORAGE: documents
-- For the Driver's License scans
-- ==========================================
insert into storage.buckets (id, name, public) values ('documents', 'documents', true);

-- ==========================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- *CRITICAL PROJECT REQUIREMENT*
-- ==========================================
alter table public.profiles enable row level security;
alter table public.cars enable row level security;
alter table public.reservations enable row level security;

-- Profiles: Users can view their own profile
create policy "Users can view own profile" 
  on public.profiles for select using (auth.uid() = id);

-- Cars: Anyone can view available cars
create policy "Anyone can view cars" 
  on public.cars for select using (true);

-- Reservations: Users can ONLY see their OWN reservations (Isolation requirement)
create policy "Users view own reservations" 
  on public.reservations for select using (auth.uid() = user_id);

-- Reservations: Users can insert their own reservations
create policy "Users can insert own reservations" 
  on public.reservations for insert with check (auth.uid() = user_id);

-- Storage Documents: Authenticated users can upload licenses
create policy "Auth users can upload documents"
  on storage.objects for insert with check (
    bucket_id = 'documents' and auth.role() = 'authenticated'
  );
```

---

That's it! Once you run that SQL and paste your keys into `.env.local`, the frontend will seamlessly switch from mock data to the real production Supabase instance!
