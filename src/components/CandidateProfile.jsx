import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MessageCircle,
  Tv,
  Utensils,
  Users,
  Clock,
} from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { usePublicData } from '../context/PublicDataContext';
import candidateQa from '../data/candidateQaContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const PERSONAL_QA_ITEMS = [
  { key: 'fritimi', labelKey: 'qa.q.fritimi', icon: Clock },
  { key: 'pizza', labelKey: 'qa.q.pizza', icon: Utensils },
  { key: 'netflix', labelKey: 'qa.q.netflix', icon: Tv },
  { key: 'samstarf', labelKey: 'qa.q.samstarf', icon: Users },
];

function getLocalized(entry, lang) {
  if (!entry) return '';
  return entry[lang] || entry.is || entry.en || '';
}

export default function CandidateProfile() {
  const { slug } = useParams();
  const { candidates } = usePublicData();
  const { t, lang } = useTranslation();

  const candidate = candidates.find((item) => item.slug === slug) || null;

  if (!candidate) {
    return (
      <div className="candidate-profile section section--sky" style={{ paddingTop: 'calc(var(--header-height) + 4rem)', textAlign: 'center' }}>
        <div className="container">
          <h1 className="section__title">{t('profile.notfound')}</h1>
          <p className="section__subtitle" style={{ marginBottom: '2rem' }}>{t('profile.notfound.text')}</p>
          <Link to="/" className="btn btn--blue">
            <ArrowLeft size={18} /> {t('profile.back.btn')}
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = candidates.findIndex((item) => item.slug === slug);
  const prev = currentIndex > 0 ? candidates[currentIndex - 1] : null;
  const next = currentIndex < candidates.length - 1 ? candidates[currentIndex + 1] : null;
  const candidateSource = candidateQa[candidate.slug] || {};

  const displayName = getLocalized(candidateSource.nafn, lang) || candidate.name;
  const priorities = getLocalized(candidateSource.kjortimabil, lang);
  const extra = getLocalized(candidateSource.annad, lang);
  const metaItems = [
    {
      key: 'aldur',
      label: t('profile.meta.age'),
      value: getLocalized(candidateSource.aldur, lang),
    },
    {
      key: 'fjolskylda',
      label: t('profile.meta.family'),
      value: getLocalized(candidateSource.fjolskylda, lang),
    },
    {
      key: 'uppahald',
      label: t('profile.meta.favorite'),
      value: getLocalized(candidateSource.uppahald, lang),
    },
  ].filter((item) => item.value);

  const personalItems = PERSONAL_QA_ITEMS
    .map(({ key, labelKey, icon }) => ({
      key,
      icon,
      label: t(labelKey),
      value: getLocalized(candidateSource[key], lang),
    }))
    .filter((item) => item.value);

  const getCandidateName = (item) => getLocalized(candidateQa[item.slug]?.nafn, lang) || item.name;

  return (
    <div className="candidate-profile" style={{ paddingTop: 'var(--header-height)' }}>
      <section className="candidate-profile__hero">
        <div className="candidate-profile__hero-bg" />
        <div className="container candidate-profile__hero-inner">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.45 }}>
            <Link to="/#frambod" className="candidate-profile__back">
              <ArrowLeft size={18} /> {t('profile.back')}
            </Link>
          </motion.div>

          <div className="candidate-profile__hero-layout">
            <motion.div
              className="candidate-profile__portrait-panel"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55 }}
            >
              <div className="candidate-profile__portrait-glow" />
              <img
                src={candidate.primary_image_url || candidate.image_url || candidate.image}
                alt={displayName}
                className="candidate-profile__photo"
                onError={(event) => {
                  const fallback = candidate.fallback_image_url || '/F Skagastrond.jpg';
                  if (event.currentTarget.dataset.fallbackApplied) {
                    event.currentTarget.src = '/F Skagastrond.jpg';
                    return;
                  }
                  event.currentTarget.dataset.fallbackApplied = 'true';
                  event.currentTarget.src = fallback;
                }}
              />
              <div className="candidate-profile__number">{candidate.nr}</div>
            </motion.div>

            <motion.div
              className="candidate-profile__hero-copy"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              <span className="candidate-profile__status">
                {`${t('profile.nr')} ${candidate.nr} ${t('profile.onlist')}`}
              </span>
              <h1 className="candidate-profile__name">{displayName}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section section--sky section--soft-top candidate-profile__body">
        <div className="container candidate-profile__content">
          {!!metaItems.length && (
            <motion.section
              className="candidate-profile__facts"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              {metaItems.map((item, index) => (
                <motion.article
                  key={item.key}
                  className="candidate-profile__fact-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="candidate-profile__fact-label">{item.label}</div>
                  <div className="candidate-profile__fact-value">{item.value}</div>
                </motion.article>
              ))}
            </motion.section>
          )}

          {priorities && (
            <motion.article
              className="candidate-profile__statement"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="candidate-profile__statement-kicker">{t('profile.statement')}</div>
              <div className="candidate-profile__statement-text">{priorities}</div>
            </motion.article>
          )}

          {extra && (
            <motion.article
              className="candidate-profile__statement candidate-profile__statement--secondary"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="candidate-profile__statement-kicker">{t('profile.additional')}</div>
              <div className="candidate-profile__statement-text">{extra}</div>
            </motion.article>
          )}

          {!!personalItems.length && (
            <motion.section
              className="candidate-profile__personal"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <div className="candidate-profile__qa-header">
                <MessageCircle size={20} />
                <span>{t('qa.section.title')}</span>
              </div>
              <p className="candidate-profile__qa-subtitle">{t('qa.section.subtitle')}</p>

              <div className="candidate-profile__qa-grid candidate-profile__qa-grid--profile">
                {personalItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={item.key}
                      className="candidate-profile__qa-card"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div className="candidate-profile__qa-question">
                        <Icon size={16} className="candidate-profile__qa-icon" />
                        <span>{item.label}</span>
                      </div>
                      <p className="candidate-profile__qa-answer">{item.value}</p>
                    </motion.article>
                  );
                })}
              </div>
            </motion.section>
          )}

          <motion.div
            className="candidate-profile__nav"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {prev ? (
              <Link to={`/frambjodandi/${prev.slug}`} className="candidate-profile__nav-link candidate-profile__nav-link--prev">
                <ArrowLeft size={16} />
                <div>
                  <span className="candidate-profile__nav-dir">{t('profile.prev')}</span>
                  <span className="candidate-profile__nav-name">{getCandidateName(prev)}</span>
                </div>
              </Link>
            ) : <div className="candidate-profile__nav-spacer" />}

            <Link to="/#frambod" className="candidate-profile__nav-all">{t('profile.all')}</Link>

            {next ? (
              <Link to={`/frambjodandi/${next.slug}`} className="candidate-profile__nav-link candidate-profile__nav-link--next">
                <div style={{ textAlign: 'right' }}>
                  <span className="candidate-profile__nav-dir">{t('profile.next')}</span>
                  <span className="candidate-profile__nav-name">{getCandidateName(next)}</span>
                </div>
                <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            ) : <div className="candidate-profile__nav-spacer" />}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
