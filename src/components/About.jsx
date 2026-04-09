import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const { t } = useTranslation();

  const featureCards = [
    { title: t('about.feature1.title'), text: t('about.feature1.text') },
    { title: t('about.feature2.title'), text: t('about.feature2.text') },
    { title: t('about.feature3.title'), text: t('about.feature3.text') },
  ];

  return (
    <section id="um" className="section section--sky">
      <div className="container">
        <div className="about__grid">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge--navy">{t('about.badge')}</span>
            <h2 className="about__title">{t('about.title')}</h2>
            <p className="about__text">{t('about.text1')}</p>
            <p className="about__text">{t('about.text2')}</p>

            <div className="about__core-message">
              <div className="about__core-logo">
                <img src="/F Skagastrond.jpg" alt="Fyrir Skagaströnd" className="header__logo-img" />
              </div>
              <div>
                <div className="about__core-label">{t('about.core.label')}</div>
                <div className="about__core-slogan">{t('about.core.slogan')}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about__features"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {featureCards.map((item, i) => (
              <div key={i} className="card card--static about__feature-card">
                <div className="about__feature-inner">
                  <div>
                    <h3 className="about__feature-title">{item.title}</h3>
                    <p className="about__feature-text">{item.text}</p>
                  </div>
                  <ChevronRight className="about__feature-icon" size={20} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
