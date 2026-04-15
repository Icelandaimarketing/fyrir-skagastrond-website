import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';
import FieldEditor from '../components/FieldEditor';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';

const LANGS = ['is', 'en', 'es', 'pl', 'de', 'da', 'no'];

// All editable sections and their fields
const SECTIONS = [
  {
    id: 'hero',
    emoji: '🏠',
    label: { is: 'Forsíða (Hero)', en: 'Hero Section' },
    fields: [
      { key: 'hero.badge', label: { is: 'Merki / Badge', en: 'Badge text' }, sublabel: { is: 'Texti í litlu merki efst', en: 'Small badge at the top' }, multiline: false },
      { key: 'hero.headline.part1', label: { is: 'Fyrirsögn — hluti 1', en: 'Headline — part 1' }, sublabel: { is: '"Fyrir fólkið,"', en: '"For the people,"' }, multiline: false },
      { key: 'hero.headline.accent', label: { is: 'Fyrirsögn — áhersluhluti', en: 'Headline — accent phrase' }, sublabel: { is: '"fyrir samfélagið," (rautt)', en: '"for the community," (red)' }, multiline: false },
      { key: 'hero.headline.part3', label: { is: 'Fyrirsögn — hluti 3', en: 'Headline — part 3' }, sublabel: { is: '"fyrir framtíðina."', en: '"for the future."' }, multiline: false },
      { key: 'hero.description', label: { is: 'Lýsingartexti', en: 'Description paragraph' }, sublabel: { is: 'Lítill texti undir fyrirsögninni', en: 'Small text below the headline' }, multiline: true },
      { key: 'hero.cta', label: { is: 'Aðalhnapp', en: 'Primary CTA button' }, sublabel: { is: '"X við K" — rauður hnapp', en: '"Vote K" — red button' }, multiline: false },
      { key: 'hero.cta2', label: { is: 'Aukahnapp', en: 'Secondary CTA button' }, sublabel: { is: '"Skoða framboðslista" — útlínuhnapp', en: '"See candidates" — outline button' }, multiline: false },
    ],
  },
  {
    id: 'pillars',
    emoji: '🏛️',
    label: { is: 'Stefna og áherslur', en: 'Policy Pillars' },
    fields: [
      { key: 'pillars.badge', label: { is: 'Merki', en: 'Badge' }, multiline: false },
      { key: 'pillars.title', label: { is: 'Fyrirsögn', en: 'Section title' }, multiline: false },
      { key: 'pillars.subtitle', label: { is: 'Undirfyrirsögn', en: 'Subtitle' }, multiline: true },
      { key: 'pillar.finance.title', label: { is: 'Stoð 1 — Titill', en: 'Pillar 1 — Title' }, sublabel: { is: 'Ábyrg fjármál', en: 'Responsible finance' }, multiline: false },
      { key: 'pillar.finance.text', label: { is: 'Stoð 1 — Texti', en: 'Pillar 1 — Text' }, multiline: true },
      { key: 'pillar.people.title', label: { is: 'Stoð 2 — Titill', en: 'Pillar 2 — Title' }, sublabel: { is: 'Fyrir fólkið', en: 'For the people' }, multiline: false },
      { key: 'pillar.people.text', label: { is: 'Stoð 2 — Texti', en: 'Pillar 2 — Text' }, multiline: true },
      { key: 'pillar.future.title', label: { is: 'Stoð 3 — Titill', en: 'Pillar 3 — Title' }, sublabel: { is: 'Fyrir framtíðina', en: 'For the future' }, multiline: false },
      { key: 'pillar.future.text', label: { is: 'Stoð 3 — Texti', en: 'Pillar 3 — Text' }, multiline: true },
    ],
  },
  {
    id: 'candidates_section',
    emoji: '👥',
    label: { is: 'Framboðslistahluti', en: 'Candidates Section' },
    fields: [
      { key: 'candidates.badge', label: { is: 'Merki', en: 'Badge' }, multiline: false },
      { key: 'candidates.title', label: { is: 'Fyrirsögn', en: 'Title' }, sublabel: { is: '"Okkar fólk"', en: '"Our people"' }, multiline: false },
      { key: 'candidates.desc', label: { is: 'Lýsing', en: 'Description' }, multiline: true },
    ],
  },
  {
    id: 'about',
    emoji: 'ℹ️',
    label: { is: 'Um okkur', en: 'About Us' },
    fields: [
      { key: 'about.badge', label: { is: 'Merki', en: 'Badge' }, multiline: false },
      { key: 'about.title', label: { is: 'Fyrirsögn', en: 'Title' }, multiline: false },
      { key: 'about.text1', label: { is: 'Texti 1', en: 'Paragraph 1' }, multiline: true },
      { key: 'about.text2', label: { is: 'Texti 2', en: 'Paragraph 2' }, multiline: true },
      { key: 'about.core.slogan', label: { is: 'Kjarnaboð', en: 'Core slogan' }, sublabel: { is: 'Birtist í neðri hluta Um okkur og í neðanmáli', en: 'Shown in About section and footer' }, multiline: false },
      { key: 'about.feature1.title', label: { is: 'Eiginleiki 1 — Titill', en: 'Feature 1 — Title' }, sublabel: { is: 'Gagnsæi í stjórnun', en: 'Transparency in governance' }, multiline: false },
      { key: 'about.feature1.text', label: { is: 'Eiginleiki 1 — Texti', en: 'Feature 1 — Text' }, multiline: true },
      { key: 'about.feature2.title', label: { is: 'Eiginleiki 2 — Titill', en: 'Feature 2 — Title' }, sublabel: { is: 'Styrkja innviði', en: 'Strengthen infrastructure' }, multiline: false },
      { key: 'about.feature2.text', label: { is: 'Eiginleiki 2 — Texti', en: 'Feature 2 — Text' }, multiline: true },
      { key: 'about.feature3.title', label: { is: 'Eiginleiki 3 — Titill', en: 'Feature 3 — Title' }, sublabel: { is: 'Atvinnuuppbygging', en: 'Economic development' }, multiline: false },
      { key: 'about.feature3.text', label: { is: 'Eiginleiki 3 — Texti', en: 'Feature 3 — Text' }, multiline: true },
    ],
  },
  {
    id: 'contact_section',
    emoji: '📞',
    label: { is: 'Sambandshluti', en: 'Contact Section' },
    fields: [
      { key: 'contact.badge', label: { is: 'Merki', en: 'Badge' }, multiline: false },
      { key: 'contact.title', label: { is: 'Fyrirsögn', en: 'Title' }, multiline: false },
      { key: 'contact.desc', label: { is: 'Lýsing', en: 'Description' }, multiline: true },
    ],
  },
  {
    id: 'nav',
    emoji: '🧭',
    label: { is: 'Valmynd', en: 'Navigation' },
    fields: [
      { key: 'nav.stefna', label: { is: 'Valmynd — Stefna', en: 'Nav — Policy' }, multiline: false },
      { key: 'nav.frambod', label: { is: 'Valmynd — Framboðslisti', en: 'Nav — Candidates' }, multiline: false },
      { key: 'nav.um', label: { is: 'Valmynd — Um okkur', en: 'Nav — About' }, multiline: false },
      { key: 'nav.frettir', label: { is: 'Valmynd — Fréttir', en: 'Nav — News' }, multiline: false },
      { key: 'nav.samband', label: { is: 'Valmynd — Samband', en: 'Nav — Contact' }, multiline: false },
      { key: 'nav.subtitle', label: { is: 'Aukaheiti (undir lógó)', en: 'Subtitle (under logo)' }, sublabel: { is: '"Sveitarstjórnarkosningar"', en: '"Municipal Elections"' }, multiline: false },
    ],
  },
  {
    id: 'facebook_section',
    emoji: '📱',
    label: { is: 'Facebook hluti', en: 'Facebook Section' },
    fields: [
      { key: 'fb.badge', label: { is: 'Merki', en: 'Badge' }, multiline: false },
      { key: 'fb.title', label: { is: 'Fyrirsögn', en: 'Title' }, multiline: false },
      { key: 'fb.subtitle', label: { is: 'Undirfyrirsögn', en: 'Subtitle' }, multiline: true },
      { key: 'fb.seeall', label: { is: 'Hnapp — Sjá allt á Facebook', en: 'Button — See all on Facebook' }, multiline: false },
    ],
  },
];

