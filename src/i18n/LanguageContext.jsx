import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'is', label: 'Íslenska', flag: '🇮🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰' },
  { code: 'no', label: 'Norsk', flag: '🇳🇴' },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fs-lang') || 'is';
    }
    return 'is';
  });

  useEffect(() => {
    localStorage.setItem('fs-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
