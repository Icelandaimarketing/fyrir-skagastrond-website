import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import fallbackTranslations, {
  FALLBACK_BANNER_ITEMS,
  FALLBACK_CONTACT,
  FALLBACK_FACEBOOK_POSTS,
  FALLBACK_HERO_IMAGE,
  FALLBACK_POLICY_PAGES,
  getFallbackCandidates,
} from '../data/fallbackContent';
import candidateQa from '../data/candidateQaContent';
import { getCandidateFallbackImage } from '../data/candidateImageFallbacks';

const PublicDataContext = createContext(null);

function rowsToTranslations(rows) {
  const next = {};
  rows?.forEach((row) => {
    if (!next[row.key]) next[row.key] = {};
    next[row.key][row.lang] = row.value || '';
  });
  return next;
}

function rowsToKeyValues(rows) {
  const next = {};
  rows?.forEach((row) => {
    next[row.key] = row.value || '';
  });
  return next;
}

function translationRowsToMap(rows, field) {
  const next = {};
  rows?.forEach((row) => {
    next[row.lang] = row[field] || '';
  });
  return next;
}

function normalizeCandidates(rows) {
  return (rows || [])
    .filter((candidate) => candidate.is_published !== false)
    .map((candidate) => {
      const images = (candidate.candidate_images || [])
        .filter((img) => img.is_published !== false)
        .sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || (a.sort_order || 0) - (b.sort_order || 0));
      const primary = images.find((img) => img.is_primary) || images[0];
      const fallbackImage = getCandidateFallbackImage(candidate.slug);
      return {
        ...candidate,
        image: primary?.url || candidate.image_url || fallbackImage,
        image_url: primary?.url || candidate.image_url || fallbackImage,
        primary_image_url: primary?.url || candidate.image_url || fallbackImage,
        fallback_image_url: fallbackImage,
        gallery: images,
        role: translationRowsToMap(candidate.candidate_translations, 'role'),
        bio: translationRowsToMap(candidate.candidate_translations, 'bio'),
        qa: candidateQa[candidate.slug] || normalizeCandidateQa(candidate.candidate_qa),
      };
    })
    .sort((a, b) => (a.sort_order ?? a.nr) - (b.sort_order ?? b.nr));
}

function normalizeCandidateQa(rows) {
  const next = {};
  rows?.forEach((row) => {
    if (!next[row.question_key]) next[row.question_key] = {};
    next[row.question_key][row.lang] = row.answer || '';
  });
  return next;
}

