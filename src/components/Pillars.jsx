import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Users, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Pillars() {
  const { t } = useTranslation();

  const pillars = [
    { title: t('pillar.finance.title'), icon: Landmark, text: t('pillar.finance.text') },
    { title: t('pillar.people.title'), icon: Users, text: t('pillar.people.text') },
    { title: t('pillar.future.title'), icon: Sparkles, text: t('pillar.future.text') },
  ];

  return (
    <section id="stefna" className="section section--sky">
      <div className="container">
        <motion.div
          className="section__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge--blue">{t('pillars.badge')}</span>
          <h2 className="section__title">{t('pillars.title')}</h2>
          <p className="section__subtitle">{t('pillars.subtitle')}</p>
        </motion.div>

        <div className="pillars__grid">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                className="card pillar-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="pillar-card__icon"><Icon /></div>
                <h3 className="pillar-card__title">{pillar.title}</h3>
                <p className="pillar-card__text">{pillar.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
