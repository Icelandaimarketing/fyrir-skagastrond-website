import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import { useAdminLang } from './context/AdminLangContext';

const PAGE_TITLES = {
  '/admin': { is: 'Yfirlit', en: 'Overview' },
  '/admin/content': { is: 'Vefsíðuinnihald', en: 'Page Content' },
  '/admin/candidates': { is: 'Frambjóðendur', en: 'Candidates' },
  '/admin/facebook': { is: 'Facebook færslur', en: 'Facebook Posts' },
  '/admin/contact': { is: 'Sambandsupplýsingar', en: 'Contact Details' },
  '/admin/banner': { is: 'Skroll banner', en: 'Scrolling Banner' },
  '/admin/pages': { is: 'Malefnasidur', en: 'Policy Pages' },
  '/admin/seo': { is: 'SEO stillingar', en: 'SEO Settings' },
  '/admin/media': { is: 'Myndabanki', en: 'Media Library' },
};

export default function AdminLayout({ children }) {
  const location = useLocation();
  const { lang } = useAdminLang();

  // Get page title
  let title = PAGE_TITLES[location.pathname];
  if (!title && location.pathname.startsWith('/admin/candidates/')) {
    title = { is: 'Breyta frambjóðanda', en: 'Edit Candidate' };
  }
  const titleText = title ? (title[lang] || title.is) : 'Admin';

  // Breadcrumb
  const breadcrumb = location.pathname === '/admin'
    ? null
    : `Fyrir Skagaströnd Admin → ${titleText}`;

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title={titleText} breadcrumb={breadcrumb} />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
