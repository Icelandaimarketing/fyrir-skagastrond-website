import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

const LAST_UPDATED = '2026-04-09';

export default function CookiePolicy() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <section className="section section--sky">
        <div className="container">
          <Link to="/" className="candidate-profile__back" style={{ color: 'var(--navy)', marginBottom: '2rem', display: 'inline-flex' }}>
            <ArrowLeft size={18} />
            {t('legal.back')}
          </Link>

          <div className="candidate-profile__bio-card" style={{ maxWidth: '800px' }}>
            <div className="candidate-profile__bio-header">
              <Cookie size={20} />
              <span>{t('cookie.title')}</span>
            </div>

            <div className="legal-content">
              <h1 className="legal-title">{t('cookie.title')}</h1>
              <p className="legal-meta">{t('privacy.updated')} {LAST_UPDATED}</p>

              <h2>{t('cookie.what.title')}</h2>
              <p>{t('cookie.what.text')}</p>

              <h2>{t('cookie.which.title')}</h2>
              <p>{t('cookie.which.text')}</p>

              <h2>{t('privacy.contact.title')}</h2>
              <p>{t('privacy.contact.text')}</p>
              <ul>
                <li><strong>Email:</strong> xk.fyrirskagastrond@gmail.com</li>
                <li><strong>{t('contact.phone')}:</strong> 891 7869</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
