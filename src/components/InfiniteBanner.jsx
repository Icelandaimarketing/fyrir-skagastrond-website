import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePublicData } from '../context/PublicDataContext';
import { useTranslation } from '../i18n/useTranslation';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function BannerCard({ item, lang }) {
  const title = item.title?.[lang] || item.title?.is || item.title?.en || '';
  const description = item.description?.[lang] || item.description?.is || item.description?.en || '';
  const content = (
    <>
      <img
        src={item.image_url || '/Group images/29.jpg'}
        alt={title}
        className="scroll-banner__image"
        loading="lazy"
        onError={(event) => { event.currentTarget.src = '/Group images/29.jpg'; }}
      />
      <div className="scroll-banner__content">
        <span className="scroll-banner__type">{item.type || 'Fyrir Skagastrond'}</span>
        <h3 className="scroll-banner__title">{title}</h3>
        {description && <p className="scroll-banner__text">{description}</p>}
      </div>
    </>
  );

  if (item.link_url?.startsWith('/')) {
    return <Link to={item.link_url} className="scroll-banner__card">{content}</Link>;
  }

  return <a href={item.link_url || '#frettir'} className="scroll-banner__card">{content}</a>;
}

export default function InfiniteBanner() {
  const { bannerItems } = usePublicData();
  const { t, lang } = useTranslation();
  const items = bannerItems?.length ? bannerItems : [];
  if (!items.length) return null;

  const loopItems = [...items, ...items];

  return (
    <section className="scroll-banner section section--sky" aria-label={t('banner.title')}>
      <div className="container">
        <motion.div
          className="section__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge--red">{t('banner.badge')}</span>
          <h2 className="section__title">{t('banner.title')}</h2>
          <p className="section__subtitle">{t('banner.subtitle')}</p>
        </motion.div>
      </div>

      <div className="scroll-banner__viewport">
        <div className="scroll-banner__track">
          {loopItems.map((item, index) => (
            <BannerCard key={`${item.id}-${index}`} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
