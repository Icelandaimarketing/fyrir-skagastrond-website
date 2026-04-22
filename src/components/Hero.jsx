import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';
import { usePublicData } from '../context/PublicDataContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const PARTICLES = [
  { left: '12%', top: '10%', delay: '0s', duration: '11s' },
  { left: '34%', top: '18%', delay: '2.2s', duration: '13s' },
  { left: '58%', top: '30%', delay: '4.4s', duration: '12s' },
  { left: '78%', top: '14%', delay: '6.6s', duration: '14s' },
  { left: '17%', top: '42%', delay: '8.8s', duration: '10s' },
  { left: '63%', top: '8%', delay: '11s', duration: '12s' },
];

export default function Hero() {
  const { t } = useTranslation();
  const { settings } = usePublicData();
  const heroImage = settings?.hero_image_url || '/Group images/group_with_logo.jpg';
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <section className="hero" id="heim">
      <div className="hero__bg-glow" aria-hidden="true" />
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((particle, index) => (
          <div
            key={index}
            className="hero__particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7 }}
        >
          <h1 className="hero__headline">
            <span className="hero__headline-brand">{t('brand.name')}</span>
            <span className="hero__headline-line">
              {t('hero.headline.part1')}{' '}
              <span className="hero__headline-accent">{t('hero.headline.accent')}</span>{' '}
              {t('hero.headline.part3')}
            </span>
          </h1>

          <p className="hero__description">{t('hero.description')}</p>

          <div className="hero__actions">
            <a href="#samband" className="btn btn--red">{t('hero.cta')}</a>
            <a href="#frambod" className="btn btn--outline">{t('hero.cta2')}</a>
          </div>

          <div className="hero__trust-line" aria-label={t('hero.trustLineAria')}>
            <span>10 {t('hero.stat.candidates')}</span>
            <span>{t('hero.stat.policy')}</span>
            <span>{t('about.core.slogan')}</span>
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="hero__brand-card">
            <button
              type="button"
              className="hero__brand-photo"
              onClick={() => setLightboxOpen(true)}
              aria-label={t('hero.image.open')}
            >
              <img
                src={heroImage}
                alt={t('brand.name')}
                className="hero__brand-photo-img"
                fetchPriority="high"
                onError={(event) => { event.currentTarget.src = '/Group images/group_with_logo.jpg'; }}
              />
              <div className="hero__brand-photo-overlay" />
              <span className="hero__image-hint">{t('hero.image.hint')}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {lightboxOpen && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t('hero.image.dialog')}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
        >
          <button type="button" className="image-lightbox__close" onClick={() => setLightboxOpen(false)}>
            {t('hero.image.close')}
          </button>
          <img src={heroImage} alt={t('brand.name')} className="image-lightbox__image" />
        </div>
      )}
    </section>
  );
}
