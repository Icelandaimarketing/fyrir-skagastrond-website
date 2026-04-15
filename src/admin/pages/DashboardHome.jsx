import React, { useState } from 'react';
import { useAdminLang } from '../context/AdminLangContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { supabase } from '../../lib/supabase';
import { seedDatabase } from '../seed/seedData';
import toast from 'react-hot-toast';

const CANDIDATE_NAMES = [
  'Vigdís Elva Þorgeirsdóttir',
  'Ragnar Rögnvaldsson',
  'Ástrós Elísdóttir',
  'Jóhann Guðbjartur Sigurjónsson',
  'Halla María Þórðardóttir',
  'Patrik Snær Bjarnason',
  'Eva Dís Gunnarsdóttir',
  'Andri Már Welding',
  'Daniela Esmeralda Ortega',
  'Ágúst Óðinn Ómarsson',
];

function StatCard({ icon, value, label, colorClass }) {
  return (
    <div className="admin-stat-card">
      <div className={`admin-stat-card__icon admin-stat-card__icon--${colorClass}`}>
        {icon}
      </div>
      <div>
        <div className="admin-stat-card__value">{value}</div>
        <div className="admin-stat-card__label">{label}</div>
      </div>
    </div>
  );
}

function ActionCard({ icon, iconColor, title, desc, onClick, to }) {
  const El = to ? 'a' : 'div';
  return (
    <El className="admin-action-card" href={to} onClick={onClick}>
      <div className="admin-action-card__icon" style={{ background: `var(--admin-${iconColor}-light)`, color: `var(--admin-${iconColor})` }}>
        {icon}
      </div>
      <div>
        <div className="admin-action-card__title">{title}</div>
        <div className="admin-action-card__desc">{desc}</div>
      </div>
    </El>
  );
}

export default function DashboardHome() {
  const { t, lang } = useAdminLang();
  const { user } = useAdminAuth();
  const [seeding, setSeeding] = useState(false);
  const [dbEmpty, setDbEmpty] = useState(null); // null = loading, true/false
  const [seedDone, setSeedDone] = useState(false);

  // Check if DB is empty
  React.useEffect(() => {
    async function check() {
      try {
        const { data, error } = await supabase.from('site_content').select('id').limit(1);
        if (error) { setDbEmpty(true); return; }
        setDbEmpty(!data || data.length === 0);
      } catch { setDbEmpty(true); }
    }
    check();
  }, []);

  async function handleSeed() {
    setSeeding(true);
    const result = await seedDatabase(supabase);
    setSeeding(false);
    if (result.ok) {
      setSeedDone(true);
      setDbEmpty(false);
      toast.success(t('dash.init_success'));
    } else {
      toast.error(`${t('dash.init_error')}: ${result.error}`);
    }
  }

  const ACTIONS = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
      iconColor: 'blue',
      title: lang === 'is' ? 'Breyta textainnihaldi' : 'Edit page content',
      desc: lang === 'is' ? 'Yfirskriftir, lýsingar, slagorð' : 'Headlines, descriptions, slogans',
      to: '/admin/content',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      iconColor: 'red',
      title: lang === 'is' ? 'Frambjóðendur' : 'Candidates',
      desc: lang === 'is' ? 'Myndir, ævisögur, starfsheiti' : 'Photos, bios, job titles',
      to: '/admin/candidates',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
      iconColor: 'blue',
      title: lang === 'is' ? 'Facebook færslur' : 'Facebook posts',
      desc: lang === 'is' ? 'Bæta við eða fjarlægja færslur' : 'Add or remove posts',
      to: '/admin/facebook',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      iconColor: 'green',
      title: lang === 'is' ? 'Sambandsupplýsingar' : 'Contact details',
      desc: lang === 'is' ? 'Sími, netfang, staðsetning' : 'Phone, email, location',
      to: '/admin/contact',
    },
  ];

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-header__top">
          <div>
            <h1 className="admin-page-title">{t('dash.welcome')} 👋</h1>
            <p className="admin-page-subtitle" style={{ marginTop: '0.35rem' }}>
              {lang === 'is'
                ? 'Hér getur þú stjórnað öllu innihaldi vefsíðunnar Fyrir Skagaströnd.'
                : 'Here you can manage all content on the Fyrir Skagaströnd website.'}
            </p>
          </div>
          <div className="admin-badge admin-badge--live" style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
            <span className="admin-badge__dot" style={{ background: 'var(--admin-green)', animation: 'pulse 2s infinite' }} />
            {t('dash.site_live')}
          </div>
        </div>
      </div>

      {/* DB setup card — only shown if empty */}
      {dbEmpty === true && !seedDone && (
        <div className="admin-init-card">
          <div className="admin-init-card__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
          </div>
          <div className="admin-init-card__title">{t('dash.setup_required')}</div>
          <div className="admin-init-card__desc">{t('dash.setup_desc')}</div>
          <button
            className="admin-btn admin-btn--primary admin-btn--lg"
            onClick={handleSeed}
            disabled={seeding}
          >
            {seeding ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                {t('dash.init_loading')}
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.49-5"/><polyline points="1 20 1 14 7 14"/>
                </svg>
                {t('dash.init_db')}
              </>
            )}
          </button>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }`}</style>
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-row">
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          value="10"
          label={t('dash.candidates_count')}
          colorClass="red"
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
          value="96"
          label={t('dash.content_keys')}
          colorClass="blue"
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
          value="7"
          label={t('dash.languages')}
          colorClass="green"
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
          value="✓"
          label={lang === 'is' ? 'Vefsíðan er virk' : 'Site is active'}
          colorClass="green"
        />
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--admin-text-1)', marginBottom: '1rem' }}>
          {t('dash.quick_actions')}
        </h2>
        <div className="admin-actions-grid">
          {ACTIONS.map(action => (
            <ActionCard key={action.to} {...action} />
          ))}
        </div>
      </div>

      {/* Candidate preview list */}
      <div className="admin-card">
        <div className="admin-card__header">
          <div>
            <div className="admin-card__title">
              {lang === 'is' ? 'Frambjóðendur á lista' : 'Candidates on the list'}
            </div>
            <div className="admin-card__subtitle">
              {lang === 'is' ? 'Allir 10 frambjóðendur eru á listanum' : 'All 10 candidates are on the list'}
            </div>
          </div>
          <a href="/admin/candidates" className="admin-btn admin-btn--secondary admin-btn--sm">
            {lang === 'is' ? 'Breyta' : 'Edit'}
          </a>
        </div>
        <div className="admin-card__body" style={{ padding: '0.75rem' }}>
          {CANDIDATE_NAMES.map((name, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.75rem',
              borderRadius: '8px',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--admin-surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: i === 0 ? '#FFD700' : 'var(--admin-red)',
                color: i === 0 ? '#1a1a1a' : 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 800, flexShrink: 0,
              }}>{i + 1}</div>
              <span style={{ fontSize: '13px', color: 'var(--admin-text-1)', fontWeight: 500 }}>{name}</span>
              {i === 0 && (
                <span className="admin-badge admin-badge--live" style={{ marginLeft: 'auto' }}>
                  Oddviti
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