export default function ContentEditor() {
  const { t, lang } = useAdminLang();
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [content, setContent] = useState({}); // { 'key:lang': value }
  const [drafts, setDrafts] = useState({});   // { 'key:lang': draftValue }
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);

  const section = SECTIONS.find(s => s.id === activeSection);
  const allKeys = section ? section.fields.map(f => f.key) : [];

  // Load content for active section from Supabase
  useEffect(() => {
    if (!activeSection) return;
    setLoading(true);
    const keys = SECTIONS.find(s => s.id === activeSection)?.fields.map(f => f.key) || [];
    supabase
      .from('site_content')
      .select('key, lang, value, draft_value, has_draft')
      .in('key', keys)
      .then(({ data, error }) => {
        if (!error && data) {
          const c = {}, d = {};
          data.forEach(row => {
            c[`${row.key}:${row.lang}`] = row.value;
            if (row.has_draft && row.draft_value !== null) {
              d[`${row.key}:${row.lang}`] = row.draft_value;
            }
          });
          setContent(c);
          setDrafts(d);
        }
        setLoading(false);
      });
  }, [activeSection]);

  // Get values for a field key
  function getValues(key) {
    const v = {};
    LANGS.forEach(l => { v[l] = content[`${key}:${l}`] || ''; });
    return v;
  }

  function getDraftValues(key) {
    const d = {};
    LANGS.forEach(l => { d[l] = drafts[`${key}:${l}`] ?? null; });
    return d;
  }

  function handleChange(key, langCode, value) {
    setDrafts(prev => ({ ...prev, [`${key}:${langCode}`]: value }));
  }

  // Count unsaved draft fields
  const draftCount = Object.keys(drafts).filter(k => {
    const [key, l] = k.split(':');
    if (!allKeys.includes(key)) return false;
    return drafts[k] !== content[k];
  }).length;

  async function saveDraft() {
    setSaving(true);
    try {
      const rows = [];
      for (const [compositeKey, draftVal] of Object.entries(drafts)) {
        const [key, langCode] = compositeKey.split(':');
        if (!allKeys.includes(key)) continue;
        const liveVal = content[compositeKey] || '';
        if (draftVal === liveVal) continue;
        rows.push({ key, lang: langCode, value: liveVal, draft_value: draftVal, has_draft: true });
      }
      if (rows.length === 0) { toast(lang === 'is' ? 'Engar breytingar til að vista' : 'No changes to save'); setSaving(false); return; }
      const { error } = await supabase.from('site_content').upsert(rows, { onConflict: 'key,lang' });
      if (error) throw error;
      toast.success(lang === 'is' ? 'Drög vistuð!' : 'Draft saved!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function publishChanges() {
    setPublishing(true);
    setConfirmPublish(false);
    try {
      const rows = [];
      for (const [compositeKey, draftVal] of Object.entries(drafts)) {
        const [key, langCode] = compositeKey.split(':');
        if (!allKeys.includes(key)) continue;
        const liveVal = content[compositeKey] || '';
        if (draftVal === liveVal) continue;
        rows.push({ key, lang: langCode, value: draftVal, draft_value: null, has_draft: false });
      }
      if (rows.length === 0) { toast(lang === 'is' ? 'Engar breytingar' : 'No changes'); setPublishing(false); return; }
      const { error } = await supabase.from('site_content').upsert(rows, { onConflict: 'key,lang' });
      if (error) throw error;
      // Update local content state
      setContent(prev => {
        const next = { ...prev };
        rows.forEach(r => { next[`${r.key}:${r.lang}`] = r.value; });
        return next;
      });
      setDrafts({});
      toast.success(lang === 'is' ? '✓ Birt á vefsíðunni!' : '✓ Published to the website!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPublishing(false);
    }
  }

  const hasDrafts = draftCount > 0;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--admin-topbar-h))', overflow: 'hidden' }}>
      {/* Section list sidebar */}
      <div style={{
        width: '240px',
        flexShrink: 0,
        background: 'var(--admin-surface)',
        borderRight: '1px solid var(--admin-border)',
        padding: '1rem 0.75rem',
        overflowY: 'auto',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--admin-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
          {lang === 'is' ? 'Hlutar síðunnar' : 'Page sections'}
        </div>
        <div className="admin-section-list">
          {SECTIONS.map(s => (
            <div
              key={s.id}
              className={`admin-section-item ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <div className="admin-section-item__icon">{s.emoji}</div>
              <div className="admin-section-item__text">
                <div className="admin-section-item__name">{s.label[lang] || s.label.is}</div>
                <div className="admin-section-item__count">{s.fields.length} {lang === 'is' ? 'reiti' : 'fields'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main editor area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        {section && (
          <>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--admin-text-1)' }}>
                  {section.emoji} {section.label[lang] || section.label.is}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--admin-text-3)', marginTop: '4px' }}>
                  {lang === 'is'
                    ? `Breyttu textainnihaldi — ${section.fields.length} reitir — allar 7 tungumál`
                    : `Edit text content — ${section.fields.length} fields — all 7 languages`}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {hasDrafts && (
                  <span className="admin-badge admin-badge--draft">
                    <span className="admin-badge__dot" />
                    {draftCount} {lang === 'is' ? 'óbirtar' : 'unsaved'}
                  </span>
                )}
                <button className="admin-btn admin-btn--secondary" onClick={saveDraft} disabled={saving || !hasDrafts}>
                  {saving ? (lang === 'is' ? 'Vistar...' : 'Saving...') : (lang === 'is' ? 'Vista drög' : 'Save draft')}
                </button>
                <button className="admin-btn admin-btn--primary" onClick={() => setConfirmPublish(true)} disabled={publishing || !hasDrafts}>
                  {publishing ? (lang === 'is' ? 'Birtir...' : 'Publishing...') : (lang === 'is' ? 'Birta breytingar' : 'Publish changes')}
                </button>
              </div>
            </div>

            {loading ? (
              <div style={{ color: 'var(--admin-text-3)', textAlign: 'center', paddingTop: '3rem' }}>
                {t('general.loading')}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {section.fields.map(field => (
                  <FieldEditor
                    key={field.key}
                    label={field.label[lang] || field.label.is}
                    sublabel={field.sublabel ? (field.sublabel[lang] || field.sublabel.is) : undefined}
                    values={getValues(field.key)}
                    draftValues={getDraftValues(field.key)}
                    onChange={(langCode, value) => handleChange(field.key, langCode, value)}
                    multiline={field.multiline}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Confirm publish dialog */}
      <ConfirmDialog
        open={confirmPublish}
        title={t('confirm.publish.title')}
        body={t('confirm.publish.body')}
        onConfirm={publishChanges}
        onCancel={() => setConfirmPublish(false)}
      />
    </div>
  );
}
