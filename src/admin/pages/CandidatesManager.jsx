import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';

export default function CandidatesManager() {
  const { t, lang } = useAdminLang();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('candidates')
        .select(`
          id, nr, name, slug, image_url, is_published,
          candidate_translations (lang, role)
        `)
        .order('nr');
      if (!error && data) {
        setCandidates(data.map(c => {
          const isLang = c.candidate_translations?.find(t => t.lang === 'is');
          const enLang = c.candidate_translations?.find(t => t.lang === 'en');
          const role = lang === 'en' ? (enLang?.role || isLang?.role || '') : (isLang?.role || '');
          return { ...c, role };
        }));
      }
      setLoading(false);
    }
    load();
  }, [lang]);

  if (loading) {
    return (
      <div className="admin-page">
        <div style={{ color: 'var(--admin-text-3)', textAlign: 'center', paddingTop: '3rem' }}>
          {t('general.loading')}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header__top">
          <div>
            <h1 className="admin-page-title">{t('candidates.title')}</h1>
            <p className="admin-page-subtitle">{t('candidates.subtitle')}</p>
          </div>
        </div>
      </div>

      {candidates.length === 0 ? (
        <div className="admin-empty">
          <svg className="admin-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          </svg>
          <div className="admin-empty__text">
            {lang === 'is' ? 'Engir frambjóðendur fundust. Frumstilltu gagnasafnið á yfirlitssíðunni.' : 'No candidates found. Initialize the database on the overview page.'}
          </div>
        </div>
      ) : (
        <div className="admin-candidate-grid">
          {candidates.map(candidate => (
            <Link
              key={candidate.id}
              to={`/admin/candidates/${candidate.slug}`}
              className="admin-candidate-card"
            >
              <div className="admin-candidate-card__photo">
                <img
                  src={candidate.image_url || '/F Skagastrond.jpg'}
                  alt={candidate.name}
                  className="admin-candidate-card__img"
                  onError={e => { e.target.src = '/F Skagastrond.jpg'; }}
                />
                <div className={`admin-candidate-card__nr ${candidate.nr === 1 ? 'admin-candidate-card__nr--lead' : ''}`}>
                  {candidate.nr}
                </div>
              </div>
              <div className="admin-candidate-card__info">
                <div className="admin-candidate-card__name">{candidate.name}</div>
                <div className="admin-candidate-card__role">{candidate.role}</div>
              </div>
              <div className="admin-candidate-card__edit-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                {t('candidates.edit')}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
