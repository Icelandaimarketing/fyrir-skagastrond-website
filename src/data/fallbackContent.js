import translations from '../i18n/translations';
import { candidates as staticCandidates } from './candidates';
import qa from './candidateQA';

export const SUPABASE_PROJECT_URL = 'https://yestlkukcdjlrtvxugkg.supabase.co';
export const SITE_IMAGE_BUCKET = 'site-images';
export const CANDIDATE_IMAGE_BUCKET = 'candidate-photos';

export const FALLBACK_CONTACT = {
  phone: '891 7869',
  email: 'xk.fyrirskagastrond@gmail.com',
  facebook_url: 'https://www.facebook.com/profile.php?id=61576485865769',
  location: 'Skagastrond, Iceland',
};

export const FALLBACK_FACEBOOK_POSTS = [
  {
    id: 'fallback-facebook-1',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid035eWeaEpe9sGDUueiFuAn5SDa6VUXRkQHBioV3f4G1nTcjeMVkaW3XZmncSemVXkQl%26id%3D61576485865769&show_text=true&width=500',
    height: 700,
    sort_order: 0,
    is_active: true,
  },
  {
    id: 'fallback-facebook-2',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02LwQdoKvYsmMp3gEbRaa2fpYkAcYa6KQaNfjUjW2pegjVbEcEMsJwfahE4AARsSTPl%26id%3D61576485865769&show_text=true&width=500',
    height: 700,
    sort_order: 1,
    is_active: true,
  },
];

export const FALLBACK_HERO_IMAGE = '/Group images/29.jpg';
export const FALLBACK_HERO_ALTERNATE_IMAGE = '/Group images/32.jpg';

export const FALLBACK_BANNER_ITEMS = [
  {
    id: 'fallback-banner-town',
    type: 'town',
    image_url: '/Group images/29.jpg',
    link_url: '#um',
    sort_order: 0,
    title: {
      is: 'Fyrir Skagastrond',
      en: 'For Skagastrond',
      es: 'Por Skagastrond',
      pl: 'Dla Skagastrond',
      de: 'Fur Skagastrond',
      da: 'For Skagastrond',
      no: 'For Skagastrond',
    },
    description: {
      is: 'Sterkt, sanngjarnt og lifandi samfelag.',
      en: 'A strong, fair and vibrant community.',
      es: 'Una comunidad fuerte, justa y viva.',
      pl: 'Silna, sprawiedliwa i zywa spolecznosc.',
      de: 'Eine starke, faire und lebendige Gemeinschaft.',
      da: 'Et staerkt, retfaerdigt og levende samfund.',
      no: 'Et sterkt, rettferdig og levende samfunn.',
    },
  },
  {
    id: 'fallback-banner-candidates',
    type: 'candidate',
    image_url: '/Group images/32.jpg',
    link_url: '#frambod',
    sort_order: 1,
    title: {
      is: 'Okkar folk',
      en: 'Our people',
      es: 'Nuestra gente',
      pl: 'Nasi ludzie',
      de: 'Unsere Leute',
      da: 'Vores folk',
      no: 'Vare folk',
    },
    description: {
      is: 'Frambjodendur med sameiginlega framtidarsyn.',
      en: 'Candidates with a shared vision for the future.',
      es: 'Candidatos con una vision compartida.',
      pl: 'Kandydaci ze wspolna wizja przyszlosci.',
      de: 'Kandidaten mit gemeinsamer Zukunftsvision.',
      da: 'Kandidater med en faelles fremtidsvision.',
      no: 'Kandidater med en felles fremtidsvisjon.',
    },
  },
];

function policyPage(slug, titleKey, summaryKey) {
  return {
    id: `fallback-page-${slug}`,
    slug,
    hero_image_url: '',
    og_image_url: '',
    sort_order: 0,
    is_published: true,
    page_translations: ['is', 'en', 'es', 'pl', 'de', 'da', 'no'].map(lang => {
      const title = translations[titleKey]?.[lang] || translations[titleKey]?.is || '';
      const summary = translations[summaryKey]?.[lang] || translations[summaryKey]?.is || '';
      return {
        lang,
        title,
        summary,
        body: `${summary}\n\n${translations['about.text1']?.[lang] || translations['about.text1']?.is || ''}\n\n${translations['about.text2']?.[lang] || translations['about.text2']?.is || ''}`,
      };
    }),
  };
}

export const FALLBACK_POLICY_PAGES = [
  policyPage('gagnsaei-i-stjornun', 'about.feature1.title', 'about.feature1.text'),
  policyPage('styrkja-innvidi', 'about.feature2.title', 'about.feature2.text'),
  policyPage('atvinnuuppbygging', 'about.feature3.title', 'about.feature3.text'),
];

export const EXTRA_TRANSLATIONS = {
  'nav.admin': {
    is: 'Admin',
    en: 'Admin',
    es: 'Admin',
    pl: 'Admin',
    de: 'Admin',
    da: 'Admin',
    no: 'Admin',
  },
  'banner.badge': {
    is: 'Aherzlur',
    en: 'Priorities',
    es: 'Prioridades',
    pl: 'Priorytety',
    de: 'Prioritaten',
    da: 'Prioriteter',
    no: 'Prioriteringer',
  },
  'banner.title': {
    is: 'Fyrir Skagastrond i verki',
    en: 'For Skagastrond in action',
    es: 'Por Skagastrond en accion',
    pl: 'Dla Skagastrond w dzialaniu',
    de: 'Fur Skagastrond in Aktion',
    da: 'For Skagastrond i praksis',
    no: 'For Skagastrond i praksis',
  },
  'banner.subtitle': {
    is: 'Myndir, markmid og folkid sem vill byggja upp samfelagid okkar.',
    en: 'Images, goals and the people working to strengthen our community.',
    es: 'Imagenes, objetivos y personas que fortalecen la comunidad.',
    pl: 'Obrazy, cele i ludzie wzmacniajacy nasza spolecznosc.',
    de: 'Bilder, Ziele und Menschen, die unsere Gemeinschaft starken.',
    da: 'Billeder, mal og mennesker, der styrker vores samfund.',
    no: 'Bilder, mal og mennesker som styrker samfunnet vart.',
  },
};

export function getFallbackCandidates() {
  return staticCandidates.map((candidate) => ({
    ...candidate,
    id: `fallback-${candidate.slug}`,
    image_url: candidate.image,
    primary_image_url: candidate.image,
    fallback_image_url: candidate.image,
    role: {},
    bio: {},
    qa: qa[candidate.slug] || {},
    is_published: true,
  }));
}

export default {
  ...translations,
  ...EXTRA_TRANSLATIONS,
};
