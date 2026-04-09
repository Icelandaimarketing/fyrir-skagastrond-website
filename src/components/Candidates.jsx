import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { candidates } from '../data/candidates';
import { useTranslation } from '../i18n/useTranslation';


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Candidates() {
  const { t } = useTranslation();

  return (
    <section id="frambod" className="section section--white">
      <div className="container">
        <motion.div
          className="candidates__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="candidates__header-text">
            <span className="badge badge--red">{t('candidates.badge')}</span>
            <h2 className="candidates__header-title">{t('candidates.title')}</h2>
            <p className="candidates__header-desc">{t('candidates.desc')}</p>
          </div>
        </motion.div>

        <div className="candidates__grid">
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.nr}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <Link to={`/frambjodandi/${candidate.slug}`} className="card candidate-card candidate-card--clickable">
                <div className="candidate-card__inner">
                  <div className="candidate-card__photo-wrap">
                    <img src={candidate.image} alt={candidate.name} className="candidate-card__photo" loading="lazy" />
                    <span className={`candidate-card__badge ${candidate.nr === 1 ? 'candidate-card__badge--lead' : ''}`}>{candidate.nr}</span>
                  </div>
                  <div>
                    <h3 className="candidate-card__name">{candidate.name}</h3>
                    <p className="candidate-card__role">{t(candidate.roleKey)}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
