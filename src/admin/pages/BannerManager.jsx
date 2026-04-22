import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';
import toast from 'react-hot-toast';
import { loadMediaImages, uploadMediaAsset } from '../lib/mediaAssets';

const LANGS = ['is', 'en', 'es', 'pl', 'de', 'da', 'no'];
const BANNER_MEDIA_USAGES = new Set(['banner', 'hero', 'general', 'branding']);

function emptyTranslations() {
  return LANGS.reduce((acc, lang) => {
    acc[lang] = { title: '', description: '' };
    return acc;
  }, {});
}

function normalizeBanner(item) {
  const translations = emptyTranslations();
  item.banner_item_translations?.forEach(row => {
    translations[row.lang] = {
      title: row.title || '',
      description: row.description || '',
    };
  });
  return { ...item, translations };
}

function isValidBannerLink(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return true;

  try {
    const url = new URL(trimmed);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

export default function BannerManager() {
  const { lang } = useAdminLang();
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeLang, setActiveLang] = useState('is');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mediaImages, setMediaImages] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageSearch, setImageSearch] = useState('');
  const [showCustomUrl, setShowCustomUrl] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('banner_items')
      .select('*, banner_item_translations(*)')
      .order('sort_order');
    if (error) {
      toast.error(error.message);
    } else {
      const next = (data || []).map(normalizeBanner);
      setItems(next);
      setActiveId(current => current && next.some(item => item.id === current) ? current : next[0]?.id || null);
    }
    setLoading(false);
  }

  async function loadBannerImages() {
    setMediaLoading(true);
    setMediaError('');
    try {
      const { images, errors } = await loadMediaImages({
        buckets: ['site-images'],
        includeStorage: true,
        dedupeBy: 'path',
      });
      setMediaImages(images.filter(image =>
        image.bucket === 'site-images'
        && (!image.usage || BANNER_MEDIA_USAGES.has(image.usage))
        && image.url
        && image.size
      ));
      if (errors.length) setMediaError(errors.join(' | '));
    } catch (error) {
      const message = error.message || String(error);
      setMediaError(message);
      toast.error(message);
    } finally {
      setMediaLoading(false);
    }
  }

  useEffect(() => {
    load();
    loadBannerImages();
  }, []);

  const active = items.find(item => item.id === activeId);
  const selectedImage = active?.image_url
    ? mediaImages.find(image => image.url === active.image_url)
    : null;
  const filteredMediaImages = mediaImages.filter(image => {
    const query = imageSearch.trim().toLowerCase();
    if (!query) return true;
    return [image.title, image.alt_text, image.path, image.usage]
      .filter(Boolean)
      .some(value => String(value).toLowerCase().includes(query));
  });

  function updateActive(patch) {
    setItems(prev => prev.map(item => item.id === activeId ? { ...item, ...patch } : item));
  }

  function updateTranslation(field, value) {
    setItems(prev => prev.map(item => {
      if (item.id !== activeId) return item;
      return {
        ...item,
        translations: {
          ...item.translations,
          [activeLang]: {
            ...item.translations[activeLang],
            [field]: value,
          },
        },
      };
    }));
  }

  async function addItem() {
    const { data, error } = await supabase
      .from('banner_items')
      .insert({
        type: 'goal',
        image_url: mediaImages[0]?.url || '',
        link_url: '#frettir',
        sort_order: items.length,
        is_published: false,
      })
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    const newItem = { ...data, translations: emptyTranslations() };
    setItems(prev => [...prev, newItem]);
    setActiveId(newItem.id);
    toast.success(lang === 'is' ? 'Nyr banner buinn til' : 'New banner created');
  }

  async function uploadBannerImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error(lang === 'is' ? 'Mynd ma ekki vera staerri en 5MB' : 'Image must be smaller than 5MB');
      event.target.value = '';
      return;
    }

    setUploadingImage(true);
    try {
      const image = await uploadMediaAsset(file, {
        bucket: 'site-images',
        prefix: 'banner',
        usage: 'banner',
        title: file.name,
        altText: file.name,
      });
      setMediaImages(prev => {
        const byUrl = new Map(prev.map(item => [item.url || `${item.bucket}:${item.path}`, item]));
        byUrl.set(image.url, image);
        return Array.from(byUrl.values()).sort((a, b) => a.path.localeCompare(b.path));
      });
      updateActive({ image_url: image.url });
      toast.success(lang === 'is' ? 'Mynd hladin upp og valin' : 'Image uploaded and selected');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  }

  async function save() {
    if (!active) return;
    if (!active.image_url?.trim()) {
      toast.error(lang === 'is' ? 'Veldu eda hladdu upp banner mynd adur en thu vistar' : 'Choose or upload a banner image before saving');
      return;
    }
    if (!active.translations.is?.title?.trim()) {
      toast.error(lang === 'is' ? 'Banner þarf islenskan titil ad minnsta kosti' : 'A banner needs at least an Icelandic title');
      return;
    }
    if (!isValidBannerLink(active.link_url)) {
      toast.error(lang === 'is'
        ? 'Settu inn giltan hlekk, til dæmis /malefni/... eða fullt https:// URL'
        : 'Provide a valid link, such as /malefni/... or a full https:// URL');
      return;
    }
    setSaving(true);
    try {
      const imageUrl = active.image_url.trim();
      const linkUrl = active.link_url.trim();
      const { error } = await supabase.from('banner_items').update({
        type: (active.type || 'goal').trim(),
        image_url: imageUrl,
        link_url: linkUrl,
        sort_order: Number(active.sort_order) || 0,
        is_published: Boolean(active.is_published),
      }).eq('id', active.id);
      if (error) throw error;

      const rows = LANGS.map(code => ({
        banner_item_id: active.id,
        lang: code,
        title: active.translations[code]?.title || '',
        description: active.translations[code]?.description || '',
      }));
      const { error: translationError } = await supabase
        .from('banner_item_translations')
        .upsert(rows, { onConflict: 'banner_item_id,lang' });
      if (translationError) throw translationError;

      const { data: savedBanner, error: verifyError } = await supabase
        .from('banner_items')
        .select('id, image_url')
        .eq('id', active.id)
        .single();
      if (verifyError) throw verifyError;
      if (savedBanner.image_url !== imageUrl) {
        throw new Error(lang === 'is'
          ? 'Banner vistadist en myndaslod stemmir ekki eftir endurlesningu'
          : 'Banner saved, but the image URL did not match after reload');
      }

      toast.success(lang === 'is' ? 'Banner vistadur' : 'Banner saved');
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
            <h1 className="admin-page-title">{lang === 'is' ? 'Skroll banner' : 'Scrolling Banner'}</h1>
            <p className="admin-page-subtitle">
              {lang === 'is' ? 'Styrir myndabannernum fyrir framan nyjustu frettir.' : 'Controls the image banner before Latest News.'}
            </p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={addItem}>
            {lang === 'is' ? 'Baeta vid' : 'Add item'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="admin-empty">{lang === 'is' ? 'Hledur...' : 'Loading...'}</div>
      ) : (
        <div className="admin-editor-split">
          <div className="admin-card">
            <div className="admin-card__header">
              <div>
                <div className="admin-card__title">{lang === 'is' ? 'Bannerar' : 'Banners'}</div>
                <div className="admin-card__subtitle">{items.length} {lang === 'is' ? 'atridi' : 'items'}</div>
              </div>
              <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={addItem}>
                {lang === 'is' ? 'Baeta vid' : 'Add'}
              </button>
            </div>
            <div className="admin-card__body">
              <div className="admin-section-list">
                {items.map(item => (
                  <button
                    key={item.id}
                    className={`admin-section-item ${activeId === item.id ? 'active' : ''}`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="admin-section-item__thumb">
                      {item.image_url ? <img src={item.image_url} alt="" /> : 'IMG'}
                    </span>
                    <span className="admin-section-item__text">
                      <span className="admin-section-item__name">{item.translations.is?.title || item.type || 'Banner'}</span>
                      <span className="admin-section-item__count">{item.is_published ? 'Live' : 'Draft'}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {active && (
            <div className="admin-card">
              <div className="admin-card__header">
                <div className="admin-card__title">{lang === 'is' ? 'Breyta banner' : 'Edit banner item'}</div>
                <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>
                  {saving ? 'Saving...' : (lang === 'is' ? 'Vista' : 'Save')}
                </button>
              </div>
              <div className="admin-card__body admin-form-stack">
                <label className="admin-toggle">
                  <input
                    className="admin-toggle__input"
                    type="checkbox"
                    checked={Boolean(active.is_published)}
                    onChange={event => updateActive({ is_published: event.target.checked })}
                  />
                  <span className="admin-toggle__track"><span className="admin-toggle__thumb" /></span>
                  <span className="admin-toggle__label">{lang === 'is' ? 'Birt a vef' : 'Published'}</span>
                </label>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Type</label>
                    <input className="admin-input" value={active.type || ''} onChange={e => updateActive({ type: e.target.value })} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Sort order</label>
                    <input className="admin-input" type="number" value={active.sort_order || 0} onChange={e => updateActive({ sort_order: e.target.value })} />
                  </div>
                </div>

                <div className="admin-form-group">
                  <div className="admin-label-row">
                    <label className="admin-label">{lang === 'is' ? 'Banner mynd' : 'Banner image'}</label>
                    <div className="admin-inline-actions">
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" type="button" onClick={loadBannerImages}>
                        {lang === 'is' ? 'Endurhlada' : 'Refresh'}
                      </button>
                      <label className="admin-btn admin-btn--primary admin-btn--sm" style={{ cursor: 'pointer' }}>
                        {uploadingImage ? (lang === 'is' ? 'Hled upp...' : 'Uploading...') : (lang === 'is' ? 'Hlad upp mynd' : 'Upload image')}
                        <input type="file" accept="image/*" onChange={uploadBannerImage} style={{ display: 'none' }} disabled={uploadingImage} />
                      </label>
                    </div>
                  </div>

                  <div className="admin-selected-image">
                    {active.image_url ? (
                      <>
                        <img src={active.image_url} alt={selectedImage?.alt_text || selectedImage?.title || ''} />
                        <div>
                          <strong>{selectedImage?.title || selectedImage?.path || (lang === 'is' ? 'Sersnidin mynd' : 'Custom image')}</strong>
                          <span>{selectedImage?.usage || active.image_url}</span>
                        </div>
                      </>
                    ) : (
                      <div className="admin-selected-image__empty">{lang === 'is' ? 'Veldu mynd eda hladadu upp nyrri.' : 'Select an image or upload a new one.'}</div>
                    )}
                  </div>

                  {mediaError && (
                    <div className="admin-alert admin-alert--error" style={{ marginBottom: '0.75rem' }}>
                      {mediaError}
                    </div>
                  )}

                  <input
                    className="admin-input admin-image-search"
                    value={imageSearch}
                    onChange={event => setImageSearch(event.target.value)}
                    placeholder={lang === 'is' ? 'Leita i myndabanka...' : 'Search media library...'}
                  />

                  {mediaLoading ? (
                    <div className="admin-empty admin-empty--compact">{lang === 'is' ? 'Hledur myndum...' : 'Loading images...'}</div>
                  ) : filteredMediaImages.length === 0 ? (
                    <div className="admin-empty admin-empty--compact">{lang === 'is' ? 'Engar myndir fundust.' : 'No images found.'}</div>
                  ) : (
                    <div className="admin-image-picker">
                      {filteredMediaImages.map(image => (
                        <button
                          key={`${image.bucket}:${image.path}`}
                          type="button"
                          className={`admin-image-picker__item ${active.image_url === image.url ? 'active' : ''}`}
                          onClick={() => updateActive({ image_url: image.url })}
                          title={image.title || image.path}
                        >
                          <img src={image.url} alt={image.alt_text || image.title || image.path} />
                          <span>{image.title || image.path}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    type="button"
                    onClick={() => setShowCustomUrl(prev => !prev)}
                  >
                    {showCustomUrl ? (lang === 'is' ? 'Fela sersnidna slod' : 'Hide custom URL') : (lang === 'is' ? 'Nota sersnidna slod' : 'Use custom URL')}
                  </button>
                  {showCustomUrl && (
                    <input
                      className="admin-input"
                      value={active.image_url || ''}
                      onChange={e => updateActive({ image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  )}
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Link URL</label>
                  <input
                    className="admin-input"
                    value={active.link_url || ''}
                    onChange={e => updateActive({ link_url: e.target.value })}
                    placeholder="/malefni/abyrg-fjarmal"
                  />
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
                  <label className="admin-label">Description</label>
                  <textarea className="admin-textarea" value={active.translations[activeLang]?.description || ''} onChange={e => updateTranslation('description', e.target.value)} />
                </div>

                {active.image_url && (
                  <img src={active.image_url} alt="" className="admin-preview-image" />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
