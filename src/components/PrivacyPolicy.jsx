import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

const LAST_UPDATED = '2026-04-09';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <article className="policy-page">
      <div className="policy-page__ribbons" aria-hidden="true" />
      <div className="container legal-content policy-page__content">
        <Link to="/" className="btn btn--navy-outline"><ArrowLeft size={18} /> {t('legal.back')}</Link>

        <h1 className="legal-title">{t('privacy.title')}</h1>
        <p className="legal-meta">{t('privacy.updated')} {LAST_UPDATED}</p>

        <div className="policy-page__body">
          <h2>{t('privacy.1.title')}</h2>
          <p>{t('privacy.1.text')}</p>

          <h2>{t('privacy.2.title')}</h2>
          <p>{t('privacy.2.text')}</p>
          <ul>
            <li><strong>{t('privacy.2.item1')}</strong></li>
            <li><strong>{t('privacy.2.item2')}</strong></li>
          </ul>

          <h2>{t('privacy.contact.title')}</h2>
          <p>{t('privacy.contact.text')}</p>
          <ul>
            <li><strong>Email:</strong> xk.fyrirskagastrond@gmail.com</li>
            <li><strong>{t('contact.phone')}:</strong> 891 7869</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
