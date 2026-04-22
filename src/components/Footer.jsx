import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand-col">
            <div className="footer__brand">
              <img src="/F Skagastrond.jpg" alt={t('brand.logoAlt')} className="footer__logo" />
              <div>
                <div className="footer__brand-name">{t('brand.name')}</div>
                <div className="footer__brand-sub">{t('nav.subtitle')} {currentYear}</div>
              </div>
            </div>
            <p className="footer__tagline">{t('about.core.slogan')}</p>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">{t('footer.links')}</h4>
            <a href="/#stefna" className="footer__link">{t('nav.stefna')}</a>
            <a href="/#frambod" className="footer__link">{t('nav.frambod')}</a>
            <a href="/#um" className="footer__link">{t('nav.um')}</a>
            <a href="/#samband" className="footer__link">{t('nav.samband')}</a>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">{t('footer.contact')}</h4>
            <a href="tel:+3548917869" className="footer__link">891 7869</a>
            <a href="mailto:xk.fyrirskagastrond@gmail.com" className="footer__link">xk.fyrirskagastrond@gmail.com</a>
            <a href="https://www.facebook.com/profile.php?id=61576485865769" target="_blank" rel="noopener noreferrer" className="footer__link">{t('footer.facebook')}</a>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">{t('footer.legal')}</h4>
            <a href="/personuvernd" className="footer__link">{t('footer.privacy')}</a>
            <a href="/vafrakokur" className="footer__link">{t('footer.cookies')}</a>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            © {currentYear} Fyrir Skagaströnd. {t('footer.copyright')}
          </div>
          <div className="footer__developer">
            {t('footer.developer')}{' '}
            <a href="https://icelandaim.com" target="_blank" rel="noopener noreferrer" className="footer__dev-link">
              IcelandAIM
            </a>
            {' '}— Gunnar Þór Gunnarsson
          </div>
        </div>
      </div>
    </footer>
  );
}
