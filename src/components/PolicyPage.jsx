import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePublicData } from '../context/PublicDataContext';
import { useTranslation } from '../i18n/useTranslation';
import {
  buildPolicyPageContent,
  findPolicyPage,
  getPolicyTranslation,
  POLICY_PROGRAM,
} from '../data/policyProgram';

function getTranslation(page, lang) {
  return page?.page_translations?.find((item) => item.lang === lang)
    || page?.page_translations?.find((item) => item.lang === 'is')
    || null;
}

export default function PolicyPage() {
  const { slug } = useParams();
  const { pages } = usePublicData();
  const { lang, t } = useTranslation();
  const page = pages.find((item) => item.slug === slug) || findPolicyPage(slug);
  const translation = getTranslation(page, lang)
    || (page ? buildPolicyPageContent(page, lang) : null);
  const currentIndex = POLICY_PROGRAM.findIndex((item) => item.slug === page?.slug);
  const nextPolicy = currentIndex >= 0 ? POLICY_PROGRAM[currentIndex + 1] || null : null;
  const nextPage = nextPolicy
    ? pages.find((item) => item.slug === nextPolicy.slug) || nextPolicy
    : null;
  const nextTranslation = nextPage
    ? getTranslation(nextPage, lang) || buildPolicyPageContent(nextPage, lang)
    : null;
  const nextPolicyMeta = nextPage ? getPolicyTranslation(nextPage, lang) : null;

  if (!page || !translation) {
    return (
      <section className="section section--sky" style={{ paddingTop: 'calc(var(--header-height) + 4rem)' }}>
        <div className="container legal-content">
          <Link to="/" className="btn btn--blue"><ArrowLeft size={18} /> {t('legal.back')}</Link>
          <h1 className="legal-title" style={{ marginTop: '2rem' }}>{t('profile.notfound')}</h1>
        </div>
      </section>
    );
  }

  return (
    <article className="policy-page">
      <div className="policy-page__brand-surface" aria-hidden="true" />
      <div className="policy-page__ribbons" aria-hidden="true" />
      <div className="container policy-page__content">
        <Link to="/#stefna" className="policy-page__back">
          <ArrowLeft size={18} /> {t('legal.back')}
        </Link>

        <div className="policy-page__masthead">
          <div className="policy-page__masthead-copy">
            <div className="policy-page__eyebrow">{t('policyPage.eyebrow')}</div>
            <h1 className="policy-page__title">{translation.title}</h1>
            {translation.summary && <p className="policy-page__summary">{translation.summary}</p>}
          </div>

          <div className="policy-page__brand-badge" aria-hidden="true">
            <img
              src="/F Skagastrond.jpg"
              alt=""
              className="policy-page__brand-logo"
              loading="lazy"
            />
          </div>
        </div>

        <div className="policy-page__body">
          {(translation.body || '').split('\n').filter(Boolean).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {nextPolicy && nextTranslation && (
          <div className="policy-page__navigation">
            <div className="policy-page__navigation-label">{t('policyPage.upNext')}</div>
            <Link to={`/malefni/${nextPolicy.slug}`} className="policy-page__next-card">
              <div className="policy-page__next-copy">
                <span className="policy-page__next-kicker">{nextPolicyMeta?.category || nextPolicy.category}</span>
                <span className="policy-page__next-title">{nextTranslation.title}</span>
                {nextTranslation.summary && (
                  <span className="policy-page__next-summary">{nextTranslation.summary}</span>
                )}
              </div>
              <span className="policy-page__next-action">
                {t('policyPage.next')} <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
