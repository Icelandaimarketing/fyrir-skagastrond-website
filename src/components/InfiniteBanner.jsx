import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePublicData } from '../context/PublicDataContext';
import { useTranslation } from '../i18n/useTranslation';
import candidateQa from '../data/candidateQaContent';
import { getPolicyPosterImage } from '../data/policyProgram';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const AUTO_SCROLL_SPEED = 0.72;
const GRAPHIC_BANNER_ITEMS = [
  {
    id: 'graphic-group-29',
    kind: 'graphic',
    image_url: '/Group images/29.jpg',
    link_url: '/#um',
    title: { is: 'Fyrir Skagaströnd', en: 'Fyrir Skagaströnd' },
    description: { is: '', en: '' },
  },
  {
    id: 'graphic-group-30',
    kind: 'graphic',
    image_url: '/Group images/30.jpg',
    link_url: '/#frambod',
    title: { is: 'Framboðið', en: 'The candidate list' },
    description: { is: '', en: '' },
  },
  {
    id: 'graphic-group-31',
    kind: 'graphic',
    image_url: '/Group images/31.jpg',
    link_url: '/#stefna',
    title: { is: 'Sameiginleg sýn', en: 'A shared vision' },
    description: { is: '', en: '' },
  },
  {
    id: 'graphic-group-32',
    kind: 'graphic',
    image_url: '/Group images/32.jpg',
    link_url: '/#frettir',
    title: { is: 'Samfélagið', en: 'The community' },
    description: { is: '', en: '' },
  },
  {
    id: 'graphic-team',
    kind: 'graphic',
    image_url: '/Frambjódendur.jpg',
    link_url: '/#samband',
    title: { is: 'Okkar fólk', en: 'Our team' },
    description: { is: '', en: '' },
  },
];

function isCampaignGraphicImage(url) {
  return /Generated Image|32811cdf|(?:\/|^)Stefna\/|site-images\/stefna\//i.test(url || '');
}

function translationRowsToMap(rows, field) {
  return (rows || []).reduce((acc, row) => {
    if (row?.lang && row?.[field]) acc[row.lang] = row[field];
    return acc;
  }, {});
}

function ensureTextMap(value, fallback = '') {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return {
      ...value,
      is: value.is || value.en || fallback,
      en: value.en || value.is || fallback,
    };
  }

  return {
    is: fallback,
    en: fallback,
  };
}

