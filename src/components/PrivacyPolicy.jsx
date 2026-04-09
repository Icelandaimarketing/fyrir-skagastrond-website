import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

const LAST_UPDATED = '2026-04-09';

export default function PrivacyPolicy() {
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
              <Shield size={20} />
              <span>{t('privacy.title')}</span>
            </div>

            <div className="legal-content">
              <h1 className="legal-title">{t('privacy.title')}</h1>
              <p className="legal-meta">{t('privacy.updated')} {LAST_UPDATED}</p>

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
        </div>
      </section>
    </div>
  );
}
