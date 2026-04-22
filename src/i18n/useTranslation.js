import { useLanguage } from './LanguageContext';
import translations from './translations';
import { usePublicData } from '../context/PublicDataContext';

export function useTranslation() {
  const { lang } = useLanguage();
  const publicData = usePublicData();
  const activeTranslations = publicData?.translations || translations;

  function t(key) {
    const entry = activeTranslations[key] || translations[key];
    if (!entry) return key;
    return entry[lang] || entry['is'] || key;
  }

  return { t, lang };
}
