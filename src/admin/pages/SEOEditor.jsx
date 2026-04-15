import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';
import toast from 'react-hot-toast';

const SEO_FIELDS = [
  {
    key: 'seo.title',
    label: { is: 'Titill síðu', en: 'Page title' },
    hint: { is: 'Birtist í flipa vafrans og í Google niðurstöðum', en: 'Shown in browser tab and Google results' },
    multiline: false,
    defaultVal: 'Fyrir Skagaströnd — Fyrir fólkið, samfélagið og framtíðina',
  },
  {
    key: 'seo.description',
    label: { is: 'Meta lýsing', en: 'Meta description' },
    hint: { is: 'Stuttur texti sem birtist undir fyrirsögn í Google', en: 'Short text shown below the title in Google' },
    multiline: true,
    defaultVal: 'Fyrir Skagaströnd er framboð í sveitarstjórnarkosningum á Skagaströnd. X við K — Fyrir fólkið, fyrir samfélagið, fyrir framtíðina.',
  },
];

export default function SEOEditor() {
  const { lang } = useAdminLang();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from('site_content')
      .select('key, lang, value')
      .in('key', SEO_FIELDS.map(f => f.key))
      .eq('lang', 'is')
      .then(({ data, error }) => {
        if (!error && data) {
          const v = {};
          data.forEach(r => { v[r.key] = r.value; });
          setValues(v);
        }
        setLoading(false);
      });
  }, []);

  async function save() {
    setSaving(true);
    try {
      const LANGS = ['is', 'en', 'es', 'pl', 'de', 'da', 'no'];
      // Save SEO fields — title and description stay the same across languages for now
      const rows = [];
      for (const field of SEO_FIELDS) {
        for (const l of LANGS) {
          rows.push({ key: field.key, lang: l, value: values[field.key] || field.defaultVal, draft_value: null, has_draft: false });
        }
      }
      const { error } = await supabase.from('site_content').upsert(rows, { onConflict: 'key,lang' });
      if (error) throw error;
      toast.success(lang === 'is' ? '✓ SEO stillingar vistaðar!' : '✓ SEO settings saved!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page" style={{ maxWidth: '680px' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">{lang === 'is' ? 'SEO stillingar' : 'SEO Settings'}</h1>
        <p className="admin-page-subtitle">
          {lang === 'is'
            ? 'Stýrðu því hvernig vefsíðan lítur út í leitarvélum eins og Google.'
            : 'Control how the website appears in search engines like Google.'}
        </p>
      </div>

      {loading ? (
        <div style={{ color: 'var(--admin-text-3)', textAlign: 'center', paddingTop: '2rem' }}>
          {lang === 'is' ? 'Hleður...' : 'Loading...'}
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-card__body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {SEO_FIELDS.map(field => (
              <div key={field.key} className="admin-form-group">
                <label className="admin-label" htmlFor={field.key}>
                  {field.label[lang] || field.label.is}
                </label>
                {field.multiline ? (
                  <textarea
                    id={field.key}
                    className="admin-textarea"
                    value={values[field.key] || ''}
                    onChange={e => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                    rows={3}
                    placeholder={field.defaultVal}
                  />
                ) : (
                  <input
                    id={field.key}
                    type="text"
                    className="admin-input"
                    value={values[field.key] || ''}
                    onChange={e => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.defaultVal}
                  />
                )}
                <div style={{ fontSize: '11.5px', color: 'var(--admin-text-3)', marginTop: '4px' }}>
                  💡 {field.hint[lang] || field.hint.is}
                </div>
              </div>
            ))}

            <div className="admin-divider" />

            <div style={{ background: 'var(--admin-surface-2)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--admin-text-2)', marginBottom: '0.5rem' }}>
                {lang === 'is' ? 'Google forskoðun' : 'Google preview'}
              </div>
              <div style={{ fontSize: '18px', color: '#8ab4f8', fontWeight: 500, lineHeight: 1.3 }}>
                {values['seo.title'] || 'Fyrir Skagaströnd — Fyrir fólkið, samfélagið og framtíðina'}
              </div>
              <div style={{ fontSize: '13px', color: '#4db05a', marginTop: '2px' }}>
                fyrirskagastrond.com
              </div>
              <div style={{ fontSize: '13px', color: 'var(--admin-text-2)', marginTop: '4px', lineHeight: 1.5 }}>
                {values['seo.description'] || 'Fyrir Skagaströnd er framboð í sveitarstjórnarkosningum á Skagaströnd.'}
              </div>
            </div>

            <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving} style={{ alignSelf: 'flex-end' }}>
              {saving ? (lang === 'is' ? 'Vistar...' : 'Saving...') : (lang === 'is' ? 'Vista SEO stillingar' : 'Save SEO settings')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