function normalizeBannerItems(rows) {
  return (rows || [])
    .filter((item) => item.is_published !== false)
    .map((item) => ({
      ...item,
      title: translationRowsToMap(item.banner_item_translations, 'title'),
      description: translationRowsToMap(item.banner_item_translations, 'description'),
    }))
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

function uniqueBannerItems(items) {
  const byKey = new Map();
  (items || []).forEach((item) => {
    const title = item.title?.is || item.title?.en || item.title || '';
    const key = `${title}|${item.link_url || ''}`.toLowerCase();
    if (title && !byKey.has(key)) byKey.set(key, item);
  });
  return Array.from(byKey.values()).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

function mergeBannerItems(rows) {
  const normalized = uniqueBannerItems(rows);
  const fallbackByTitle = new Map(FALLBACK_BANNER_ITEMS.map((item) => [item.title?.is || item.id, item]));
  normalized.forEach((item) => {
    fallbackByTitle.set(item.title?.is || item.id, item);
  });
  return uniqueBannerItems(Array.from(fallbackByTitle.values()));
}

function mergePages(rows) {
  const bySlug = new Map(FALLBACK_POLICY_PAGES.map(page => [page.slug, page]));
  (rows || []).forEach(page => {
    const fallbackPage = bySlug.get(page.slug);
    const translationMap = new Map(
      (fallbackPage?.page_translations || []).map((translation) => [translation.lang, translation]),
    );

    (page.page_translations || []).forEach((translation) => {
      translationMap.set(translation.lang, {
        ...(translationMap.get(translation.lang) || {}),
        ...translation,
      });
    });

    bySlug.set(page.slug, {
      ...fallbackPage,
      ...page,
      page_translations: Array.from(translationMap.values()),
    });
  });
  return Array.from(bySlug.values()).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

function mergeFacebookPosts(rows) {
  const byEmbedUrl = new Map();
  [...FALLBACK_FACEBOOK_POSTS, ...(rows || [])].forEach((post, index) => {
    const key = (post.embed_url || post.src || '').trim();
    if (!key) return;
    byEmbedUrl.set(key, {
      ...post,
      sort_order: post.sort_order ?? index,
      height: post.height || 680,
    });
  });
  return Array.from(byEmbedUrl.values()).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

export function PublicDataProvider({ children }) {
  const [state, setState] = useState({
    loading: true,
    source: 'fallback',
    translations: fallbackTranslations,
    candidates: getFallbackCandidates(),
    contact: FALLBACK_CONTACT,
    facebookPosts: FALLBACK_FACEBOOK_POSTS,
    bannerItems: FALLBACK_BANNER_ITEMS,
    settings: {
      hero_image_url: FALLBACK_HERO_IMAGE,
      hero_alt_image_url: '/Group images/32.jpg',
    },
    pages: FALLBACK_POLICY_PAGES,
  });

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setState((prev) => ({ ...prev, loading: false, source: 'fallback' }));
      return;
    }

    try {
      const [
        contentResult,
        candidatesResult,
        contactResult,
        facebookResult,
        bannerResult,
        settingsResult,
        pagesResult,
      ] = await Promise.all([
        supabase.from('site_content').select('key, lang, value'),
        supabase
          .from('candidates')
          .select('*, candidate_translations(*), candidate_images(*), candidate_qa(*)')
          .eq('is_published', true)
          .order('nr'),
        supabase.from('contact_info').select('key, value'),
        supabase.from('facebook_posts').select('*').eq('is_active', true).order('sort_order'),
        supabase.from('banner_items').select('*, banner_item_translations(*)').eq('is_published', true).order('sort_order'),
        supabase.from('site_settings').select('key, value'),
        supabase.from('pages').select('*, page_translations(*)').eq('is_published', true).order('sort_order'),
      ]);

      const hasHardError = [
        contentResult,
        candidatesResult,
        contactResult,
        facebookResult,
      ].some((result) => result.error);

      if (hasHardError) throw new Error('Public Supabase fetch failed');

      setState({
        loading: false,
        source: 'supabase',
        translations: {
          ...fallbackTranslations,
          ...rowsToTranslations(contentResult.data),
        },
        candidates: normalizeCandidates(candidatesResult.data).length
          ? normalizeCandidates(candidatesResult.data)
          : getFallbackCandidates(),
        contact: {
          ...FALLBACK_CONTACT,
          ...rowsToKeyValues(contactResult.data),
        },
        facebookPosts: mergeFacebookPosts(facebookResult.data),
        bannerItems: bannerResult.error || !bannerResult.data?.length
          ? FALLBACK_BANNER_ITEMS
          : mergeBannerItems(normalizeBannerItems(bannerResult.data)),
        settings: {
          hero_image_url: FALLBACK_HERO_IMAGE,
          hero_alt_image_url: '/Group images/32.jpg',
          ...rowsToKeyValues(settingsResult.data),
        },
        pages: pagesResult.error ? FALLBACK_POLICY_PAGES : mergePages(pagesResult.data),
      });
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        source: 'fallback',
      }));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(() => ({
    ...state,
    refresh,
  }), [state, refresh]);

  return (
    <PublicDataContext.Provider value={value}>
      {children}
    </PublicDataContext.Provider>
  );
}

export function usePublicData() {
  const ctx = useContext(PublicDataContext);
  if (!ctx) throw new Error('usePublicData must be used inside PublicDataProvider');
  return ctx;
}
