import { useLanguage } from './LanguageContext';
import translations from './translations';

export function useTranslation() {
  const { lang } = useLanguage();

  function t(key) {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry['is'] || key;
  }

  return { t, lang };
}
