import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminLangProvider } from './context/AdminLangContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import DashboardHome from './pages/DashboardHome';
import ContentEditor from './pages/ContentEditor';
import CandidatesManager from './pages/CandidatesManager';
import CandidateEditor from './pages/CandidateEditor';
import FacebookManager from './pages/FacebookManager';
import ContactEditor from './pages/ContactEditor';
import SEOEditor from './pages/SEOEditor';
import MediaLibrary from './pages/MediaLibrary';
import BannerManager from './pages/BannerManager';
import PagesManager from './pages/PagesManager';
import './admin.css';

function ProtectedRoutes() {
  const { user, profile, authError, loading, signOut } = useAdminAuth();

  if (loading) {
    return (
      <div className="admin-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', color: 'var(--admin-text-3)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <div style={{ fontSize: '14px' }}>Hleður...</div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (!profile) {
    return (
      <div className="admin-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <div className="admin-card" style={{ maxWidth: '520px', width: '100%' }}>
          <div className="admin-card__body" style={{ textAlign: 'center' }}>
            <div className="admin-dialog__icon" style={{ margin: '0 auto 1.25rem' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1 className="admin-login__title">Admin access is not enabled</h1>
            <p className="admin-login__subtitle" style={{ lineHeight: 1.6 }}>
              This account is authenticated, but it is not listed in <code>admin_profiles</code>.
              {authError ? ` ${authError}` : ''}
            </p>
            <button className="admin-btn admin-btn--primary" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="content" element={<ContentEditor />} />
        <Route path="candidates" element={<CandidatesManager />} />
        <Route path="candidates/:slug" element={<CandidateEditor />} />
        <Route path="facebook" element={<FacebookManager />} />
        <Route path="contact" element={<ContactEditor />} />
        <Route path="banner" element={<BannerManager />} />
        <Route path="pages" element={<PagesManager />} />
        <Route path="seo" element={<SEOEditor />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}

function LoginGuard() {
  const { user, loading } = useAdminAuth();
  if (loading) return null;
  if (user) return <Navigate to="/admin" replace />;
  return <AdminLogin />;
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminLangProvider>
        <div className="admin-root">
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--admin-surface)',
                color: 'var(--admin-text-1)',
                border: '1px solid var(--admin-border-2)',
                borderRadius: '10px',
                fontSize: '13px',
              },
              success: { iconTheme: { primary: '#4ade80', secondary: 'var(--admin-surface)' } },
              error: { iconTheme: { primary: '#f87171', secondary: 'var(--admin-surface)' } },
            }}
          />
          <Routes>
            <Route path="login" element={<LoginGuard />} />
            <Route path="*" element={<ProtectedRoutes />} />
          </Routes>
        </div>
      </AdminLangProvider>
    </AdminAuthProvider>
  );
}
