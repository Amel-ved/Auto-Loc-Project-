-- Supabase schema for Auto-Loc
-- Clients, Voitures, Réservations

create extension if not exists "pgcrypto";

-- ==========================================
-- 1. Clients (profiles)
-- Linked to Supabase Auth
-- ==========================================
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

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
-- 2. Voitures (cars)
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

insert into public.cars (brand, model, year, price_per_day, category, image_url) values
('Mercedes-Benz', 'G-Class AMG 63', 2024, 450, 'Luxury', 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000'),
('Porsche', '911 Carrera', 2023, 350, 'Sports', 'https://images.unsplash.com/photo-1503376760367-1b01d9321523?auto=format&fit=crop&q=80&w=1000'),
('BMW', 'X5 M', 2024, 280, 'SUV', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000'),
('Audi', 'RS e-tron GT', 2024, 320, 'Sedan', 'https://images.unsplash.com/photo-1614026480209-cd9934144671?auto=format&fit=crop&q=80&w=1000'),
('Tesla', 'Model S Plaid', 2025, 400, 'Luxury', 'https://images.unsplash.com/photo-1612197520383-0f22fc811c23?auto=format&fit=crop&q=80&w=1000'),
('Land Rover', 'Range Rover Sport', 2024, 310, 'SUV', 'https://images.unsplash.com/photo-1542367597-1835f5cbf1f0?auto=format&fit=crop&q=80&w=1000');

-- ==========================================
-- 3. Réservations (reservations)
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
-- 4. Storage: documents
-- For the driver's license scans
-- ==========================================
insert into storage.buckets (id, name, public) values ('documents', 'documents', true);

-- ==========================================
-- 5. Row Level Security (RLS)
-- ==========================================
alter table public.profiles enable row level security;
alter table public.cars enable row level security;
alter table public.reservations enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Anyone can view cars"
  on public.cars for select using (true);

create policy "Users view own reservations"
  on public.reservations for select using (auth.uid() = user_id);

create policy "Users can insert own reservations"
  on public.reservations for insert with check (auth.uid() = user_id);

-- Expanded Storage Policies for 'documents' bucket
create policy "Public Access to Documents"
  on storage.objects for select using (bucket_id = 'documents');

create policy "Authenticated users can upload documents"
  on storage.objects for insert with check (
    bucket_id = 'documents' and auth.role() = 'authenticated'
  );

create policy "Users can update their own documents"
  on storage.objects for update with check (
    bucket_id = 'documents' and auth.role() = 'authenticated'
  );

create policy "Users can delete their own documents"
  on storage.objects for delete using (
    bucket_id = 'documents' and auth.role() = 'authenticated'
  );
