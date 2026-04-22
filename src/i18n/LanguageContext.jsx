import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'is', label: 'Íslenska', flag: '🇮🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fs-lang') || 'is';
      return LANGUAGES.some((language) => language.code === stored) ? stored : 'is';
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
