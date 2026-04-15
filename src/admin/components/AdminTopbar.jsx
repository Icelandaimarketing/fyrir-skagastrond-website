import React from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminLang } from '../context/AdminLangContext';

export default function AdminTopbar({ title, breadcrumb }) {
  const { user, signOut } = useAdminAuth();
  const { t, lang, toggleLang } = useAdminLang();

  const initials = user?.email?.charAt(0).toUpperCase() || 'A';

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__left">
        <div className="admin-topbar__title">{title}</div>
        {breadcrumb && <div className="admin-topbar__breadcrumb">{breadcrumb}</div>}
      </div>

      <div className="admin-topbar__right">
        {/* IS/EN language toggle */}
        <div className="admin-lang-toggle">
          <button
            className={`admin-lang-toggle__btn ${lang === 'is' ? 'active' : ''}`}
            onClick={() => lang !== 'is' && toggleLang()}
            title="Íslenska"
          >IS</button>
          <button
            className={`admin-lang-toggle__btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => lang !== 'en' && toggleLang()}
            title="English"
          >EN</button>
        </div>

        {/* User info */}
        <div className="admin-topbar__user">
          <div className="admin-topbar__avatar">{initials}</div>
          <span className="admin-topbar__email">{user?.email}</span>
        </div>

        {/* Sign out */}
        <button
          className="admin-btn admin-btn--ghost admin-btn--sm"
          onClick={signOut}
          title={t('topbar.logout')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          {t('topbar.logout')}
        </button>
      </div>
    </header>
  );
}
