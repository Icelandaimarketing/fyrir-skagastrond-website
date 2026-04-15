import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';
import toast from 'react-hot-toast';

const FIELDS = [
  { key: 'phone', icon: '📞', label: { is: 'Símanúmer', en: 'Phone number' }, type: 'tel', placeholder: '000 0000' },
  { key: 'email', icon: '✉️', label: { is: 'Netfang', en: 'Email address' }, type: 'email', placeholder: 'xk.fyrirskagastrond@gmail.com' },
  { key: 'facebook_url', icon: '📘', label: { is: 'Facebook síðuslóð', en: 'Facebook page URL' }, type: 'url', placeholder: 'https://www.facebook.com/...' },
  { key: 'location', icon: '📍', label: { is: 'Staðsetning', en: 'Location' }, type: 'text', placeholder: 'Skagaströnd, Ísland' },
];

export default function ContactEditor() {
  const { t, lang } = useAdminLang();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('contact_info').select('*').then(({ data, error }) => {
      if (!error && data) {
        const v = {};
        data.forEach(row => { v[row.key] = row.value; });
        setValues(v);
      }
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    try {
      const rows = FIELDS.map(f => ({ key: f.key, value: values[f.key] || '', updated_at: new Date().toISOString() }));
      const { error } = await supabase.from('contact_info').upsert(rows, { onConflict: 'key' });
      if (error) throw error;
      toast.success(lang === 'is' ? '✓ Vistað og birt á vef!' : '✓ Saved and live on the website!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page" style={{ maxWidth: '680px' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">{t('contact.title')}</h1>
        <p className="admin-page-subtitle">{t('contact.subtitle')}</p>
      </div>

      {loading ? (
        <div style={{ color: 'var(--admin-text-3)', textAlign: 'center', paddingTop: '2rem' }}>{t('general.loading')}</div>
      ) : (
        <div className="admin-card">
          <div className="admin-card__body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {FIELDS.map(field => (
              <div key={field.key} className="admin-form-group">
                <label className="admin-label" htmlFor={`contact-${field.key}`}>
                  {field.icon} {field.label[lang] || field.label.is}
                </label>
                <input
                  id={`contact-${field.key}`}
                  type={field.type}
                  className="admin-input"
                  value={values[field.key] || ''}
                  onChange={e => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className="admin-divider" />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '13px', color: 'var(--admin-text-3)' }}>
                {lang === 'is'
                  ? '💡 Sambandsupplýsingar birtast strax á vefsíðunni þegar þú vistar.'
                  : '💡 Contact details go live immediately when you save.'}
              </div>
              <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>
                {saving
                  ? (lang === 'is' ? 'Vistar...' : 'Saving...')
                  : (lang === 'is' ? 'Vista og birta' : 'Save & publish')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
