import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';
import toast from 'react-hot-toast';

const LANGS = ['is', 'en', 'es', 'pl', 'de', 'da', 'no'];

function emptyTranslations() {
  return LANGS.reduce((acc, code) => {
    acc[code] = { title: '', summary: '', body: '' };
    return acc;
  }, {});
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function PagesManager() {
  const { lang } = useAdminLang();
  const [pages, setPages] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeLang, setActiveLang] = useState('is');
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from('pages')
      .select('*, page_translations(*)')
      .order('sort_order');
    if (error) {
      toast.error(error.message);
      return;
    }
    const next = (data || []).map(page => {
      const translations = emptyTranslations();
      page.page_translations?.forEach(row => {
        translations[row.lang] = {
          title: row.title || '',
          summary: row.summary || '',
          body: row.body || '',
        };
      });
      return { ...page, translations };
    });
    setPages(next);
    setActiveId(next[0]?.id || null);
  }

  useEffect(() => { load(); }, []);

  const active = pages.find(page => page.id === activeId);

  function updateActive(patch) {
    setPages(prev => prev.map(page => page.id === activeId ? { ...page, ...patch } : page));
  }

  function updateTranslation(field, value) {
    setPages(prev => prev.map(page => {
      if (page.id !== activeId) return page;
      return {
        ...page,
        translations: {
          ...page.translations,
          [activeLang]: {
            ...page.translations[activeLang],
            [field]: value,
          },
        },
      };
    }));
  }

  async function addPage() {
    const slug = `malefni-${Date.now()}`;
    const { data, error } = await supabase
      .from('pages')
      .insert({ slug, sort_order: pages.length, is_published: false })
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    const page = { ...data, translations: emptyTranslations() };
    setPages(prev => [...prev, page]);
    setActiveId(page.id);
  }

  async function save() {
    if (!active) return;
    const slug = slugify(active.slug);
    const title = active.translations.is?.title?.trim();
    const summary = active.translations.is?.summary?.trim();
    const body = active.translations.is?.body?.trim();

    if (!slug) {
      toast.error(lang === 'is' ? 'Sida þarf gilt slug' : 'Page needs a valid slug');
      return;
    }
    if (!title) {
      toast.error(lang === 'is' ? 'Sida þarf islenskan titil ad minnsta kosti' : 'Page needs at least an Icelandic title');
      return;
    }
    if (!summary) {
      toast.error(lang === 'is' ? 'Sida þarf stutta lysingu ad minnsta kosti' : 'Page needs at least a short summary');
      return;
    }
    if (!body) {
      toast.error(lang === 'is' ? 'Sida þarf meginmalsgreinar ad minnsta kosti' : 'Page needs body content before it can be saved');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from('pages').update({
        slug,
        hero_image_url: active.hero_image_url?.trim() || null,
        og_image_url: active.og_image_url?.trim() || null,
        sort_order: Number(active.sort_order) || 0,
        is_published: Boolean(active.is_published),
      }).eq('id', active.id);
      if (error) throw error;

      const rows = LANGS.map(code => ({
        page_id: active.id,
        lang: code,
        title: active.translations[code]?.title || '',
        summary: active.translations[code]?.summary || '',
        body: active.translations[code]?.body || '',
      }));
      const { error: translationError } = await supabase
        .from('page_translations')
        .upsert(rows, { onConflict: 'page_id,lang' });
      if (translationError) throw translationError;
      toast.success(lang === 'is' ? 'Sida vistud' : 'Page saved');
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header__top">
          <div>
            <h1 className="admin-page-title">{lang === 'is' ? 'Malefnasidur' : 'Policy Pages'}</h1>
            <p className="admin-page-subtitle">
              {lang === 'is' ? 'Undirbuningur fyrir stefnu og markmid sem koma sidar.' : 'Prepare future policy and goal pages.'}
            </p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={addPage}>{lang === 'is' ? 'Ny sida' : 'New page'}</button>
        </div>
      </div>

      <div className="admin-editor-split">
        <div className="admin-card">
          <div className="admin-card__body">
            <div className="admin-section-list">
              {pages.map(page => (
                <button key={page.id} className={`admin-section-item ${activeId === page.id ? 'active' : ''}`} onClick={() => setActiveId(page.id)}>
                  <span className="admin-section-item__icon">DOC</span>
                  <span className="admin-section-item__text">
                    <span className="admin-section-item__name">{page.translations.is?.title || page.slug}</span>
                    <span className="admin-section-item__count">/malefni/{page.slug}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {active ? (
          <div className="admin-card">
            <div className="admin-card__header">
              <div className="admin-card__title">{lang === 'is' ? 'Breyta sidu' : 'Edit page'}</div>
              <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
            <div className="admin-card__body admin-form-stack">
              <label className="admin-toggle">
                <input className="admin-toggle__input" type="checkbox" checked={Boolean(active.is_published)} onChange={e => updateActive({ is_published: e.target.checked })} />
                <span className="admin-toggle__track"><span className="admin-toggle__thumb" /></span>
                <span className="admin-toggle__label">{lang === 'is' ? 'Birt a vef' : 'Published'}</span>
              </label>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Slug</label>
                  <input className="admin-input" value={active.slug || ''} onChange={e => updateActive({ slug: slugify(e.target.value) })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Sort order</label>
                  <input className="admin-input" type="number" value={active.sort_order || 0} onChange={e => updateActive({ sort_order: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Hero image URL</label>
                <input className="admin-input" value={active.hero_image_url || ''} onChange={e => updateActive({ hero_image_url: e.target.value })} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">OG image URL</label>
                <input className="admin-input" value={active.og_image_url || ''} onChange={e => updateActive({ og_image_url: e.target.value })} />
              </div>

              <div className="admin-lang-tabs">
                {LANGS.map(code => (
                  <button key={code} className={`admin-lang-tab ${activeLang === code ? 'active' : ''}`} onClick={() => setActiveLang(code)}>
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Title</label>
                <input className="admin-input" value={active.translations[activeLang]?.title || ''} onChange={e => updateTranslation('title', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Summary</label>
                <textarea className="admin-textarea" rows={3} value={active.translations[activeLang]?.summary || ''} onChange={e => updateTranslation('summary', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Body</label>
                <textarea className="admin-textarea" rows={10} value={active.translations[activeLang]?.body || ''} onChange={e => updateTranslation('body', e.target.value)} />
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-empty">{lang === 'is' ? 'Engar sidur enn.' : 'No pages yet.'}</div>
        )}
      </div>
    </div>
  );
}
