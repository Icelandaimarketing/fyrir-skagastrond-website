import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { usePublicData } from '../context/PublicDataContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const swapPost = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

function getFacebookEmbedUrl(embedUrl) {
  try {
    const url = new URL(embedUrl);
    url.searchParams.set('show_text', 'true');
    url.searchParams.set('width', '500');
    return url.toString();
  } catch {
    return embedUrl;
  }
}

export default function FacebookPosts() {
  const { t } = useTranslation();
  const { facebookPosts, contact } = usePublicData();
  const posts = useMemo(() => facebookPosts || [], [facebookPosts]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!posts.length) return;
    if (activeIndex >= posts.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, posts.length]);

  if (!posts.length) return null;

  const activePost = posts[activeIndex];
  const hasMultiplePosts = posts.length > 1;
  const activeCount = String(activeIndex + 1).padStart(2, '0');
  const totalCount = String(posts.length).padStart(2, '0');

  const showPreviousPost = () => {
    setActiveIndex((current) => (current === 0 ? posts.length - 1 : current - 1));
  };

  const showNextPost = () => {
    setActiveIndex((current) => (current === posts.length - 1 ? 0 : current + 1));
  };

  return (
    <section id="frettir" className="section section--white section--soft-top">
      <div className="container">
        <motion.div
          className="section__header section__header--left"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge--red">{t('fb.badge')}</span>
          <h2 className="section__title">{t('fb.title')}</h2>
          <p className="section__subtitle">{t('fb.subtitle')}</p>
        </motion.div>

        <motion.div
          className="fb-posts__stage"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
        >
          <div className="fb-posts__toolbar">
            <div className="fb-posts__meta">
              <span className="fb-posts__eyebrow">{t('fb.platform')}</span>
              <span className="fb-posts__count">{activeCount} / {totalCount}</span>
            </div>

            {hasMultiplePosts ? (
              <div className="fb-posts__controls">
                <button
                  type="button"
                  className="scroll-banner__button"
                  onClick={showPreviousPost}
                  aria-label={t('fb.previous')}
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  className="scroll-banner__button"
                  onClick={showNextPost}
                  aria-label={t('fb.next')}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : <div className="fb-posts__toolbar-spacer" aria-hidden="true" />}

            <a href={contact.facebook_url} target="_blank" rel="noopener noreferrer" className="btn btn--blue">
              <ExternalLink size={18} /> {t('fb.seeall')}
            </a>
          </div>

          {hasMultiplePosts && (
            <div className="fb-posts__progress" aria-label={t('fb.progress')}>
              {posts.map((post, index) => (
                <button
                  key={post.id || post.embed_url || index}
                  type="button"
                  className={`fb-posts__dot ${index === activeIndex ? 'fb-posts__dot--active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${t('fb.showPost')} ${index + 1}`}
                  aria-pressed={index === activeIndex}
                >
                  <span className="sr-only">{t('fb.post')} {index + 1}</span>
                </button>
              ))}
            </div>
          )}

          <div className="fb-posts__viewer">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePost.id || activePost.embed_url || activeIndex}
                className="fb-posts__native"
                variants={swapPost}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <iframe
                  src={getFacebookEmbedUrl(activePost.embed_url || activePost.src)}
                  width="500"
                  height={activePost.height || 760}
                  className="fb-posts__embed"
                  scrolling="no"
                  frameBorder="0"
                  loading="lazy"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={`${t('fb.post')} ${activeIndex + 1}`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
