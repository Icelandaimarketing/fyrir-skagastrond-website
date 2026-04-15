import translations from '../../i18n/translations';

const LANGS = ['is', 'en', 'es', 'pl', 'de', 'da', 'no'];

const SUPABASE_STORAGE_BASE = 'https://yestlkukcdjlrtvxugkg.supabase.co/storage/v1/object/public/candidate-photos';

const CANDIDATES_RAW = [
  { nr: 1,  name: 'Vigdís Elva Þorgeirsdóttir',       slug: 'vigdis',   image_url: `${SUPABASE_STORAGE_BASE}/vigdis.jpg` },
  { nr: 2,  name: 'Ragnar Rögnvaldsson',               slug: 'ragnar',   image_url: `${SUPABASE_STORAGE_BASE}/ragnar.jpg` },
  { nr: 3,  name: 'Ástrós Elísdóttir',                 slug: 'astros',   image_url: `${SUPABASE_STORAGE_BASE}/astros.jpg` },
  { nr: 4,  name: 'Jóhann Guðbjartur Sigurjónsson',   slug: 'johann',   image_url: `${SUPABASE_STORAGE_BASE}/johann.jpg` },
  { nr: 5,  name: 'Halla María Þórðardóttir',          slug: 'halla',    image_url: `${SUPABASE_STORAGE_BASE}/halla.jpg` },
  { nr: 6,  name: 'Patrik Snær Bjarnason',             slug: 'patrik',   image_url: null },  // Photos arriving soon
  { nr: 7,  name: 'Eva Dís Gunnarsdóttir',             slug: 'eva-dis',  image_url: `${SUPABASE_STORAGE_BASE}/eva-dis.jpg` },
  { nr: 8,  name: 'Andri Már Welding',                 slug: 'andri',    image_url: `${SUPABASE_STORAGE_BASE}/andri.jpg` },
  { nr: 9,  name: 'Daniela Esmeralda Ortega',          slug: 'daniela',  image_url: `${SUPABASE_STORAGE_BASE}/daniela.jpg` },
  { nr: 10, name: 'Ágúst Óðinn Ómarsson',              slug: 'agust',    image_url: `${SUPABASE_STORAGE_BASE}/agust.jpg` },
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

    return { ok: true };
  } catch (err) {
    console.error('Seed error:', err);
    return { ok: false, error: err.message || 'Unknown error' };
  }
}
