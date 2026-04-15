import React from 'react';
import { useAdminLang } from '../context/AdminLangContext';

const LANGS = [
  { code: 'is', label: 'IS', flag: '🇮🇸', full: 'Íslenska' },
  { code: 'en', label: 'EN', flag: '🇬🇧', full: 'English' },
  { code: 'es', label: 'ES', flag: '🇪🇸', full: 'Español' },
  { code: 'pl', label: 'PL', flag: '🇵🇱', full: 'Polski' },
  { code: 'de', label: 'DE', flag: '🇩🇪', full: 'Deutsch' },
  { code: 'da', label: 'DA', flag: '🇩🇰', full: 'Dansk' },
  { code: 'no', label: 'NO', flag: '🇳🇴', full: 'Norsk' },
];

/**
 * FieldEditor — edits a single translation key across all 7 languages.
 *
 * Props:
 *   label       {string}  — Human-readable field name
 *   sublabel    {string}  — Where it appears on the site (optional)
 *   values      {object}  — { is, en, es, pl, de, da, no } — live/current values
 *   draftValues {object}  — { is, en, es, pl, de, da, no } — draft values (may be null)
 *   onChange    {fn}      — (lang, value) => void — called as user types
 *   multiline   {boolean} — textarea vs input
 */
export default function FieldEditor({ label, sublabel, values = {}, draftValues = {}, onChange, multiline = false }) {
  const { lang: uiLang } = useAdminLang();
  const [activeLang, setActiveLang] = React.useState('is');

  const currentDraft = draftValues[activeLang] ?? values[activeLang] ?? '';
  const currentLive = values[activeLang] ?? '';
  const hasDraftForLang = (l) => {
    const d = draftValues[l];
    return d !== null && d !== undefined && d !== values[l];
  };
  const hasDraftAny = LANGS.some(l => hasDraftForLang(l.code));

  return (
    <div className={`field-editor ${hasDraftAny ? 'field-editor--has-draft' : ''}`}>
      <div className="field-editor__header">
        <div>
          <div className="field-editor__label">{label}</div>
          {sublabel && <div className="field-editor__sublabel">{sublabel}</div>}
        </div>
        <div className="field-editor__meta">
          {hasDraftAny && (
            <span className="admin-badge admin-badge--draft">
              <span className="admin-badge__dot" />
              {uiLang === 'is' ? 'Óbirtar breytingar' : 'Unsaved changes'}
            </span>
          )}
          <span className="field-editor__char-count">
            {currentDraft.length} {uiLang === 'is' ? 'stafir' : 'chars'}
          </span>
        </div>
      </div>

      <div className="field-editor__body">
        {/* Language tabs */}
        <div className="admin-lang-tabs">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={`admin-lang-tab ${activeLang === l.code ? 'active' : ''} ${hasDraftForLang(l.code) ? 'has-draft' : ''}`}
              onClick={() => setActiveLang(l.code)}
              title={l.full}
            >
              <span>{l.flag}</span>
              {l.label}
              <span className="admin-lang-tab__dot" />
            </button>
          ))}
        </div>

        {/* Edit field */}
        {multiline ? (
          <textarea
            className="admin-textarea"
            value={currentDraft}
            onChange={e => onChange(activeLang, e.target.value)}
            rows={4}
            placeholder={currentLive || `${label} (${activeLang.toUpperCase()})`}
          />
        ) : (
          <input
            type="text"
            className="admin-input"
            value={currentDraft}
            onChange={e => onChange(activeLang, e.target.value)}
            placeholder={currentLive || `${label} (${activeLang.toUpperCase()})`}
          />
        )}

        {/* Compare: show live value if draft differs */}
        {hasDraftForLang(activeLang) && currentLive && currentLive !== currentDraft && (
          <div className="field-editor__compare">
            <div className="field-editor__compare-col">
              <div className="field-editor__compare-label">
                {uiLang === 'is' ? 'Birt á vef' : 'Currently live'}
              </div>
              <div className="field-editor__live-value">{currentLive}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
