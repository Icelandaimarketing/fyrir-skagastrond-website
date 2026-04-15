import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';
import ImageUploader from '../components/ImageUploader';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';

const LANGS = [
  { code: 'is', label: 'IS', flag: '🇮🇸', full: 'Íslenska' },
  { code: 'en', label: 'EN', flag: '🇬🇧', full: 'English' },
  { code: 'es', label: 'ES', flag: '🇪🇸', full: 'Español' },
  { code: 'pl', label: 'PL', flag: '🇵🇱', full: 'Polski' },
  { code: 'de', label: 'DE', flag: '🇩🇪', full: 'Deutsch' },
  { code: 'da', label: 'DA', flag: '🇩🇰', full: 'Dansk' },
  { code: 'no', label: 'NO', flag: '🇳🇴', full: 'Norsk' },
];

export default function CandidateEditor() {
  const { slug } = useParams();
  const { t, lang } = useAdminLang();
  const [candidate, setCandidate] = useState(null);
  const [translations, setTranslations] = useState({});
  const [draftTrans, setDraftTrans] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [activeTab, setActiveTab] = useState('is');
  const [activeField, setActiveField] = useState('role'); // 'role' | 'bio'
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('candidates')
        .select(`*, candidate_translations(*)`)
        .eq('slug', slug)
        .single();
      if (!error && data) {
        setCandidate(data);
        setImageUrl(data.image_url || '');
        const t = {};
        const d = {};
        data.candidate_translations?.forEach(tr => {
          t[tr.lang] = { role: tr.role || '', bio: tr.bio || '' };
          d[tr.lang] = {
            role: tr.has_draft && tr.draft_role !== null ? tr.draft_role : tr.role || '',
            bio: tr.has_draft && tr.draft_bio !== null ? tr.draft_bio : tr.bio || '',
          };
        });
        setTranslations(t);
        setDraftTrans(d);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  function handleChange(langCode, field, value) {
    setDraftTrans(prev => ({
      ...prev,
      [langCode]: { ...prev[langCode] || {}, [field]: value },
    }));
  }

  async function saveDraft() {
    setSaving(true);
    try {
      const { data: cand } = await supabase.from('candidates').select('id').eq('slug', slug).single();
      const rows = LANGS.map(l => ({
        candidate_id: cand.id,
        lang: l.code,
        role: translations[l.code]?.role || '',
        bio: translations[l.code]?.bio || '',
        draft_role: draftTrans[l.code]?.role ?? null,
        draft_bio: draftTrans[l.code]?.bio ?? null,
        has_draft: true,
      }));
      const { error } = await supabase.from('candidate_translations').upsert(rows, { onConflict: 'candidate_id,lang' });
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
      const { data: cand } = await supabase.from('candidates').select('id').eq('slug', slug).single();
      const rows = LANGS.map(l => ({
        candidate_id: cand.id,
        lang: l.code,
        role: draftTrans[l.code]?.role || translations[l.code]?.role || '',
        bio: draftTrans[l.code]?.bio || translations[l.code]?.bio || '',
        draft_role: null,
        draft_bio: null,
        has_draft: false,
      }));
      const { error } = await supabase.from('candidate_translations').upsert(rows, { onConflict: 'candidate_id,lang' });
      if (error) throw error;
      // Update image if changed
      if (imageUrl && imageUrl !== candidate.image_url) {
        await supabase.from('candidates').update({ image_url: imageUrl }).eq('id', cand.id);
      }
      setTranslations(prev => {
        const n = {};
        LANGS.forEach(l => { n[l.code] = { role: draftTrans[l.code]?.role || '', bio: draftTrans[l.code]?.bio || '' }; });
        return n;
      });
      toast.success(lang === 'is' ? '✓ Birt á vefsíðunni!' : '✓ Published to the website!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPublishing(false);
    }
  }

  if (loading) return <div className="admin-page" style={{color:'var(--admin-text-3)',textAlign:'center',paddingTop:'3rem'}}>{t('general.loading')}</div>;
  if (!candidate) return <div className="admin-page"><div style={{color:'var(--admin-text-2)'}}>Candidate not found.</div></div>;

  const currentDraft = draftTrans[activeTab] || {};
  const currentLive = translations[activeTab] || {};
  const isLead = candidate.nr === 1;

  return (
    <div className="admin-page" style={{ maxWidth: '900px' }}>
      {/* Back button */}
      <Link to="/admin/candidates" className="admin-btn admin-btn--ghost admin-btn--sm" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        {t('candidates.back')}
      </Link>

      <div className="admin-page-header">
        <div className="admin-page-header__top">
          <div>
            <h1 className="admin-page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: isLead ? '#FFD700' : 'var(--admin-red)',
                color: isLead ? '#1a1a1a' : 'white',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', fontWeight: 800, flexShrink: 0,
              }}>{candidate.nr}</span>
              {candidate.name}
            </h1>
            {isLead && (
              <span className="admin-badge admin-badge--live" style={{ marginTop: '0.5rem' }}>
                ⭐ {lang === 'is' ? 'Oddviti' : 'Lead candidate'}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="admin-btn admin-btn--secondary" onClick={saveDraft} disabled={saving}>
              {saving ? (lang === 'is' ? 'Vistar...' : 'Saving...') : (lang === 'is' ? 'Vista drög' : 'Save draft')}
            </button>
            <button className="admin-btn admin-btn--primary" onClick={() => setConfirmPublish(true)} disabled={publishing}>
              {publishing ? (lang === 'is' ? 'Birtir...' : 'Publishing...') : (lang === 'is' ? 'Birta breytingar' : 'Publish changes')}
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left — Photo upload */}
        <div>
          <div className="admin-card">
            <div className="admin-card__header">
              <div className="admin-card__title">{t('candidates.photo')}</div>
            </div>
            <div className="admin-card__body">
              <ImageUploader
                bucket="candidate-photos"
                path={`${candidate.slug}.jpg`}
                currentUrl={imageUrl}
                onUploaded={(url) => setImageUrl(url)}
              />
            </div>
          </div>
          <div className="admin-card" style={{ marginTop: '1rem' }}>
            <div className="admin-card__header">
              <div className="admin-card__title">{lang === 'is' ? 'Nafn' : 'Name'}</div>
            </div>
            <div className="admin-card__body">
              <div style={{ fontSize: '13px', color: 'var(--admin-text-1)', fontWeight: 600, marginBottom: '0.4rem' }}>
                {candidate.name}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--admin-text-3)', lineHeight: 1.5 }}>
                {t('candidates.name_note')}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Translations editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Language tabs */}
          <div className="admin-lang-tabs">
            {LANGS.map(l => (
              <button
                key={l.code}
                className={`admin-lang-tab ${activeTab === l.code ? 'active' : ''}`}
                onClick={() => setActiveTab(l.code)}
                title={l.full}
              >
                <span>{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>

          {/* Field selector tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['role', 'bio'].map(f => (
              <button
                key={f}
                className={`admin-btn ${activeField === f ? 'admin-btn--primary' : 'admin-btn--secondary'} admin-btn--sm`}
                onClick={() => setActiveField(f)}
              >
                {f === 'role'
                  ? (lang === 'is' ? 'Starfsheiti' : 'Job title')
                  : (lang === 'is' ? 'Ævisaga / Kynning' : 'Biography')
                }
              </button>
            ))}
          </div>

          {/* Active field */}
          <div className="admin-card">
            <div className="admin-card__header">
              <div>
                <div className="admin-card__title">
                  {LANGS.find(l => l.code === activeTab)?.flag} {LANGS.find(l => l.code === activeTab)?.full}
                  {' — '}
                  {activeField === 'role'
                    ? (lang === 'is' ? 'Starfsheiti' : 'Job title')
                    : (lang === 'is' ? 'Ævisaga / Kynning' : 'Biography')
                  }
                </div>
                {currentLive[activeField] && currentDraft[activeField] !== currentLive[activeField] && (
                  <div className="admin-card__subtitle" style={{ color: 'var(--admin-amber)', marginTop: '2px' }}>
                    {lang === 'is' ? '⚠ Óbirtar breytingar' : '⚠ Unsaved changes'}
                  </div>
                )}
              </div>
            </div>
            <div className="admin-card__body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeField === 'role' ? (
                <input
                  type="text"
                  className="admin-input"
                  value={currentDraft.role || ''}
                  onChange={e => handleChange(activeTab, 'role', e.target.value)}
                  placeholder={lang === 'is' ? 'Starfsheiti á þessu tungumáli...' : 'Job title in this language...'}
                />
              ) : (
                <textarea
                  className="admin-textarea"
                  value={currentDraft.bio || ''}
                  onChange={e => handleChange(activeTab, 'bio', e.target.value)}
                  rows={8}
                  placeholder={lang === 'is' ? 'Ævisaga og kynning á þessu tungumáli...' : 'Biography in this language...'}
                />
              )}

              {/* Compare */}
              {currentLive[activeField] && currentDraft[activeField] !== currentLive[activeField] && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    {lang === 'is' ? 'Birt á vef' : 'Currently live'}
                  </div>
                  <div className="field-editor__live-value">{currentLive[activeField]}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
