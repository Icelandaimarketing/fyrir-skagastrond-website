-- ============================================================
-- Fyrir Skagaströnd — Supabase Database Schema
-- Run this entire script in the Supabase SQL Editor
-- Supabase Dashboard → SQL Editor → New query → Paste → Run
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- TABLE: site_content
-- Stores all translatable text content for the public site.
-- key+lang is unique. value = live (published). draft_value = working draft.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_content (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key          TEXT NOT NULL,
  lang         TEXT NOT NULL CHECK (lang IN ('is', 'en', 'es', 'pl', 'de', 'da', 'no')),
  value        TEXT NOT NULL DEFAULT '',
  draft_value  TEXT,
  has_draft    BOOLEAN DEFAULT false,
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(key, lang)
);

-- ────────────────────────────────────────────────────────────
-- TABLE: candidates
-- Stores candidate metadata. Translations are in candidate_translations.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.candidates (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nr           INTEGER NOT NULL UNIQUE,
  name         TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  image_url    TEXT,
  sort_order   INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: candidate_translations
-- Per-language role and bio for each candidate.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.candidate_translations (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  lang         TEXT NOT NULL CHECK (lang IN ('is', 'en', 'es', 'pl', 'de', 'da', 'no')),
  role         TEXT DEFAULT '',
  bio          TEXT DEFAULT '',
  draft_role   TEXT,
  draft_bio    TEXT,
  has_draft    BOOLEAN DEFAULT false,
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(candidate_id, lang)
);

-- ────────────────────────────────────────────────────────────
-- TABLE: facebook_posts
-- Embed URLs for the Facebook posts section.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.facebook_posts (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  embed_url  TEXT NOT NULL,
  height     INTEGER DEFAULT 400,
  sort_order INTEGER DEFAULT 0,
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- TABLE: contact_info
-- Phone, email, location, Facebook URL.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_info (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key        TEXT NOT NULL UNIQUE,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- ENABLE ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facebook_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- RLS POLICIES
-- ────────────────────────────────────────────────────────────

-- Public read (anyone can read - needed for public site)
CREATE POLICY "Public read site_content"
  ON public.site_content FOR SELECT USING (true);

CREATE POLICY "Public read candidates"
  ON public.candidates FOR SELECT USING (true);

CREATE POLICY "Public read candidate_translations"
  ON public.candidate_translations FOR SELECT USING (true);

CREATE POLICY "Public read facebook_posts"
  ON public.facebook_posts FOR SELECT USING (is_active = true);

CREATE POLICY "Public read contact_info"
  ON public.contact_info FOR SELECT USING (true);

-- Authenticated write (admin dashboard only)
CREATE POLICY "Auth all site_content"
  ON public.site_content FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth all candidates"
  ON public.candidates FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth all candidate_translations"
  ON public.candidate_translations FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth all facebook_posts"
  ON public.facebook_posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth all contact_info"
  ON public.contact_info FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ────────────────────────────────────────────────────────────
-- STORAGE BUCKETS
-- Note: If these fail, create the buckets manually in the
-- Supabase Dashboard → Storage → New bucket
-- Name: candidate-photos, Public: ON
-- Name: site-images, Public: ON
-- ────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('candidate-photos', 'candidate-photos', true),
  ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public read
CREATE POLICY "Public read candidate-photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'candidate-photos');

CREATE POLICY "Public read site-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

-- Storage RLS: Authenticated write
CREATE POLICY "Auth insert candidate-photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'candidate-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Auth update candidate-photos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'candidate-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Auth delete candidate-photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'candidate-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Auth insert site-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth update site-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'site-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth delete site-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-images' AND auth.role() = 'authenticated');

-- ────────────────────────────────────────────────────────────
-- DONE. Tables, policies, and storage buckets created.
-- Next: run the "Initialize Database" button in the admin
-- dashboard to seed all content from the existing site data.
-- ────────────────────────────────────────────────────────────
