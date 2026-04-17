import translations from '../../i18n/translations';
import qa from '../../data/candidateQA';
import { EXTRA_TRANSLATIONS, FALLBACK_BANNER_ITEMS, FALLBACK_POLICY_PAGES } from '../../data/fallbackContent';

const LANGS = ['is', 'en', 'es', 'pl', 'de', 'da', 'no'];

const SUPABASE_STORAGE_BASE = 'https://yestlkukcdjlrtvxugkg.supabase.co/storage/v1/object/public/candidate-photos';
const SITE_STORAGE_BASE = 'https://yestlkukcdjlrtvxugkg.supabase.co/storage/v1/object/public/site-images';

const CANDIDATES_RAW = [
  { nr: 1,  name: 'Vigdís Elva Þorgeirsdóttir',       slug: 'vigdis',   image_url: `${SUPABASE_STORAGE_BASE}/vigdis/profile.jpg` },
  { nr: 2,  name: 'Ragnar Rögnvaldsson',               slug: 'ragnar',   image_url: `${SUPABASE_STORAGE_BASE}/ragnar/profile.jpg` },
  { nr: 3,  name: 'Ástrós Elísdóttir',                 slug: 'astros',   image_url: `${SUPABASE_STORAGE_BASE}/astros/profile.jpg` },
  { nr: 4,  name: 'Jóhann Guðbjartur Sigurjónsson',   slug: 'johann',   image_url: `${SUPABASE_STORAGE_BASE}/johann/profile.jpg` },
  { nr: 5,  name: 'Halla María Þórðardóttir',          slug: 'halla',    image_url: `${SUPABASE_STORAGE_BASE}/halla/profile.jpg` },
  { nr: 6,  name: 'Patrik Snær Bjarnason',             slug: 'patrik',   image_url: `${SUPABASE_STORAGE_BASE}/patrik/profile.jpg` },
  { nr: 7,  name: 'Eva Dís Gunnarsdóttir',             slug: 'eva-dis',  image_url: `${SUPABASE_STORAGE_BASE}/eva-dis/profile.jpg` },
  { nr: 8,  name: 'Andri Már Welding',                 slug: 'andri',    image_url: `${SUPABASE_STORAGE_BASE}/andri/profile.jpg` },
  { nr: 9,  name: 'Daniela Esmeralda Ortega',          slug: 'daniela',  image_url: `${SUPABASE_STORAGE_BASE}/daniela/profile.jpg` },
  { nr: 10, name: 'Ágúst Óðinn Ómarsson',              slug: 'agust',    image_url: `${SUPABASE_STORAGE_BASE}/agust/profile.jpg` },
];

const FACEBOOK_POSTS_RAW = [
  {
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid035eWeaEpe9sGDUueiFuAn5SDa6VUXRkQHBioV3f4G1nTcjeMVkaW3XZmncSemVXkQl%26id%3D61576485865769&show_text=true&width=500',
    height: 350,
    sort_order: 0,
  },
  {
    embed_url: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02LwQdoKvYsmMp3gEbRaa2fpYkAcYa6KQaNfjUjW2pegjVbEcEMsJwfahE4AARsSTPl%26id%3D61576485865769&show_text=true&width=500',
    height: 700,
    sort_order: 1,
  },
];

const CONTACT_INFO_RAW = [
  { key: 'phone', value: '891 7869' },
  { key: 'email', value: 'xk.fyrirskagastrond@gmail.com' },
  { key: 'facebook_url', value: 'https://www.facebook.com/profile.php?id=61576485865769' },
  { key: 'location', value: 'Skagaströnd, Ísland' },
];

/**
 * Builds all site_content rows from the translations.js object.
 * Returns array of { key, lang, value } objects.
 */
function buildSiteContentRows() {
  const rows = [];
  for (const [key, langMap] of Object.entries(translations)) {
    for (const lang of LANGS) {
      const value = langMap[lang] || langMap['is'] || '';
      rows.push({ key, lang, value, draft_value: null, has_draft: false });
    }
  }
  for (const [key, langMap] of Object.entries(EXTRA_TRANSLATIONS)) {
    for (const lang of LANGS) {
      const value = langMap[lang] || langMap['is'] || '';
      rows.push({ key, lang, value, draft_value: null, has_draft: false });
    }
  }
  return rows;
}

