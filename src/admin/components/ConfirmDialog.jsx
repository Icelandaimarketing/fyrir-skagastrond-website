import React from 'react';
import { useAdminLang } from '../context/AdminLangContext';

/**
 * ConfirmDialog — modal confirmation dialog.
 *
 * Props:
 *   open      {boolean}
 *   title     {string}
 *   body      {string}
 *   onConfirm {fn}
 *   onCancel  {fn}
 *   dangerous {boolean} — makes confirm button red
 */
export default function ConfirmDialog({ open, title, body, onConfirm, onCancel, dangerous = false }) {
  const { t } = useAdminLang();
  if (!open) return null;

  return (
    <div className="admin-dialog-overlay" onClick={onCancel}>
      <div className="admin-dialog" onClick={e => e.stopPropagation()}>
        <div className="admin-dialog__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <h2 className="admin-dialog__title">{title}</h2>
        <p className="admin-dialog__body">{body}</p>
        <div className="admin-dialog__actions">
          <button className="admin-btn admin-btn--secondary" onClick={onCancel}>
            {t('confirm.cancel')}
          </button>
          <button
            className={`admin-btn ${dangerous ? 'admin-btn--danger' : 'admin-btn--primary'}`}
            onClick={onConfirm}
          >
            {t('confirm.yes')}
          </button>
        </div>
      </div>
    </div>
  );
}
