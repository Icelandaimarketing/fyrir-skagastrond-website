-- ============================================================
-- Fyrir Skagastrond - Production CMS Extensions
-- Run after supabase-schema.sql. Safe to re-run.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.admin_profiles (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT,
  role       TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.is_cms_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_profiles
    WHERE user_id = auth.uid()
      AND role IN ('admin', 'editor')
  );
$$;

CREATE TABLE IF NOT EXISTS public.site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.media_assets (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bucket     TEXT NOT NULL,
  path       TEXT NOT NULL,
  url        TEXT NOT NULL,
  title      TEXT DEFAULT '',
  alt_text   TEXT DEFAULT '',
  usage      TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bucket, path)
);

CREATE TABLE IF NOT EXISTS public.candidate_images (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text     TEXT DEFAULT '',
  sort_order   INTEGER DEFAULT 0,
  is_primary   BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(candidate_id, storage_path)
);

CREATE TABLE IF NOT EXISTS public.candidate_qa (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id  UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  question_key  TEXT NOT NULL,
  lang          TEXT NOT NULL CHECK (lang IN ('is', 'en', 'es', 'pl', 'de', 'da', 'no')),
  answer        TEXT DEFAULT '',
  draft_answer  TEXT,
  has_draft     BOOLEAN DEFAULT false,
  sort_order    INTEGER DEFAULT 0,
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(candidate_id, question_key, lang)
);

CREATE TABLE IF NOT EXISTS public.banner_items (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type         TEXT DEFAULT 'goal',
  image_url    TEXT,
  link_url     TEXT,
  sort_order   INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.banner_item_translations (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  banner_item_id UUID NOT NULL REFERENCES public.banner_items(id) ON DELETE CASCADE,
  lang           TEXT NOT NULL CHECK (lang IN ('is', 'en', 'es', 'pl', 'de', 'da', 'no')),
  title          TEXT DEFAULT '',
  description    TEXT DEFAULT '',
  draft_title    TEXT,
  draft_description TEXT,
  has_draft      BOOLEAN DEFAULT false,
  updated_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(banner_item_id, lang)
);

CREATE TABLE IF NOT EXISTS public.pages (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug         TEXT NOT NULL UNIQUE,
  hero_image_url TEXT,
  og_image_url   TEXT,
  sort_order   INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.page_translations (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id     UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  lang        TEXT NOT NULL CHECK (lang IN ('is', 'en', 'es', 'pl', 'de', 'da', 'no')),
  title       TEXT DEFAULT '',
  summary     TEXT DEFAULT '',
  body        TEXT DEFAULT '',
  draft_title TEXT,
  draft_summary TEXT,
  draft_body  TEXT,
  has_draft   BOOLEAN DEFAULT false,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_id, lang)
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_item_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_translations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Auth all site_content" ON public.site_content;
  DROP POLICY IF EXISTS "Auth all candidates" ON public.candidates;
  DROP POLICY IF EXISTS "Auth all candidate_translations" ON public.candidate_translations;
  DROP POLICY IF EXISTS "Auth all facebook_posts" ON public.facebook_posts;
  DROP POLICY IF EXISTS "Auth all contact_info" ON public.contact_info;
  DROP POLICY IF EXISTS "Admin read admin_profiles" ON public.admin_profiles;
  DROP POLICY IF EXISTS "Admin manage admin_profiles" ON public.admin_profiles;
  DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
  DROP POLICY IF EXISTS "Admin all site_settings" ON public.site_settings;
  DROP POLICY IF EXISTS "Public read media_assets" ON public.media_assets;
  DROP POLICY IF EXISTS "Admin all media_assets" ON public.media_assets;
  DROP POLICY IF EXISTS "Public read candidate_images" ON public.candidate_images;
  DROP POLICY IF EXISTS "Admin all candidate_images" ON public.candidate_images;
  DROP POLICY IF EXISTS "Public read candidate_qa" ON public.candidate_qa;
  DROP POLICY IF EXISTS "Admin all candidate_qa" ON public.candidate_qa;
  DROP POLICY IF EXISTS "Public read banner_items" ON public.banner_items;
  DROP POLICY IF EXISTS "Admin all banner_items" ON public.banner_items;
  DROP POLICY IF EXISTS "Public read banner_item_translations" ON public.banner_item_translations;
  DROP POLICY IF EXISTS "Admin all banner_item_translations" ON public.banner_item_translations;
  DROP POLICY IF EXISTS "Public read pages" ON public.pages;
  DROP POLICY IF EXISTS "Admin all pages" ON public.pages;
  DROP POLICY IF EXISTS "Public read page_translations" ON public.page_translations;
  DROP POLICY IF EXISTS "Admin all page_translations" ON public.page_translations;
  DROP POLICY IF EXISTS "Admin all site_content" ON public.site_content;
  DROP POLICY IF EXISTS "Admin all candidates" ON public.candidates;
  DROP POLICY IF EXISTS "Admin all candidate_translations" ON public.candidate_translations;
  DROP POLICY IF EXISTS "Admin all facebook_posts" ON public.facebook_posts;
  DROP POLICY IF EXISTS "Admin all contact_info" ON public.contact_info;
END $$;

CREATE POLICY "Admin read admin_profiles" ON public.admin_profiles FOR SELECT USING (public.is_cms_admin() OR user_id = auth.uid());
CREATE POLICY "Admin manage admin_profiles" ON public.admin_profiles FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin all site_settings" ON public.site_settings FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Public read media_assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Admin all media_assets" ON public.media_assets FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Public read candidate_images" ON public.candidate_images FOR SELECT USING (is_published = true);
CREATE POLICY "Admin all candidate_images" ON public.candidate_images FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Public read candidate_qa" ON public.candidate_qa FOR SELECT USING (true);
CREATE POLICY "Admin all candidate_qa" ON public.candidate_qa FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Public read banner_items" ON public.banner_items FOR SELECT USING (is_published = true);
CREATE POLICY "Admin all banner_items" ON public.banner_items FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Public read banner_item_translations" ON public.banner_item_translations FOR SELECT USING (true);
CREATE POLICY "Admin all banner_item_translations" ON public.banner_item_translations FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Public read pages" ON public.pages FOR SELECT USING (is_published = true);
CREATE POLICY "Admin all pages" ON public.pages FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Public read page_translations" ON public.page_translations FOR SELECT USING (true);
CREATE POLICY "Admin all page_translations" ON public.page_translations FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Admin all site_content" ON public.site_content FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Admin all candidates" ON public.candidates FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Admin all candidate_translations" ON public.candidate_translations FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Admin all facebook_posts" ON public.facebook_posts FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Admin all contact_info" ON public.contact_info FOR ALL USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());

INSERT INTO public.site_settings (key, value)
VALUES
  ('hero_image_url', '/Group images/29.jpg'),
  ('hero_alt_image_url', '/Group images/32.jpg')
ON CONFLICT (key) DO NOTHING;
