import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/useTranslation';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Add or remove Facebook post embeds here
const FACEBOOK_POSTS = [
  {
    src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid035eWeaEpe9sGDUueiFuAn5SDa6VUXRkQHBioV3f4G1nTcjeMVkaW3XZmncSemVXkQl%26id%3D61576485865769&show_text=true&width=500',
    height: 700,
  },
  {
    src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02LwQdoKvYsmMp3gEbRaa2fpYkAcYa6KQaNfjUjW2pegjVbEcEMsJwfahE4AARsSTPl%26id%3D61576485865769&show_text=true&width=500',
    height: 700,
  },
];

export default function FacebookPosts() {
  const { t } = useTranslation();

  return (
    <section id="frettir" className="section section--white">
      <div className="container">
        <motion.div
          className="section__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge--blue">{t('fb.badge')}</span>
          <h2 className="section__title">{t('fb.title')}</h2>
          <p className="section__subtitle">{t('fb.subtitle')}</p>
        </motion.div>

        <div className="fb-posts__grid">
          {FACEBOOK_POSTS.map((post, index) => (
            <motion.div
              key={index}
              className="fb-posts__card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <iframe
                src={post.src}
                width="500"
                height={post.height}
                style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={`Facebook færsla ${index + 1}`}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="fb-posts__cta"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://www.facebook.com/profile.php?id=61576485865769"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--blue"
          >
            {t('fb.seeall')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
