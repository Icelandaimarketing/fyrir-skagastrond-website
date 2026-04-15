import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, MessageCircle, MapPin, Star, Tv, Utensils, Clock } from 'lucide-react';
import { getCandidateBySlug, candidates } from '../data/candidates';
import { useTranslation } from '../i18n/useTranslation';
import qa from '../data/candidateQA';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const QA_ITEMS = [
  { key: 'fritimi',     labelKey: 'qa.q.fritimi',     icon: Clock },
  { key: 'pizza',       labelKey: 'qa.q.pizza',       icon: Utensils },
  { key: 'netflix',     labelKey: 'qa.q.netflix',     icon: Tv },
  { key: 'samstarf',    labelKey: 'qa.q.samstarf',    icon: Users },
  { key: 'uppahald',    labelKey: 'qa.q.uppahald',    icon: MapPin },
  { key: 'kjortimabil', labelKey: 'qa.q.kjortimabil', icon: Star },
  { key: 'annad',       labelKey: 'qa.q.annad',       icon: MessageCircle },
];

export default function CandidateProfile() {
  const { slug } = useParams();
  const candidate = getCandidateBySlug(slug);
  const { t, lang } = useTranslation();
  const candidateQA = qa[slug] || null;

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

  const currentIndex = candidates.findIndex(c => c.slug === slug);
  const prev = currentIndex > 0 ? candidates[currentIndex - 1] : null;
  const next = currentIndex < candidates.length - 1 ? candidates[currentIndex + 1] : null;

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>

      {/* ── HERO ── */}
      <section className="candidate-profile__hero">
        <div className="candidate-profile__hero-bg" />
        <div className="container candidate-profile__hero-inner">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
            <Link to="/#frambod" className="candidate-profile__back">
              <ArrowLeft size={18} /> {t('profile.back')}
            </Link>
          </motion.div>

          <div className="candidate-profile__hero-content">
            <motion.div className="candidate-profile__photo-wrap" variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6 }}>
              <img src={candidate.image} alt={candidate.name} className="candidate-profile__photo" />
              <div className="candidate-profile__number">{candidate.nr}</div>
            </motion.div>

            <motion.div className="candidate-profile__info" variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="badge badge--ghost">
                {candidate.nr === 1 ? t('profile.oddviti') : `${t('profile.nr')} ${candidate.nr} ${t('profile.onlist')}`}
              </span>
              <h1 className="candidate-profile__name">{candidate.name}</h1>
              <p className="candidate-profile__role">{t(candidate.roleKey)}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BIO + Q&A ── */}
      <section className="section section--sky">
        <div className="container">

          {/* Bio card */}
          <motion.div className="candidate-profile__bio-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="candidate-profile__bio-header">
              <Users size={20} />
              <span>{t('profile.about')}</span>
            </div>
            <p className="candidate-profile__bio-text">{t(candidate.bioKey)}</p>

            <div className="candidate-profile__core">
              <img src="/F Skagastrond.jpg" alt="Fyrir Skagaströnd" className="candidate-profile__core-logo" />
              <div>
                <div className="candidate-profile__core-label">{t('profile.policy')}</div>
                <div className="candidate-profile__core-slogan">{t('about.core.slogan')}</div>
              </div>
            </div>
          </motion.div>

          {/* Q&A section */}
          {candidateQA && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginTop: '2.5rem' }}
            >
              <div className="candidate-profile__qa-header">
                <MessageCircle size={20} />
                <span>{t('qa.section.title')}</span>
              </div>
              <p className="candidate-profile__qa-subtitle">{t('qa.section.subtitle')}</p>

              <div className="candidate-profile__qa-grid">
                {QA_ITEMS.map(({ key, labelKey, icon: Icon }, i) => {
                  const answer = candidateQA[key];
                  if (!answer) return null;
                  const text = answer[lang] || answer['en'] || answer['is'];
                  return (
                    <motion.div
                      key={key}
                      className="candidate-profile__qa-card"
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <div className="candidate-profile__qa-question">
                        <Icon size={16} className="candidate-profile__qa-icon" />
                        <span>{t(labelKey)}</span>
                      </div>
                      <p className="candidate-profile__qa-answer">{text}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Prev / Next navigation */}
          <motion.div className="candidate-profile__nav" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            {prev && (
              <Link to={`/frambjodandi/${prev.slug}`} className="candidate-profile__nav-link candidate-profile__nav-link--prev">
                <ArrowLeft size={16} />
                <div>
                  <span className="candidate-profile__nav-dir">{t('profile.prev')}</span>
                  <span className="candidate-profile__nav-name">{prev.name}</span>
                </div>
              </Link>
            )}
            <Link to="/#frambod" className="candidate-profile__nav-all">{t('profile.all')}</Link>
            {next && (
              <Link to={`/frambjodandi/${next.slug}`} className="candidate-profile__nav-link candidate-profile__nav-link--next">
                <div style={{ textAlign: 'right' }}>
                  <span className="candidate-profile__nav-dir">{t('profile.next')}</span>
                  <span className="candidate-profile__nav-name">{next.name}</span>
                </div>
                <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            )}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
