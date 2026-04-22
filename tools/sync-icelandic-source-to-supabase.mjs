import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import translations from '../src/i18n/translations.js';
import candidateQa from '../src/data/candidateQaContent.js';
import { EXTRA_TRANSLATIONS } from '../src/data/fallbackContent.js';
import {
  buildPolicyPageContent,
  POLICY_ALIASES,
  POLICY_PROGRAM,
  SUPPORTED_POLICY_LANGUAGES,
} from '../src/data/policyProgram.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ENV_PATH = path.join(ROOT, '.env.local');
const POLICY_MD_PATH = path.join(ROOT, 'public', 'Málefnaskrá – Fyrir Skagaströnd.md');

function readEnvFile(filePath) {
  return Object.fromEntries(
    fs
      .readFileSync(filePath, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const separatorIndex = line.indexOf('=');
        return [line.slice(0, separatorIndex), line.slice(separatorIndex + 1)];
      }),
  );
}

function normalizeText(value) {
  return String(value || '')
    .replace(/\r/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePolicyMarkdown(markdown) {
  const policyTitles = new Set(POLICY_PROGRAM.map((page) => page.title));
  const sections = [];
  const lines = markdown.replace(/\r/g, '').split('\n');
  let activeTitle = null;
  let bodyLines = [];

  const pushSection = () => {
    if (!activeTitle) return;
    const rawBody = bodyLines.join('\n').trim();
    sections.push({
      title: activeTitle,
      body: rawBody,
      normalized: normalizeText(rawBody.replace(/\n+/g, ' ')),
    });
  };

  for (const rawLine of lines) {
    const trimmedLine = rawLine.trim();
    const markdownHeading = trimmedLine.match(/^##\s+(?:\*\*(.+?)\*\*|(.+))\s*$/);
    const candidateTitle = (markdownHeading?.[1] || markdownHeading?.[2] || trimmedLine).trim();

    if (policyTitles.has(candidateTitle)) {
      pushSection();
      activeTitle = candidateTitle;
      bodyLines = [];
      continue;
    }

    if (!activeTitle) continue;
    bodyLines.push(trimmedLine);
  }

  pushSection();
  return sections;
}

function verifyLocalPolicyProgram() {
  const markdown = fs.readFileSync(POLICY_MD_PATH, 'utf8');
  const markdownSections = parsePolicyMarkdown(markdown);
  const policyByTitle = new Map(POLICY_PROGRAM.map((page) => [page.title, page]));

  if (markdownSections.length !== POLICY_PROGRAM.length) {
    throw new Error(`Policy source mismatch: markdown has ${markdownSections.length} sections, local policy program has ${POLICY_PROGRAM.length}.`);
  }

  const mismatches = markdownSections
    .map((section) => {
      const page = policyByTitle.get(section.title);
      if (!page) {
        return `Missing local policy page for title "${section.title}"`;
      }

      const localText = normalizeText((page.body || []).join(' '));
      if (localText !== section.normalized) {
        return `Text mismatch for "${section.title}" (${page.slug})`;
      }

      return null;
    })
    .filter(Boolean);

  if (mismatches.length) {
    throw new Error(`Policy source mismatch:\n${mismatches.join('\n')}`);
  }
}

function chunk(items, size = 100) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

function buildSiteContentRows() {
  return [translations, EXTRA_TRANSLATIONS].flatMap((source) =>
    Object.entries(source).flatMap(([key, langMap]) =>
      SUPPORTED_POLICY_LANGUAGES.map((lang) => ({
        key,
        lang,
        value: langMap?.[lang] || langMap?.is || '',
      })),
    ),
  );
}

async function syncSiteContent(supabase) {
  const rows = buildSiteContentRows();
  const { error } = await supabase
    .from('site_content')
    .upsert(rows, { onConflict: 'key,lang' });
  if (error) throw error;

  return {
    upserted: rows.length,
  };
}

async function updateCandidateNames(supabase, candidatesBySlug) {
  let updated = 0;
  for (const [slug, answers] of Object.entries(candidateQa)) {
    const candidate = candidatesBySlug.get(slug);
    if (!candidate) {
      throw new Error(`Candidate slug "${slug}" exists in candidateQA.js but not in Supabase.`);
    }

    const sourceName = answers.nafn?.is?.trim();
    if (sourceName && candidate.name !== sourceName) {
      const { error } = await supabase
        .from('candidates')
        .update({ name: sourceName })
        .eq('id', candidate.id);
      if (error) throw error;
      updated += 1;
    }
  }
  return updated;
}

function buildCandidateQaRows(candidatesBySlug) {
  const rows = [];
  const sourceKeys = new Set();

  for (const [slug, answers] of Object.entries(candidateQa)) {
    const candidate = candidatesBySlug.get(slug);
    let sortOrder = 0;

    for (const [questionKey, translations] of Object.entries(answers)) {
      for (const lang of SUPPORTED_POLICY_LANGUAGES) {
        const answer = translations?.[lang]?.trim();
        if (!answer) continue;

        rows.push({
          candidate_id: candidate.id,
          question_key: questionKey,
          lang,
          answer,
          sort_order: sortOrder,
        });

        sourceKeys.add(`${candidate.id}|${questionKey}|${lang}`);
      }

      sortOrder += 1;
    }
  }

  return { rows, sourceKeys };
}

async function syncCandidateQa(supabase, candidatesBySlug) {
  const candidateIds = [...candidatesBySlug.values()].map((candidate) => candidate.id);
  const { rows, sourceKeys } = buildCandidateQaRows(candidatesBySlug);

  if (rows.length) {
    const { error } = await supabase
      .from('candidate_qa')
      .upsert(rows, { onConflict: 'candidate_id,question_key,lang' });
    if (error) throw error;
  }

  const { data: existingRows, error: fetchError } = await supabase
    .from('candidate_qa')
    .select('id, candidate_id, question_key, lang')
    .in('candidate_id', candidateIds);
  if (fetchError) throw fetchError;

  const staleIds = (existingRows || [])
    .filter((row) => !sourceKeys.has(`${row.candidate_id}|${row.question_key}|${row.lang}`))
    .map((row) => row.id);

  for (const ids of chunk(staleIds)) {
    const { error } = await supabase
      .from('candidate_qa')
      .delete()
      .in('id', ids);
    if (error) throw error;
  }

  return {
    upserted: rows.length,
    deleted: staleIds.length,
  };
}

async function ensurePolicyPages(supabase) {
  const { data: existingPages, error } = await supabase
    .from('pages')
    .select('id, slug, hero_image_url, og_image_url, sort_order, is_published');
  if (error) throw error;

  const bySlug = new Map((existingPages || []).map((page) => [page.slug, page]));
  const reusableAliasByCanonicalSlug = new Map();

  for (const page of existingPages || []) {
    const canonicalSlug = POLICY_ALIASES[page.slug];
    if (!canonicalSlug) continue;
    if (bySlug.has(canonicalSlug)) continue;
    if (!reusableAliasByCanonicalSlug.has(canonicalSlug)) {
      reusableAliasByCanonicalSlug.set(canonicalSlug, page);
    }
  }

  const pageIdBySlug = new Map();
  let inserted = 0;
  let updated = 0;

  for (const [index, policyPage] of POLICY_PROGRAM.entries()) {
    const payload = {
      slug: policyPage.slug,
      hero_image_url: policyPage.image,
      og_image_url: policyPage.image,
      sort_order: index,
      is_published: true,
    };

    const exactPage = bySlug.get(policyPage.slug);
    if (exactPage) {
      const needsUpdate = exactPage.hero_image_url !== payload.hero_image_url
        || exactPage.og_image_url !== payload.og_image_url
        || exactPage.sort_order !== payload.sort_order
        || exactPage.is_published !== payload.is_published;

      if (needsUpdate) {
        const { error: updateError } = await supabase
          .from('pages')
          .update(payload)
          .eq('id', exactPage.id);
        if (updateError) throw updateError;
        updated += 1;
      }

      pageIdBySlug.set(policyPage.slug, exactPage.id);
      continue;
    }

    const aliasPage = reusableAliasByCanonicalSlug.get(policyPage.slug);
    if (aliasPage) {
      const { error: updateError } = await supabase
        .from('pages')
        .update(payload)
        .eq('id', aliasPage.id);
      if (updateError) throw updateError;
      updated += 1;
      pageIdBySlug.set(policyPage.slug, aliasPage.id);
      continue;
    }

    const { data: insertedPage, error: insertError } = await supabase
      .from('pages')
      .insert(payload)
      .select('id, slug')
      .single();
    if (insertError) throw insertError;

    inserted += 1;
    pageIdBySlug.set(policyPage.slug, insertedPage.id);
  }

  const allTranslationRows = POLICY_PROGRAM.flatMap((policyPage) =>
    SUPPORTED_POLICY_LANGUAGES.map((lang) => ({
      page_id: pageIdBySlug.get(policyPage.slug),
      lang,
      ...buildPolicyPageContent(policyPage, lang),
    })),
  );

  const { error: upsertTranslationsError } = await supabase
    .from('page_translations')
    .upsert(allTranslationRows, { onConflict: 'page_id,lang' });
  if (upsertTranslationsError) throw upsertTranslationsError;

  return {
    inserted,
    updated,
    translationsUpserted: allTranslationRows.length,
  };
}

async function main() {
  verifyLocalPolicyProgram();

  const env = readEnvFile(ENV_PATH);
  if (!env.VITE_SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
    throw new Error('Missing Supabase credentials in .env.local.');
  }

  const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data: candidates, error: candidatesError } = await supabase
    .from('candidates')
    .select('id, slug, name');
  if (candidatesError) throw candidatesError;

  const candidatesBySlug = new Map((candidates || []).map((candidate) => [candidate.slug, candidate]));

  const siteContentResult = await syncSiteContent(supabase);
  const namesUpdated = await updateCandidateNames(supabase, candidatesBySlug);
  const candidateQaResult = await syncCandidateQa(supabase, candidatesBySlug);
  const pageResult = await ensurePolicyPages(supabase);

  console.log(JSON.stringify({
    siteContentUpserted: siteContentResult.upserted,
    namesUpdated,
    candidateQaUpserted: candidateQaResult.upserted,
    candidateQaDeleted: candidateQaResult.deleted,
    pagesInserted: pageResult.inserted,
    pagesUpdated: pageResult.updated,
    policyTranslationsUpserted: pageResult.translationsUpserted,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
