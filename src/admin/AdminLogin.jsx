import React, { useState } from 'react';
import { useAdminAuth } from './context/AdminAuthContext';
import { useAdminLang } from './context/AdminLangContext';
import { isSupabaseConfigured } from '../lib/supabase';
import './admin.css';

export default function AdminLogin() {
  const { signIn } = useAdminAuth();
  const { t, lang, toggleLang } = useAdminLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        throw new Error('Supabase is not configured');
      }
      await signIn(email, password);
    } catch (err) {
      setError(isSupabaseConfigured ? t('login.error') : t('login.config_error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-root">
      <div className="admin-login-page">
        <div className="admin-login-card">
          {/* Language toggle */}
          <div className="admin-login-lang">
            <div className="admin-lang-toggle">
              <button
                className={`admin-lang-toggle__btn ${lang === 'is' ? 'active' : ''}`}
                onClick={() => lang !== 'is' && toggleLang()}
              >IS</button>
              <button
                className={`admin-lang-toggle__btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => lang !== 'en' && toggleLang()}
              >EN</button>
            </div>
          </div>

          {/* Brand */}
          <div className="admin-login-logo">
            <img src="/F Skagastrond.jpg" alt="Fyrir Skagaströnd" className="admin-login-logo__img" />
            <div className="admin-login-logo__text">
              <span className="admin-login-logo__name">Fyrir Skagaströnd</span>
              <span className="admin-login-logo__sub">{t('admin.brand_subtitle')}</span>
            </div>
          </div>

          <h1 className="admin-login__title">{t('login.title')}</h1>
          <p className="admin-login__subtitle">{t('login.subtitle')}</p>

          <form className="admin-login__form" onSubmit={handleSubmit} autoComplete="on">
            {error && (
              <div className="admin-login__error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="admin-email">{t('login.email')}</label>
              <input
                id="admin-email"
                type="email"
                className="admin-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="xk.fyrirskagastrond@gmail.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="admin-password">{t('login.password')}</label>
              <input
                id="admin-password"
                type="password"
                className="admin-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="admin-btn admin-btn--primary admin-btn--lg admin-btn--full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  {t('login.loading')}
                </>
              ) : t('login.submit')}
            </button>
          </form>

          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    </div>
  );
}
