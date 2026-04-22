import React, { useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAdminLang } from '../context/AdminLangContext';

/**
 * ImageUploader — drag-drop or click to upload an image to Supabase Storage.
 *
 * Props:
 *   bucket      {string}  — 'candidate-photos' | 'site-images'
 *   path        {string}  — file path inside the bucket (e.g. 'vigdis.jpg')
 *   currentUrl  {string}  — currently uploaded image URL (shows preview)
 *   onUploaded  {fn}      — (publicUrl: string) => void
 *   accept      {string}  — file accept types (default 'image/jpeg,image/png,image/webp')
 */
export default function ImageUploader({ bucket = 'candidate-photos', path, currentUrl, fallbackUrl = '/F Skagastrond.jpg', onUploaded, accept = 'image/jpeg,image/png,image/webp' }) {
  const { t } = useAdminLang();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || null);
  const [error, setError] = useState('');

  async function handleFile(file) {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError(t('upload.error.size'));
      return;
    }
    setError('');
    setUploading(true);
    try {
      const filePath = path || `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      const publicUrl = data.publicUrl;
      setPreview(publicUrl);
      onUploaded?.(publicUrl);
    } catch (err) {
      setError(err.message || t('upload.error.failed'));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {/* Current image preview */}
      {preview && (
        <div style={{ marginBottom: '0.75rem' }}>
          <img
            src={preview}
            alt={t('upload.preview')}
            style={{
              width: '100%',
              maxWidth: '280px',
              aspectRatio: '3/4',
              objectFit: 'cover',
              borderRadius: '10px',
              border: '1px solid var(--admin-border)',
            }}
            onError={(event) => {
              if (event.currentTarget.dataset.fallbackApplied) {
                event.currentTarget.src = '/F Skagastrond.jpg';
                return;
              }
              event.currentTarget.dataset.fallbackApplied = 'true';
              event.currentTarget.src = fallbackUrl;
            }}
          />
        </div>
      )}

      {/* Drop zone */}
      <div
        className={`admin-uploader ${dragging ? 'drag-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={e => handleFile(e.target.files[0])}
        />

        {uploading ? (
          <div style={{ color: 'var(--admin-text-2)', fontSize: '13px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite', marginBottom: '0.5rem' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <br />
            {t('upload.loading')}
          </div>
        ) : (
          <>
            <svg className="admin-uploader__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <div className="admin-uploader__text">
              {t('upload.dropzone')}
            </div>
            <div className="admin-uploader__hint">
              {t('upload.hint')}
            </div>
          </>
        )}
      </div>

      {error && (
        <div style={{ color: '#f87171', fontSize: '12px', marginTop: '0.5rem' }}>{error}</div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