/**
 * Seeds the entire Supabase database from existing hardcoded data.
 * Called once from DashboardHome when DB is empty.
 *
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function seedDatabase(supabase) {
  try {
    // 1. Site content
    const contentRows = buildSiteContentRows();
    const { error: contentError } = await supabase
      .from('site_content')
      .upsert(contentRows, { onConflict: 'key,lang', ignoreDuplicates: true });
    if (contentError) throw contentError;

    // 2. Candidates
    const candidateRows = CANDIDATES_RAW.map((c, i) => ({
      nr: c.nr,
      name: c.name,
      slug: c.slug,
      image_url: c.image_url,
      sort_order: i,
      is_published: true,
    }));
    const { data: insertedCandidates, error: candidateError } = await supabase
      .from('candidates')
      .upsert(candidateRows, { onConflict: 'slug', ignoreDuplicates: true })
      .select('id, slug');
    if (candidateError) throw candidateError;

    // 3. Candidate translations (fetch IDs first)
    const { data: allCandidates, error: fetchError } = await supabase
      .from('candidates')
      .select('id, nr, slug');
    if (fetchError) throw fetchError;

    const translationRows = [];
    for (const candidate of allCandidates) {
      const nr = candidate.nr;
      for (const lang of LANGS) {
        const roleKey = `candidate.${nr}.role`;
        const bioKey = `candidate.${nr}.bio`;
        const roleMap = translations[roleKey] || {};
        const bioMap = translations[bioKey] || {};
        translationRows.push({
          candidate_id: candidate.id,
          lang,
          role: roleMap[lang] || roleMap['is'] || '',
          bio: bioMap[lang] || bioMap['is'] || '',
          draft_role: null,
          draft_bio: null,
          has_draft: false,
        });
      }
    }
    const { error: transError } = await supabase
      .from('candidate_translations')
      .upsert(translationRows, { onConflict: 'candidate_id,lang', ignoreDuplicates: true });
    if (transError) throw transError;

    // 3b. Candidate Q&A and primary image metadata
    const qaRows = [];
    const imageRows = [];
    for (const candidate of allCandidates) {
      const candidateQa = qa[candidate.slug] || {};
      Object.entries(candidateQa).forEach(([questionKey, answers], sortIndex) => {
        ['is', 'en'].forEach(lang => {
          if (!answers[lang]) return;
          qaRows.push({
            candidate_id: candidate.id,
            question_key: questionKey,
            lang,
            answer: answers[lang],
            sort_order: sortIndex,
            draft_answer: null,
            has_draft: false,
          });
        });
      });

      const storagePath = `${candidate.slug}/profile.jpg`;
      imageRows.push({
        candidate_id: candidate.id,
        storage_path: storagePath,
        url: `${SUPABASE_STORAGE_BASE}/${storagePath}`,
        alt_text: candidate.slug,
        sort_order: 0,
        is_primary: true,
        is_published: true,
      });
    }

    if (qaRows.length) {
      const { error: qaError } = await supabase
        .from('candidate_qa')
        .upsert(qaRows, { onConflict: 'candidate_id,question_key,lang', ignoreDuplicates: true });
      if (qaError) throw qaError;
    }

    if (imageRows.length) {
      const { error: imageError } = await supabase
        .from('candidate_images')
        .upsert(imageRows, { onConflict: 'candidate_id,storage_path', ignoreDuplicates: true });
      if (imageError) throw imageError;
    }

    // 4. Facebook posts
    const { error: fbError } = await supabase
      .from('facebook_posts')
      .upsert(FACEBOOK_POSTS_RAW, { ignoreDuplicates: true });
    if (fbError) throw fbError;

    // 5. Contact info
    const { error: contactError } = await supabase
      .from('contact_info')
      .upsert(CONTACT_INFO_RAW, { onConflict: 'key', ignoreDuplicates: true });
    if (contactError) throw contactError;

    // 6. Hero settings
    const { error: settingsError } = await supabase
      .from('site_settings')
      .upsert([
        { key: 'hero_image_url', value: `${SITE_STORAGE_BASE}/hero/group-29.jpg` },
        { key: 'hero_alt_image_url', value: `${SITE_STORAGE_BASE}/hero/group-32.jpg` },
      ], { onConflict: 'key' });
    if (settingsError) throw settingsError;

    // 7. Banner defaults
    const { count: bannerCount, error: bannerCountError } = await supabase
      .from('banner_items')
      .select('id', { count: 'exact', head: true });
    if (bannerCountError) throw bannerCountError;

    if (!bannerCount) {
      const bannerRows = FALLBACK_BANNER_ITEMS.map(item => ({
        type: item.type,
        image_url: item.sort_order === 0 ? `${SITE_STORAGE_BASE}/hero/group-29.jpg` : `${SITE_STORAGE_BASE}/hero/group-32.jpg`,
        link_url: item.link_url,
        sort_order: item.sort_order,
        is_published: true,
      }));
      const { data: banners, error: bannerError } = await supabase
        .from('banner_items')
        .insert(bannerRows)
        .select('id, sort_order');
      if (bannerError) throw bannerError;

      const bannerTranslationRows = [];
      for (const banner of banners || []) {
        const source = FALLBACK_BANNER_ITEMS.find(item => item.sort_order === banner.sort_order);
        if (!source) continue;
        for (const lang of LANGS) {
          bannerTranslationRows.push({
            banner_item_id: banner.id,
            lang,
            title: source.title[lang] || source.title.is || '',
            description: source.description[lang] || source.description.is || '',
            draft_title: null,
            draft_description: null,
            has_draft: false,
          });
        }
      }
      if (bannerTranslationRows.length) {
        const { error: bannerTransError } = await supabase
          .from('banner_item_translations')
          .insert(bannerTranslationRows);
        if (bannerTransError) throw bannerTransError;
      }
    }

    // 8. Policy page defaults
    const { count: pageCount, error: pageCountError } = await supabase
      .from('pages')
      .select('id', { count: 'exact', head: true });
    if (pageCountError) throw pageCountError;

    if (!pageCount) {
      for (const [index, page] of FALLBACK_POLICY_PAGES.entries()) {
        const { data: insertedPage, error: pageError } = await supabase
          .from('pages')
          .insert({
            slug: page.slug,
            hero_image_url: page.hero_image_url || '',
            og_image_url: page.og_image_url || '',
            sort_order: index,
            is_published: true,
          })
          .select('id')
          .single();
        if (pageError) throw pageError;

        const pageTranslationRows = (page.page_translations || []).map(row => ({
          page_id: insertedPage.id,
          lang: row.lang,
          title: row.title || '',
          summary: row.summary || '',
          body: row.body || '',
          draft_title: null,
          draft_summary: null,
          draft_body: null,
          has_draft: false,
        }));
        if (pageTranslationRows.length) {
          const { error: pageTransError } = await supabase
            .from('page_translations')
            .insert(pageTranslationRows);
          if (pageTransError) throw pageTransError;
        }
      }
    }

    return { ok: true };
  } catch (err) {
    console.error('Seed error:', err);
    return { ok: false, error: err.message || 'Unknown error' };
  }
}
