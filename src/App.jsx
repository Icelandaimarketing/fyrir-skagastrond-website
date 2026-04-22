import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { PublicDataProvider, usePublicData } from './context/PublicDataContext';
import { useTranslation } from './i18n/useTranslation';
import Header from './components/Header';
import Hero from './components/Hero';
import WaveDivider from './components/WaveDivider';
import Pillars from './components/Pillars';
import Candidates from './components/Candidates';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CandidateProfile from './components/CandidateProfile';
import FacebookPosts from './components/FacebookPosts';
import InfiniteBanner from './components/InfiniteBanner';
import PolicyPage from './components/PolicyPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';

const AdminApp = lazy(() => import('./admin/AdminApp'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const timeoutId = window.setTimeout(() => {
          const elementStyles = getComputedStyle(el);
          const headerHeight = Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--header-height')
          ) || 72;
          const scrollMarginTop = Number.parseFloat(elementStyles.scrollMarginTop) || headerHeight + 24;
          const top = el.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }, 100);
        return () => window.clearTimeout(timeoutId);
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function SeoRuntime() {
  const { t } = useTranslation();
  const { settings } = usePublicData();

  useEffect(() => {
    const title = t('seo.title');
    const description = t('seo.description');
    const image = settings.og_image_url || settings.hero_image_url;

    document.title = title;

    const setMeta = (selector, attr, value) => {
      const el = document.head.querySelector(selector);
      if (el && value) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
  }, [settings, t]);

  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <WaveDivider />
      <Pillars />
      <Candidates />
      <About />
      <InfiniteBanner />
      <FacebookPosts />
      <Contact />
    </>
  );
}

function AdminRoute() {
  const { t } = useTranslation();

  return (
    <Suspense
      fallback={(
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#080d15',
            color: '#f0f4f8',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {t('app.loadingAdmin')}
        </div>
      )}
    >
      <AdminApp />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <PublicDataProvider>
          <ScrollToTop />
          <SeoRuntime />
          <Routes>
            <Route path="/admin/*" element={<AdminRoute />} />
            <Route
              path="/"
              element={(
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              )}
            />
            <Route
              path="/frambjodandi/:slug"
              element={(
                <PublicLayout>
                  <CandidateProfile />
                </PublicLayout>
              )}
            />
            <Route
              path="/personuvernd"
              element={(
                <PublicLayout>
                  <PrivacyPolicy />
                </PublicLayout>
              )}
            />
            <Route
              path="/vafrakokur"
              element={(
                <PublicLayout>
                  <CookiePolicy />
                </PublicLayout>
              )}
            />
            <Route
              path="/malefni/:slug"
              element={(
                <PublicLayout>
                  <PolicyPage />
                </PublicLayout>
              )}
            />
          </Routes>
        </PublicDataProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
