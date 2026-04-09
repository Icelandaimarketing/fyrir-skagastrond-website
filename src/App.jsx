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
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/frambjodandi/:slug" element={<CandidateProfile />} />
              <Route path="/personuvernd" element={<PrivacyPolicy />} />
              <Route path="/vafrakokur" element={<CookiePolicy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
