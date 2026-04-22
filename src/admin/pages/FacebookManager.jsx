import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';

export default function FacebookManager() {
  const { t, lang } = useAdminLang();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newHeight, setNewHeight] = useState(400);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function load() {
    const { data, error } = await supabase
      .from('facebook_posts')
      .select('*')
      .order('sort_order');
    if (!error && data) setPosts(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addPost() {
    if (!newUrl.trim()) return;
    setSaving(true);
    const { error } = await supabase.from('facebook_posts').insert({
      embed_url: newUrl.trim(),
      height: Number(newHeight) || 400,
      sort_order: posts.length,
      is_active: true,
    });
    if (error) { toast.error(error.message); } else {
      toast.success(t('fb.added'));
      setNewUrl('');
      setNewHeight(400);
      setShowAdd(false);
      load();
    }
    setSaving(false);
  }

  async function toggleActive(post) {
    const { error } = await supabase
      .from('facebook_posts')
      .update({ is_active: !post.is_active })
      .eq('id', post.id);
    if (!error) {
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, is_active: !p.is_active } : p));
      toast.success(t('fb.saved'));
    }
  }

  async function deletePost() {
    if (!deleteTarget) return;
    const { error } = await supabase.from('facebook_posts').delete().eq('id', deleteTarget.id);
    if (!error) {
      toast.success(t('fb.deleted'));
      setDeleteTarget(null);
      load();
    } else {
      toast.error(error.message);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header__top">
          <div>
            <h1 className="admin-page-title">{t('fb.title')}</h1>
            <p className="admin-page-subtitle">{t('fb.subtitle')}</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={() => setShowAdd(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {t('fb.add')}
          </button>
        </div>
      </div>

      {/* Add new post form */}
      {showAdd && (
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <div className="admin-card__header">
            <div className="admin-card__title">
              {t('fb.add_form.title')}
            </div>
          </div>
          <div className="admin-card__body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="admin-form-group">
              <label className="admin-label">{t('fb.url_label')}</label>
              <input
                type="url"
                className="admin-input"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                placeholder={t('fb.url_placeholder')}
              />
              <div style={{fontSize:'11px',color:'var(--admin-text-3)',marginTop:'4px'}}>
                {t('fb.add_form.help')}
              </div>
            </div>
            <div className="admin-form-group" style={{ maxWidth: '200px' }}>
              <label className="admin-label">{t('fb.height_label')}</label>
              <input
                type="number"
                className="admin-input"
                value={newHeight}
                onChange={e => setNewHeight(e.target.value)}
                min={200}
                max={1000}
                step={50}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="admin-btn admin-btn--primary" onClick={addPost} disabled={saving || !newUrl.trim()}>
                {saving ? t('content.saving') : t('fb.save')}
              </button>
              <button className="admin-btn admin-btn--secondary" onClick={() => { setShowAdd(false); setNewUrl(''); }}>
                {t('general.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts list */}
      {loading ? (
        <div style={{ color: 'var(--admin-text-3)', textAlign: 'center', paddingTop: '2rem' }}>{t('general.loading')}</div>
      ) : posts.length === 0 ? (
        <div className="admin-empty">
          <svg className="admin-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
          <div className="admin-empty__text">{t('fb.empty')}</div>
        </div>
      ) : (
        <div className="admin-fb-list">
          {posts.map((post, idx) => (
            <div key={post.id} className="admin-fb-item">
              <div className="admin-fb-item__header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: '12px', color: 'var(--admin-text-3)', flexShrink: 0 }}>#{idx + 1}</span>
                  <span className="admin-fb-item__url">{post.embed_url}</span>
                </div>
                <div className="admin-fb-item__actions">
                  <span className={`admin-badge ${post.is_active ? 'admin-badge--live' : 'admin-badge--inactive'}`}>
                    <span className="admin-badge__dot" />
                    {post.is_active ? t('fb.active') : t('fb.inactive')}
                  </span>
                  <button
                    className="admin-btn admin-btn--secondary admin-btn--sm"
                    onClick={() => toggleActive(post)}
                    title={post.is_active ? t('fb.hide') : t('fb.show')}
                  >
                    {post.is_active
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                  <button
                    className="admin-btn admin-btn--danger admin-btn--sm"
                    onClick={() => setDeleteTarget(post)}
                    title={t('general.delete')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div style={{ padding: '0.75rem 1rem', fontSize: '12px', color: 'var(--admin-text-3)' }}>
                {t('fb.height_prefix')}: {post.height}px
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title={t('confirm.delete.title')}
        body={t('confirm.delete.body')}
        onConfirm={deletePost}
        onCancel={() => setDeleteTarget(null)}
        dangerous
      />
    </div>
  );
}
