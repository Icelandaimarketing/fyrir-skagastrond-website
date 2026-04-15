import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
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
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import AdminApp from './admin/AdminApp';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const timeoutId = window.setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => window.clearTimeout(timeoutId);
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

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
      <FacebookPosts />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <Routes>
          {/* ── Admin dashboard — its own layout ── */}
          <Route path="/admin/*" element={<AdminApp />} />

          {/* ── Public pages ── */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/frambjodandi/:slug"
            element={
              <PublicLayout>
                <CandidateProfile />
              </PublicLayout>
            }
          />
          <Route
            path="/personuvernd"
            element={
              <PublicLayout>
                <PrivacyPolicy />
              </PublicLayout>
            }
          />
          <Route
            path="/vafrakokur"
            element={
              <PublicLayout>
                <CookiePolicy />
              </PublicLayout>
            }
          />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
