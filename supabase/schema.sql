-- Database Schema for THEYUMIVERSE (Premium Wellness Studio)
-- Designed for Supabase PostgreSQL with Row Level Security (RLS)

-- 1. Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 2. Drop existing triggers/tables if they exist (for clean deployment)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.gallery cascade;
drop table if exists public.testimonials cascade;
drop table if exists public.blog_posts cascade;
drop table if exists public.reservations cascade;
drop table if exists public.user_packages cascade;
drop table if exists public.packages cascade;
drop table if exists public.schedules cascade;
drop table if exists public.class_types cascade;
drop table if exists public.trainers cascade;
drop table if exists public.profiles cascade;

-- 3. Create Tables

-- PROFILES: Extends Supabase auth.users
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text not null,
  last_name text not null,
  phone text,
  role text not null default 'client' check (role in ('admin', 'trainer', 'client')),
  preferred_locale text not null default 'tr' check (preferred_locale in ('tr', 'en')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRAINERS: Studio instructors
create table public.trainers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  avatar_url text,
  specialties text[] not null, -- e.g. ['Reformer Pilates', 'Hatha Yoga']
  bio_tr text not null,
  bio_en text not null,
  instagram_username text,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CLASS TYPES: Categorized classes with duration/capacity
create table public.class_types (
  id uuid default gen_random_uuid() primary key,
  name_tr text not null,
  name_en text not null,
  slug text not null unique,
  description_tr text not null,
  description_en text not null,
  category text not null check (category in ('yoga', 'reformer_pilates', 'mobility', 'breathing', 'wellness', 'recovery', 'nutrition')),
  duration_minutes integer not null,
  capacity integer not null,
  intensity_level text not null check (intensity_level in ('beginner', 'intermediate', 'advanced', 'all_levels')),
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SCHEDULES: Timetable grid elements mapping class types, trainers, and time slots
create table public.schedules (
  id uuid default gen_random_uuid() primary key,
  class_type_id uuid references public.class_types(id) on delete cascade not null,
  trainer_id uuid references public.trainers(id) on delete cascade not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  capacity_override integer,
  is_cancelled boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint check_times check (start_time < end_time)
);

-- PACKAGES: Studio membership options & class credit sets
create table public.packages (
  id uuid default gen_random_uuid() primary key,
  title_tr text not null,
  title_en text not null,
  description_tr text,
  description_en text,
  price numeric(10, 2) not null check (price >= 0),
  currency text not null default 'TRY',
  total_sessions integer not null check (total_sessions > 0),
  validity_days integer not null check (validity_days > 0),
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- USER PACKAGES: Active purchased package balances for users
create table public.user_packages (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  package_id uuid references public.packages(id) on delete cascade not null,
  purchased_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null,
  sessions_total integer not null check (sessions_total > 0),
  sessions_remaining integer not null check (sessions_remaining >= 0),
  status text not null default 'active' check (status in ('active', 'expired', 'exhausted')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint check_sessions check (sessions_remaining <= sessions_total)
);

-- RESERVATIONS: User bookings for schedule items
create table public.reservations (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  schedule_id uuid references public.schedules(id) on delete cascade not null,
  user_package_id uuid references public.user_packages(id) on delete set null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled_by_user', 'cancelled_by_studio', 'no_show')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_user_schedule unique(profile_id, schedule_id)
);

-- BLOG POSTS: Translatable SEO articles
create table public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  author_id uuid references public.profiles(id) on delete set null,
  category text not null check (category in ('yoga', 'reformer_pilates', 'mobility', 'breathing', 'wellness', 'recovery', 'nutrition')),
  tags text[] default '{}',
  featured_image text,
  reading_time_minutes integer not null default 5 check (reading_time_minutes > 0),
  is_published boolean default false not null,
  published_at timestamp with time zone,
  
  -- Language translations
  title_tr text not null,
  title_en text not null,
  excerpt_tr text not null,
  excerpt_en text not null,
  content_tr text not null,
  content_en text not null,
  
  -- SEO specific fields
  meta_title_tr text,
  meta_title_en text,
  meta_description_tr text,
  meta_description_en text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TESTIMONIALS: Customer reviews
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  client_avatar_url text,
  comment_tr text not null,
  comment_en text not null,
  rating integer not null check(rating >= 1 and rating <= 5),
  is_featured boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GALLERY: Photo listings
create table public.gallery (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  caption_tr text,
  caption_en text,
  category text not null check (category in ('studio', 'classes', 'events')),
  display_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 4. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.trainers enable row level security;
alter table public.class_types enable row level security;
alter table public.schedules enable row level security;
alter table public.packages enable row level security;
alter table public.user_packages enable row level security;
alter table public.reservations enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.gallery enable row level security;


-- 5. Helper Functions for RLS Roles
create or replace function public.is_admin()
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql;


-- 6. RLS Policies

-- PROFILES
create policy "Allow profiles view for owners or admins"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Allow profile updates for owners or admins"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- TRAINERS
create policy "Allow public read access to active trainers"
  on public.trainers for select
  using (is_active = true or public.is_admin());

create policy "Allow write access to trainers for admins only"
  on public.trainers for all
  using (public.is_admin());

-- CLASS TYPES
create policy "Allow public read access to class types"
  on public.class_types for select
  using (true);

create policy "Allow write access to class types for admins only"
  on public.class_types for all
  using (public.is_admin());

-- SCHEDULES
create policy "Allow public read access to schedules"
  on public.schedules for select
  using (true);

create policy "Allow write access to schedules for admins only"
  on public.schedules for all
  using (public.is_admin());

-- PACKAGES
create policy "Allow public read access to active packages"
  on public.packages for select
  using (is_active = true or public.is_admin());

create policy "Allow write access to packages for admins only"
  on public.packages for all
  using (public.is_admin());

-- USER PACKAGES
create policy "Allow user packages view for owners or admins"
  on public.user_packages for select
  using (auth.uid() = profile_id or public.is_admin());

create policy "Allow write access to user packages for admins only"
  on public.user_packages for all
  using (public.is_admin());

-- RESERVATIONS
create policy "Allow reservations view for owners or admins"
  on public.reservations for select
  using (auth.uid() = profile_id or public.is_admin());

create policy "Allow reservations insert for authenticated owners"
  on public.reservations for insert
  with check (auth.uid() = profile_id);

create policy "Allow reservations update for owners or admins"
  on public.reservations for update
  using (auth.uid() = profile_id or public.is_admin());

create policy "Allow reservations delete for owners or admins"
  on public.reservations for delete
  using (auth.uid() = profile_id or public.is_admin());

-- BLOG POSTS
create policy "Allow public read access to published posts"
  on public.blog_posts for select
  using (is_published = true or public.is_admin());

create policy "Allow write access to blog posts for admins only"
  on public.blog_posts for all
  using (public.is_admin());

-- TESTIMONIALS
create policy "Allow public read access to active testimonials"
  on public.testimonials for select
  using (is_featured = true or public.is_admin());

create policy "Allow write access to testimonials for admins only"
  on public.testimonials for all
  using (public.is_admin());

-- GALLERY
create policy "Allow public read access to gallery"
  on public.gallery for select
  using (true);

create policy "Allow write access to gallery for admins only"
  on public.gallery for all
  using (public.is_admin());


-- 7. Trigger: Automatically create public profile on auth.users sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, phone, role, preferred_locale)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', 'Client'),
    coalesce(new.raw_user_meta_data->>'last_name', 'User'),
    new.raw_user_meta_data->>'phone',
    'client',
    coalesce(new.raw_user_meta_data->>'preferred_locale', 'tr')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 8. Auto-updated_at triggers
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on public.profiles for each row execute procedure public.update_updated_at_column();
create trigger update_trainers_updated_at before update on public.trainers for each row execute procedure public.update_updated_at_column();
create trigger update_class_types_updated_at before update on public.class_types for each row execute procedure public.update_updated_at_column();
create trigger update_schedules_updated_at before update on public.schedules for each row execute procedure public.update_updated_at_column();
create trigger update_packages_updated_at before update on public.packages for each row execute procedure public.update_updated_at_column();
create trigger update_user_packages_updated_at before update on public.user_packages for each row execute procedure public.update_updated_at_column();
create trigger update_reservations_updated_at before update on public.reservations for each row execute procedure public.update_updated_at_column();
create trigger update_blog_posts_updated_at before update on public.blog_posts for each row execute procedure public.update_updated_at_column();
create trigger update_testimonials_updated_at before update on public.testimonials for each row execute procedure public.update_updated_at_column();
create trigger update_gallery_updated_at before update on public.gallery for each row execute procedure public.update_updated_at_column();
