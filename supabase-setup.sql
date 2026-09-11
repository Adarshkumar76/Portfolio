-- ==============================================================================
-- SUPABASE 1-CLICK SCHEMA SETUP FOR ADARSH'S PORTFOLIO
-- ==============================================================================
-- Run this entire script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- It will automatically:
--   1. Create the 'projects' table
--   2. Create the 'settings' table (for dynamic resume link)
--   3. Create the 'contact_messages' table (for contact inquiries)
--   4. Create the 'portfolio-assets' public storage bucket for images and resumes
--   5. Configure open read/write policies with anon key.
-- ==============================================================================

-- 1. Create 'projects' table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Personal',
  tags JSONB DEFAULT '[]'::jsonb,
  image TEXT NOT NULL,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Insert Projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Public Delete Projects" ON public.projects FOR DELETE USING (true);

-- 2. Create 'settings' table (stores active resume URL)
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public Modify Settings" ON public.settings FOR ALL USING (true);

-- Insert default resume setting if not existing
INSERT INTO public.settings (key, value)
VALUES ('resume_url', '/Resume.pdf')
ON CONFLICT (key) DO NOTHING;

-- 3. Create 'contact_messages' table (stores contact inquiries)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Messages" ON public.contact_messages FOR SELECT USING (true);

-- 4. Storage Bucket Setup: 'portfolio-assets'
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public Access Bucket" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Allow Uploads Bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets');
CREATE POLICY "Allow Updates Bucket" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Allow Deletes Bucket" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-assets');

-- ==============================================================================
-- DONE! Your Supabase database and storage are now 100% configured!
-- ==============================================================================
