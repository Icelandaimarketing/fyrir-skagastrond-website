import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const PARTICLES = [
  { left: '12%', top: '10%', delay: '0s', duration: '11s' },
  { left: '22%', top: '68%', delay: '1.1s', duration: '15s' },
  { left: '34%', top: '18%', delay: '2.2s', duration: '13s' },
  { left: '46%', top: '82%', delay: '3.3s', duration: '16s' },
  { left: '58%', top: '30%', delay: '4.4s', duration: '12s' },
  { left: '69%', top: '72%', delay: '5.5s', duration: '17s' },
  { left: '78%', top: '14%', delay: '6.6s', duration: '14s' },
  { left: '86%', top: '58%', delay: '7.7s', duration: '18s' },
  { left: '17%', top: '42%', delay: '8.8s', duration: '10s' },
  { left: '29%', top: '90%', delay: '9.9s', duration: '16s' },
  { left: '63%', top: '8%', delay: '11s', duration: '12s' },
  { left: '91%', top: '36%', delay: '12.1s', duration: '15s' },
];

export default function Hero() {
  const { t } = useTranslation();

  const stats = [
    ['10', t('hero.stat.candidates')],
    ['3', t('hero.stat.slogans')],
    ['1', t('hero.stat.policy')],
  ];

  return (
    <section className="hero" id="heim">
      <div className="hero__bg-glow" aria-hidden="true" />
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
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
          <span className="badge badge--ghost">{t('hero.badge')}</span>

          <div className="hero__wordmark">
            <span className="hero__wordmark-prefix">Fyrir</span>
            <span className="hero__wordmark-main">Skagaströnd</span>
          </div>

          <h1 className="hero__headline">
            {t('hero.headline.part1')}{' '}
            <span className="hero__headline-accent">{t('hero.headline.accent')}</span>{' '}
            {t('hero.headline.part3')}
          </h1>

          <p className="hero__description">{t('hero.description')}</p>

          <div className="hero__actions">
            <a href="#samband" className="btn btn--red">{t('hero.cta')}</a>
            <a href="#frambod" className="btn btn--outline">{t('hero.cta2')}</a>
          </div>

          <div className="hero__stats">
            {stats.map(([value, label]) => (
              <div key={label} className="hero__stat">
                <div className="hero__stat-value">{value}</div>
                <div className="hero__stat-label">{label}</div>
              </div>
            ))}
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
            <div className="hero__brand-photo">
              <img src="/Spákonufell.jpg" alt="Spákonufell við sólsetur" className="hero__brand-photo-img" />
              <div className="hero__brand-photo-overlay" />
            </div>
            <div className="hero__brand-info">
              <div className="hero__brand-logo">
                <img src="/F Skagastrond.jpg" alt="Fyrir Skagaströnd merki" className="hero__brand-logo-img" />
              </div>
              <div>
                <div className="hero__brand-label">Fyrir Skagaströnd</div>
                <div className="hero__brand-slogan">{t('hero.brand.slogan')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
