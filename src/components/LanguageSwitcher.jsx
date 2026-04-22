import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, LANGUAGES } from '../i18n/LanguageContext';
import { useTranslation } from '../i18n/useTranslation';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher__btn"
        onClick={() => setOpen(!open)}
        aria-label={t('languageSwitcher.aria')}
        aria-expanded={open}
      >
        <span className="lang-switcher__flag">{current.flag}</span>
        <span className="lang-switcher__code">{current.code.toUpperCase()}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="lang-switcher__arrow" style={open ? { transform: 'rotate(180deg)' } : {}}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="lang-switcher__dropdown">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              className={`lang-switcher__option ${l.code === lang ? 'lang-switcher__option--active' : ''}`}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              <span className="lang-switcher__flag">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
