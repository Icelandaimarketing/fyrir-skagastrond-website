import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/#stefna', label: t('nav.stefna') },
    { href: '/#frambod', label: t('nav.frambod') },
    { href: '/#um', label: t('nav.um') },
    { href: '/#frettir', label: t('nav.frettir') },
    { href: '/#samband', label: t('nav.samband') },
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          <Link to="/" className="header__brand" aria-label="Fyrir Skagaströnd">
            <div className="header__logo">
              <img
                src="/F Skagastrond.jpg"
                alt="Fyrir Skagaströnd merki"
                className="header__logo-img"
              />
            </div>
            <div className="header__brand-text">
              <span className="header__brand-name">Fyrir Skagaströnd</span>
              <span className="header__brand-sub">{t('nav.subtitle')}</span>
            </div>
          </Link>

          <nav className="header__nav" aria-label="Aðalvalmynd">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="header__nav-link">
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
            <Link to="/admin" className="header__admin-link">
              {t('nav.admin')}
            </Link>
            <a href="/#samband" className="header__nav-cta">X við K</a>
          </nav>

          <div className="header__mobile-right">
            <LanguageSwitcher />
            <button
              className="header__mobile-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Loka valmynd' : 'Opna valmynd'}
              aria-expanded={menuOpen}
            >
              <span style={menuOpen ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
              <span style={menuOpen ? { opacity: 0 } : {}} />
              <span style={menuOpen ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="/#samband" className="mobile-menu__cta" onClick={() => setMenuOpen(false)}>
          X við K
        </a>
        <Link to="/admin" className="mobile-menu__admin" onClick={() => setMenuOpen(false)}>
          {t('nav.admin')}
        </Link>
      </div>
    </>
  );
}
