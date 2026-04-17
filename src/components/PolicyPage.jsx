import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePublicData } from '../context/PublicDataContext';
import { useTranslation } from '../i18n/useTranslation';

export default function PolicyPage() {
  const { slug } = useParams();
  const { pages } = usePublicData();
  const { lang, t } = useTranslation();
  const page = pages.find(item => item.slug === slug);
  const translation = page?.page_translations?.find(item => item.lang === lang)
    || page?.page_translations?.find(item => item.lang === 'is');

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
      <div className="policy-page__ribbons" aria-hidden="true" />
      <div className="container legal-content policy-page__content">
        <Link to="/#um" className="btn btn--navy-outline"><ArrowLeft size={18} /> {t('legal.back')}</Link>
        {page.hero_image_url && (
          <img
            src={page.hero_image_url}
            alt={translation.title}
            className="policy-page__hero"
            onError={(event) => { event.currentTarget.style.display = 'none'; }}
          />
        )}
        <h1 className="legal-title">{translation.title}</h1>
        {translation.summary && <p className="section__subtitle" style={{ marginBottom: '2rem' }}>{translation.summary}</p>}
        <div className="policy-page__body">
          {(translation.body || '').split('\n').filter(Boolean).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