function hashSeed(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seedInput) {
  let seed = hashSeed(seedInput) || 1;
  return () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleItems(items, seedInput) {
  const next = [...items];
  const random = createSeededRandom(seedInput);

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}

function duplicateItem(item, suffix) {
  return {
    ...item,
    id: `${item.id}-${suffix}`,
  };
}

function buildSeparatorItems(candidateItems, graphicItems, minimumCount, seedInput) {
  const candidates = shuffleItems(candidateItems, `${seedInput}:candidate`);
  const graphics = shuffleItems(graphicItems, `${seedInput}:graphic`);
  const separators = [...candidates];
  let graphicIndex = 0;

  while (separators.length < minimumCount && graphics.length) {
    const graphic = graphics[graphicIndex % graphics.length];
    separators.push(duplicateItem(graphic, `separator-${graphicIndex}`));
    graphicIndex += 1;
  }

  return separators;
}

function interleaveBannerItems(candidateItems, policyItems, graphicItems, seedInput) {
  const policies = shuffleItems(policyItems, `${seedInput}:policy`);
  if (!policies.length) {
    return shuffleItems([...candidateItems, ...graphicItems], `${seedInput}:support`);
  }

  const separators = buildSeparatorItems(
    candidateItems,
    graphicItems,
    policies.length + 1,
    seedInput,
  );

  if (!separators.length) {
    return policies;
  }

  const ordered = [separators.shift()];
  while (policies.length) {
    ordered.push(policies.shift());
    if (separators.length) {
      ordered.push(separators.shift());
    }
  }

  return ordered.concat(separators);
}

function buildAutomatedBannerItems(candidates, pages) {
  const candidateItems = (candidates || [])
    .filter((candidate) => (candidate?.image_url || candidate?.image) && candidate?.slug)
    .map((candidate) => {
      const source = candidateQa[candidate.slug] || {};
      return {
        id: `candidate-banner-${candidate.slug}`,
        kind: 'candidate',
        type: {
          is: 'Frambjóðandi',
          en: 'Candidate',
          es: 'Candidata',
          pl: 'Kandydat',
          de: 'Kandidat',
          da: 'Kandidat',
          no: 'Kandidat',
        },
        image_url: candidate.image_url || candidate.image,
        link_url: `/frambjodandi/${candidate.slug}`,
        title: ensureTextMap(source.nafn, candidate.name || ''),
        description: ensureTextMap(source.atvinna, ''),
      };
    });

  const graphicItems = GRAPHIC_BANNER_ITEMS.map((item) => ({
    ...item,
    title: ensureTextMap(item.title, 'Fyrir Skagaströnd'),
    description: ensureTextMap(item.description, ''),
  }));

  const policyItems = (pages || [])
    .filter((page) => page?.slug)
    .map((page) => {
      const title = ensureTextMap(translationRowsToMap(page.page_translations, 'title'), page.slug);
      const summary = ensureTextMap(translationRowsToMap(page.page_translations, 'summary'), '');

      return {
        id: `policy-banner-${page.slug}`,
        kind: 'policy',
        type: {
          is: 'Málefni',
          en: 'Policy',
          es: 'Programa',
          pl: 'Polityka',
          de: 'Thema',
          da: 'Politik',
          no: 'Politikk',
        },
        image_url: getPolicyPosterImage(page.slug) || page.hero_image_url || page.og_image_url,
        link_url: `/malefni/${page.slug}`,
        title,
        description: summary,
      };
    })
    .filter((page) => page.image_url);

  const daySeed = new Date().toISOString().slice(0, 10);
  const ordered = interleaveBannerItems(
    candidateItems,
    policyItems,
    graphicItems,
    `${daySeed}:${candidateItems.map((item) => item.id).join('|')}:${policyItems.map((item) => item.id).join('|')}`,
  );

  return ordered.map((item, index) => ({
    ...item,
    sort_order: index,
  }));
}

function BannerCard({ item, lang, inert = false }) {
  const title = item.title?.[lang] || item.title?.is || item.title?.en || '';
  const description = item.description?.[lang] || item.description?.is || item.description?.en || '';
  const category = item.type?.[lang] || item.type?.is || item.type?.en || 'Priority';
  const isGraphic = item.kind === 'graphic' || isCampaignGraphicImage(item.image_url);
  const commonProps = inert ? { tabIndex: -1, 'aria-hidden': true } : {};
  const className = [
    'campaign-media-card',
    item.kind === 'candidate'
      ? 'campaign-media-card--candidate'
      : isGraphic
        ? 'campaign-media-card--graphic'
        : 'campaign-media-card--policy',
  ].join(' ');
  const imageClassName = [
    'campaign-media-card__image',
    isGraphic ? 'campaign-media-card__image--graphic' : '',
  ].filter(Boolean).join(' ');

  const content = isGraphic ? (
    <img
      src={item.image_url || '/Group images/29.jpg'}
      alt={title}
      className={imageClassName}
      loading="lazy"
      onError={(event) => { event.currentTarget.src = '/Group images/29.jpg'; }}
    />
  ) : (
    <>
      <img
        src={item.image_url || '/Group images/29.jpg'}
        alt={title}
        className={imageClassName}
        loading="lazy"
        onError={(event) => { event.currentTarget.src = '/Group images/29.jpg'; }}
      />
      <div className="campaign-media-card__body">
        <span className="campaign-media-card__kicker">{category}</span>
        <h3 className="campaign-media-card__title">{title}</h3>
        {description && <p className="campaign-media-card__text">{description}</p>}
      </div>
    </>
  );

  if (item.link_url?.startsWith('/')) {
    return <Link to={item.link_url} className={className} {...commonProps}>{content}</Link>;
  }

  return <a href={item.link_url || '/#frettir'} className={className} {...commonProps}>{content}</a>;
}

export default function InfiniteBanner() {
  const { candidates, pages } = usePublicData();
  const { t, lang } = useTranslation();
  const viewportRef = useRef(null);
  const frameRef = useRef(0);
  const lastFrameRef = useRef(0);
  const scrollCarryRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const items = useMemo(() => buildAutomatedBannerItems(candidates, pages), [candidates, pages]);
  const loopItems = useMemo(() => (items.length > 1 ? [...items, ...items] : items), [items]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || items.length < 2) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const step = (timestamp) => {
      if (!lastFrameRef.current) lastFrameRef.current = timestamp;
      const delta = timestamp - lastFrameRef.current;
      lastFrameRef.current = timestamp;

      if (!isPaused) {
        scrollCarryRef.current += (delta / 16) * AUTO_SCROLL_SPEED;
        const wholePixels = Math.trunc(scrollCarryRef.current);

        if (wholePixels) {
          viewport.scrollLeft += wholePixels;
          scrollCarryRef.current -= wholePixels;
        }

        const loopPoint = viewport.scrollWidth / 2;
        if (viewport.scrollLeft >= loopPoint) {
          viewport.scrollLeft -= loopPoint;
        }
      }

      frameRef.current = window.requestAnimationFrame(step);
    };

    frameRef.current = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(frameRef.current);
      lastFrameRef.current = 0;
      scrollCarryRef.current = 0;
    };
  }, [items, isPaused]);

  if (!items.length) return null;

  const scrollByCard = (direction) => {
    if (!viewportRef.current) return;
    const card = viewportRef.current.querySelector('.scroll-banner__item');
    const width = card?.getBoundingClientRect().width || 320;
    viewportRef.current.scrollBy({ left: direction * (width + 24), behavior: 'smooth' });
  };

  return (
    <section id="aherslur" className="scroll-banner section section--sky section--soft-top" aria-label={t('banner.title')}>
      <div className="container">
        <motion.div
          className="section__header section__header--left"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge--red">{t('banner.badge')}</span>
          <h2 className="section__title">{t('banner.title')}</h2>
          <p className="section__subtitle">{t('banner.subtitle')}</p>
        </motion.div>

        <div className="scroll-banner__controls">
          <button type="button" className="scroll-banner__button" onClick={() => scrollByCard(-1)} aria-label={t('banner.previous')}>
            <ArrowLeft size={18} />
          </button>
          <button type="button" className="scroll-banner__button" onClick={() => scrollByCard(1)} aria-label={t('banner.next')}>
            <ArrowRight size={18} />
          </button>
        </div>

        <div
          className="scroll-banner__viewport"
          ref={viewportRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="scroll-banner__track">
            {loopItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="scroll-banner__item"
                aria-hidden={index >= items.length ? 'true' : undefined}
              >
                <BannerCard item={item} lang={lang} inert={index >= items.length} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
