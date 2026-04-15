import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAdminLang } from '../context/AdminLangContext';

const NAV_ITEMS = [
  {
    group: null,
    items: [
      { to: '/admin', label: 'nav.home', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>
      ), end: true },
    ]
  },
  {
    group: 'Vefsíða / Site',
    items: [
      { to: '/admin/content', label: 'nav.content', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
      )},
      { to: '/admin/candidates', label: 'nav.candidates', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )},
      { to: '/admin/facebook', label: 'nav.facebook', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )},
      { to: '/admin/contact', label: 'nav.contact', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      )},
    ]
  },
  {
    group: 'Stillingar / Settings',
    items: [
      { to: '/admin/media', label: 'nav.media', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
        </svg>
      )},
      { to: '/admin/seo', label: 'nav.seo', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      )},
    ]
  }
];

export default function AdminSidebar() {
  const { t } = useAdminLang();
  const location = useLocation();

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <a href="/" target="_blank" rel="noopener noreferrer" className="admin-sidebar__brand">
        <img src="/F Skagastrond.jpg" alt="Fyrir Skagaströnd" className="admin-sidebar__logo" />
        <div className="admin-sidebar__brand-text">
          <span className="admin-sidebar__brand-name">Fyrir Skagaströnd</span>
          <span className="admin-sidebar__brand-sub">Admin Dashboard</span>
        </div>
      </a>

      {/* Nav */}
      <nav className="admin-sidebar__nav" aria-label="Admin navigation">
        {NAV_ITEMS.map((section, si) => (
          <React.Fragment key={si}>
            {section.group && (
              <div className="admin-sidebar__section-label">{section.group}</div>
            )}
            {section.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="admin-nav-link__icon">{item.icon}</span>
                {t(item.label)}
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </nav>

      {/* Footer: view live site */}
      <div className="admin-sidebar__footer">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn admin-btn--ghost admin-btn--full"
          style={{ fontSize: '12px', gap: '0.5rem' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          fyrirskagastrond.com
        </a>
      </div>
    </aside>
  );
}
