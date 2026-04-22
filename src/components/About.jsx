import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Handshake, Home, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation';
import { ABOUT_POLICY_CARDS } from '../data/policyProgram';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ICONS = [Handshake, Home, Lightbulb];

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="um" className="section section--sky section--soft-top">
      <div className="container">
        <motion.div
          className="section__header section__header--left about__intro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section__title">{t('about.title')}</h2>
          <p className="section__subtitle">{t('about.text1')}</p>
          <p className="about__text">{t('about.text2')}</p>
          <div className="about__campaign-line">{t('about.core.slogan')}</div>
        </motion.div>

        <motion.div
          className="about__features"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {ABOUT_POLICY_CARDS.map((item, index) => {
            const Icon = ICONS[index] || Lightbulb;
            return (
              <Link key={item.slug} to={`/malefni/${item.slug}`} className="campaign-card about__feature-card">
                <div className="campaign-card__icon"><Icon /></div>
                <span className="campaign-card__kicker">{t(item.categoryKey)}</span>
                <h3 className="campaign-card__title">{t(item.titleKey)}</h3>
                <p className="campaign-card__text">{t(item.summaryKey)}</p>
                <span className="campaign-card__link">
                  {t('about.readMore')} <ChevronRight size={17} />
                </span>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
