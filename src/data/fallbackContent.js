import translations from '../i18n/translations.js';
import { candidates as staticCandidates } from './candidates.js';
import qa from './candidateQA.js';
import { campaignBannerItems, policyProgramAsPages } from './policyProgram.js';

export const SUPABASE_PROJECT_URL = 'https://yestlkukcdjlrtvxugkg.supabase.co';
export const SITE_IMAGE_BUCKET = 'site-images';
export const CANDIDATE_IMAGE_BUCKET = 'candidate-photos';

export const FALLBACK_CONTACT = {
  phone: '891 7869',
  email: 'xk.fyrirskagastrond@gmail.com',
  facebook_url: 'https://www.facebook.com/profile.php?id=61576485865769',
  location: 'Skagaströnd, Iceland',
};

export const FALLBACK_FACEBOOK_POSTS = [
  {
    id: 'fallback-facebook-1',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02DDDTRdonm5H7668ZYVkQpFutcXkCaMV7dicbWrDFEjWcAxDVR4QvWSzv2c7KoL7Ll%26id%3D61576485865769&show_text=true&width=500',
    height: 680,
    sort_order: 0,
    is_active: true,
  },
  {
    id: 'fallback-facebook-2',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid035jegDpcMhi3edkc97o77Y6t3cD9qes8KVjJKT2qJFWzjvbhPq4Mn8XeBYfN3jYWyl%26id%3D61576485865769&show_text=true&width=500',
    height: 680,
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'fallback-facebook-3',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02kaezx5h5PzNp2VUMxBz7Y3sKdVYDnjgNX9ouW77qJtYYAoXvbBz7LEQkox3RwedPl%26id%3D61576485865769&show_text=true&width=500',
    height: 680,
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'fallback-facebook-4',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid07wKTfBhDq1BwQFxLPdDxfTrSSPztiHHv45fhWWML29RW6gQhMYUJUqaEfHse9gnMl%26id%3D61576485865769&show_text=true&width=500',
    height: 680,
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'fallback-facebook-5',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid022PUaVwELL88Eopc8CkKDKEWh1r1sZKj5xrHtNQANXAtjRBjA1yJrPTVCpa2eKmo5l%26id%3D61576485865769&show_text=true&width=500',
    height: 680,
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'fallback-facebook-6',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid03acBHSsqRPcpYNSatzHKEvm1aQWaQxZ94VnxwdFLTmFgx7sDyVxW77KEef5pxZsYl%26id%3D61576485865769&show_text=true&width=500',
    height: 680,
    sort_order: 5,
    is_active: true,
  },
  {
    id: 'fallback-facebook-7',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid028ofV6dNGDNeUrhsEJyC1gFevo9NarZEWv6QzP3Y9aQ7apz1v6dkWc4Rrk8dK18G2l%26id%3D61576485865769&show_text=true&width=500',
    height: 680,
    sort_order: 6,
    is_active: true,
  },
  {
    id: 'fallback-facebook-8',
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02BwwEzt27fQS6mc5zBnzWnYsZPvQbxVu8xJ2hTkLJ9XFBGbjG992kdCytRRps71Fil%26id%3D61576485865769&show_text=true&width=500',
    height: 680,
    sort_order: 7,
    is_active: true,
  },
];

export const FALLBACK_HERO_IMAGE = '/Group images/29.jpg';
export const FALLBACK_HERO_ALTERNATE_IMAGE = '/Group images/32.jpg';

export const FALLBACK_BANNER_ITEMS = campaignBannerItems();
export const FALLBACK_POLICY_PAGES = policyProgramAsPages();

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
    is: 'Áherslur',
    en: 'Priorities',
    es: 'Prioridades',
    pl: 'Priorytety',
    de: 'Prioritäten',
    da: 'Prioriteter',
    no: 'Prioriteringer',
  },
  'banner.title': {
    is: 'Fyrir Skagaströnd í verki',
    en: 'Fyrir Skagaströnd in action',
    es: 'Fyrir Skagaströnd en acción',
    pl: 'Fyrir Skagaströnd w działaniu',
    de: 'Fyrir Skagaströnd in Aktion',
    da: 'Fyrir Skagaströnd i praksis',
    no: 'Fyrir Skagaströnd i praksis',
  },
  'banner.subtitle': {
    is: 'Myndir, markmið og fólk sem vill byggja upp samfélagið okkar.',
    en: 'Images, goals and the people working to strengthen our community.',
    es: 'Imágenes, metas y la gente que quiere fortalecer nuestra comunidad.',
    pl: 'Obrazy, cele i ludzie, którzy chcą wzmacniać naszą społeczność.',
    de: 'Bilder, Ziele und die Menschen, die unsere Gemeinschaft stärken wollen.',
    da: 'Billeder, mål og mennesker, der vil styrke vores fællesskab.',
    no: 'Bilder, mål og menneskene som vil styrke fellesskapet vårt.',
  },
  'seo.title': {
    is: 'Fyrir Skagaströnd — X við K',
    en: 'Fyrir Skagaströnd — Vote K',
    es: 'Fyrir Skagaströnd — Vota K',
    pl: 'Fyrir Skagaströnd — Głosuj K',
    de: 'Fyrir Skagaströnd — Wähle K',
    da: 'Fyrir Skagaströnd — Stem K',
    no: 'Fyrir Skagaströnd — Stem K',
  },
  'seo.description': {
    is: 'Fyrir Skagaströnd er sjálfstætt grasrótarframboð fyrir fólkið, samfélagið og framtíðina.',
    en: 'Fyrir Skagaströnd is an independent grassroots campaign for the people, community and future.',
    es: 'Fyrir Skagaströnd es una candidatura independiente de base para la gente, la comunidad y el futuro.',
    pl: 'Fyrir Skagaströnd to niezależna oddolna lista dla ludzi, społeczności i przyszłości.',
    de: 'Fyrir Skagaströnd ist eine unabhängige Graswurzel-Kandidatur für Menschen, Gemeinschaft und Zukunft.',
    da: 'Fyrir Skagaströnd er en uafhængig græsrods-liste for folket, fællesskabet og fremtiden.',
    no: 'Fyrir Skagaströnd er en uavhengig grasrotliste for folket, samfunnet og fremtiden.',
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
