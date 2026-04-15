import React, { createContext, useContext, useState } from 'react';
import adminTranslations from '../i18n/adminTranslations';

const AdminLangContext = createContext(null);

export function AdminLangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('admin-lang') || 'is';
  });

  function toggleLang() {
    const next = lang === 'is' ? 'en' : 'is';
    setLang(next);
    localStorage.setItem('admin-lang', next);
  }

  function t(key) {
    const entry = adminTranslations[key];
    if (!entry) return key;
    return entry[lang] || entry['is'] || key;
  }

  return (
    <AdminLangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </AdminLangContext.Provider>
  );
}

export function useAdminLang() {
  const ctx = useContext(AdminLangContext);
  if (!ctx) throw new Error('useAdminLang must be used inside AdminLangProvider');
  return ctx;
}
