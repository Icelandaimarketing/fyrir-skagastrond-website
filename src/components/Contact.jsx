import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { usePublicData } from '../context/PublicDataContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const { t } = useTranslation();
  const { contact } = usePublicData();

  const contactItems = [
    { icon: Phone, label: t('contact.phone'), value: contact.phone, href: `tel:+354${String(contact.phone || '').replace(/\D/g, '')}` },
    { icon: Mail, label: t('contact.email'), value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: t('contact.location'), value: contact.location, href: null },
  ];

  return (
    <section id="samband" className="section section--navy contact section--soft-top">
      <div className="contact__bg" aria-hidden="true" />
      <div className="container">
        <motion.div
          className="contact__card"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact__grid">
            <div>
              <span className="badge badge--ghost">{t('contact.badge')}</span>
              <h2 className="contact__title">{t('contact.title')}</h2>
              <p className="contact__desc">{t('contact.desc')}</p>
              <div className="contact__actions">
                <a href={contact.facebook_url} target="_blank" rel="noopener noreferrer" className="btn btn--red">
                  <ExternalLink size={18} /> {t('contact.facebook')}
                </a>
                <a href={`mailto:${contact.email}`} className="btn btn--outline">
                  {t('contact.email.btn')}
                </a>
              </div>
            </div>
            <div className="contact__items">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <>
                    <div className="contact__item-icon"><Icon size={20} /></div>
                    <div className="contact__item-body">
                      <div className="contact__item-label">{item.label}</div>
                      <div className={`contact__item-value ${item.href ? 'contact__item-link' : ''}`}>{item.value}</div>
                    </div>
                  </>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="contact__item">{inner}</a>
                ) : (
                  <div key={item.label} className="contact__item">{inner}</div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
