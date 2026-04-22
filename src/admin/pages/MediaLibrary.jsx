import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';
import { deleteMediaAssetRecords, loadMediaImages, MEDIA_BUCKETS, uploadMediaAsset } from '../lib/mediaAssets';

export default function MediaLibrary() {
  const { lang } = useAdminLang();
  const [images, setImages] = useState([]);
  const [activeBucket, setActiveBucket] = useState('all');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [loadError, setLoadError] = useState('');

  async function load() {
    setLoading(true);
    setLoadError('');
    try {
      const { images: nextImages, errors } = await loadMediaImages();
      setImages(nextImages);
      if (errors.length) {
        setLoadError(errors.join(' | '));
      }
    } catch (error) {
      const message = error.message || String(error);
      setLoadError(message);
      toast.error(message);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error(lang === 'is' ? 'Mynd má ekki vera stærri en 5MB' : 'Image must be smaller than 5MB');
      return;
    }
    setUploading(true);
    const uploadBucket = activeBucket === 'candidate-photos' ? 'candidate-photos' : 'site-images';
    try {
      await uploadMediaAsset(file, {
        bucket: uploadBucket,
        usage: uploadBucket === 'candidate-photos' ? 'candidate gallery' : 'general',
      });
      toast.success(lang === 'is' ? 'Mynd hlaðin upp!' : 'Image uploaded!');
      load();
    } catch (error) {
      toast.error(error.message);
    }
    setUploading(false);
    e.target.value = '';
  }

  async function deleteImage() {
    if (!deleteTarget) return;
    const { error } = await supabase.storage.from(deleteTarget.bucket).remove([deleteTarget.path]);
    if (error) { toast.error(error.message); } else {
      await deleteMediaAssetRecords(deleteTarget);
      toast.success(lang === 'is' ? 'Mynd eytt!' : 'Image deleted!');
      setDeleteTarget(null);
      load();
    }
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
      toast.success(lang === 'is' ? 'Slóð afrituð!' : 'URL copied!');
    });
  }

  const filteredImages = activeBucket === 'all'
    ? images
    : images.filter(img => img.bucket === activeBucket);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-header__top">
          <div>
            <h1 className="admin-page-title">{lang === 'is' ? 'Myndabanki' : 'Media Library'}</h1>
            <p className="admin-page-subtitle">
              {lang === 'is'
                ? 'Hér getur þú hlaðið upp myndum og afritað slóðir til notkunar á vefsíðunni.'
                : 'Upload images here and copy URLs to use on the website.'}
            </p>
          </div>
          <label className="admin-btn admin-btn--primary" style={{ cursor: 'pointer' }}>
            {uploading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                {lang === 'is' ? 'Hleð upp...' : 'Uploading...'}
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                {lang === 'is' ? 'Hlaða upp mynd' : 'Upload image'}
              </>
            )}
            <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      <div className="admin-media-toolbar">
        <button
          className={`admin-btn admin-btn--sm ${activeBucket === 'all' ? 'admin-btn--primary' : 'admin-btn--secondary'}`}
          onClick={() => setActiveBucket('all')}
        >
          {lang === 'is' ? 'Allar myndir' : 'All images'} ({images.length})
        </button>
        {MEDIA_BUCKETS.map(bucket => (
          <button
            key={bucket.id}
            className={`admin-btn admin-btn--sm ${activeBucket === bucket.id ? 'admin-btn--primary' : 'admin-btn--secondary'}`}
            onClick={() => setActiveBucket(bucket.id)}
          >
            {bucket.label} ({images.filter(img => img.bucket === bucket.id).length})
          </button>
        ))}
      </div>

      {loadError && (
        <div className="admin-alert admin-alert--error">
          {lang === 'is' ? 'Ekki tókst að sækja myndir: ' : 'Could not load images: '}
          {loadError}
        </div>
      )}

      {loading ? (
        <div style={{ color: 'var(--admin-text-3)', textAlign: 'center', paddingTop: '2rem' }}>
          {lang === 'is' ? 'Hleður...' : 'Loading...'}
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="admin-empty">
          <svg className="admin-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          <div className="admin-empty__text">{lang === 'is' ? 'Engar myndir enn.' : 'No images yet.'}</div>
        </div>
      ) : (
        <div className="admin-media-grid">
          {filteredImages.map(img => (
            <div key={img.id || `${img.bucket}:${img.path}`} className="admin-media-item">
              <img src={img.url} alt={img.name} className="admin-media-item__img" />
              <div className="admin-media-item__overlay">
                <button
                  className="admin-btn admin-btn--secondary admin-btn--sm"
                  onClick={() => copyUrl(img.url)}
                  title={lang === 'is' ? 'Afrita slóð' : 'Copy URL'}
                >
                  {copiedUrl === img.url
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  }
                </button>
                <button
                  className="admin-btn admin-btn--danger admin-btn--sm"
                  onClick={() => setDeleteTarget(img)}
                  title={lang === 'is' ? 'Eyða' : 'Delete'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>
              <div className="admin-media-item__name">
                <span>{img.name}</span>
                <small>{img.bucket}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title={lang === 'is' ? 'Eyða mynd?' : 'Delete image?'}
        body={lang === 'is' ? 'Þetta er óafturkræft. Ertu viss?' : 'This cannot be undone. Are you sure?'}
        onConfirm={deleteImage}
        onCancel={() => setDeleteTarget(null)}
        dangerous
      />

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
