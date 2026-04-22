import { supabase } from '../../lib/supabase';

export const MEDIA_BUCKETS = [
  { id: 'site-images', label: 'Site images' },
  { id: 'candidate-photos', label: 'Candidate photos' },
];

export function getPublicStorageUrl(bucket, path) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export function createUploadPath(file, prefix = 'uploads') {
  const rawName = file.name || 'image';
  const extension = rawName.includes('.')
    ? rawName.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '')
    : '';
  const baseName = rawName.replace(/\.[^/.]+$/, '');
  const safeName = baseName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const id = crypto.randomUUID();
  return `${prefix}/${id}-${safeName || 'image'}${extension ? `.${extension}` : ''}`;
}

async function listFolderEntries(bucket, prefix = '') {
  const folderEntries = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix, {
        limit,
        offset,
        sortBy: { column: 'name', order: 'asc' },
      });
    if (error) throw error;
    if (!data?.length) break;

    folderEntries.push(...data);
    if (data.length < limit) break;
    offset += data.length;
  }

  return folderEntries;
}

export async function listStorageImages(bucket, prefix = '') {
  const data = await listFolderEntries(bucket, prefix);
  if (!data.length) return [];

  const results = [];
  for (const entry of data) {
    if (!entry.name || entry.name.startsWith('.')) continue;
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.id || entry.metadata?.size) {
      results.push({
        id: `${bucket}:${path}`,
        bucket,
        path,
        name: path,
        url: getPublicStorageUrl(bucket, path),
        size: entry.metadata?.size,
        source: 'storage',
      });
    } else {
      results.push(...await listStorageImages(bucket, path));
    }
  }
  return results;
}

export async function loadMetadataImages() {
  const [mediaResult, candidateResult] = await Promise.all([
    supabase.from('media_assets').select('bucket, path, url, title, alt_text, usage'),
    supabase.from('candidate_images').select('url, storage_path, alt_text, is_primary, is_published, candidate:candidates(name, slug, nr)'),
  ]);

  const metadataImages = [];

  if (!mediaResult.error && mediaResult.data) {
    metadataImages.push(...mediaResult.data.map(asset => ({
      id: `${asset.bucket}:${asset.path}`,
      bucket: asset.bucket,
      path: asset.path,
      name: asset.path,
      url: asset.url || getPublicStorageUrl(asset.bucket, asset.path),
      title: asset.title,
      alt_text: asset.alt_text,
      usage: asset.usage,
      source: 'media_assets',
    })));
  }

  if (!candidateResult.error && candidateResult.data) {
    metadataImages.push(...candidateResult.data
      .filter(img => img.is_published !== false)
      .map(img => ({
        id: `candidate-photos:${img.storage_path}`,
        bucket: 'candidate-photos',
        path: img.storage_path,
        name: img.storage_path,
        url: img.url || getPublicStorageUrl('candidate-photos', img.storage_path),
        title: img.candidate?.name || img.alt_text,
        alt_text: img.alt_text,
        usage: img.is_primary ? 'primary candidate photo' : 'candidate gallery',
        source: 'candidate_images',
      })));
  }

  return metadataImages;
}

function dedupeImages(images, mode = 'path') {
  const byId = new Map();
  images.forEach(img => {
    const key = mode === 'url' && img.url ? img.url : `${img.bucket}:${img.path}`;
    const existing = byId.get(key);
    byId.set(key, {
      ...existing,
      ...img,
      id: existing?.id || img.id || `${img.bucket}:${img.path}`,
    });
  });
  return Array.from(byId.values()).sort((a, b) => a.bucket.localeCompare(b.bucket) || a.path.localeCompare(b.path));
}

export async function loadMediaImages({
  buckets = MEDIA_BUCKETS.map(bucket => bucket.id),
  includeStorage = true,
  dedupeBy = 'path',
} = {}) {
  const storageRequests = includeStorage ? buckets.map(bucket => listStorageImages(bucket)) : [];
  const [metadataResult, ...bucketResults] = await Promise.allSettled([
    loadMetadataImages(),
    ...storageRequests,
  ]);

  const metadataImages = metadataResult.status === 'fulfilled' ? metadataResult.value : [];
  const storageImages = bucketResults
    .filter(result => result.status === 'fulfilled')
    .flatMap(result => result.value);
  const errors = [metadataResult, ...bucketResults]
    .filter(result => result.status === 'rejected')
    .map(result => result.reason?.message || String(result.reason));

  return {
    images: dedupeImages([...storageImages, ...metadataImages], dedupeBy),
    errors,
  };
}

export async function uploadMediaAsset(file, {
  bucket = 'site-images',
  prefix = 'uploads',
  usage = 'general',
  title = file.name,
  altText = file.name,
} = {}) {
  const path = createUploadPath(file, prefix);
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type || 'application/octet-stream', upsert: false });
  if (uploadError) throw uploadError;

  const url = getPublicStorageUrl(bucket, path);
  const { error: metadataError } = await supabase.from('media_assets').upsert({
    bucket,
    path,
    url,
    title,
    alt_text: altText,
    usage,
  }, { onConflict: 'bucket,path' });
  if (metadataError) {
    await supabase.storage.from(bucket).remove([path]);
    throw metadataError;
  }

  return {
    id: `${bucket}:${path}`,
    bucket,
    path,
    name: path,
    url,
    title,
    alt_text: altText,
    usage,
    source: 'media_assets',
  };
}

export async function deleteMediaAssetRecords(image) {
  const results = await Promise.all([
    supabase.from('media_assets').delete().eq('bucket', image.bucket).eq('path', image.path),
    image.bucket === 'candidate-photos'
      ? supabase.from('candidate_images').delete().eq('storage_path', image.path)
      : Promise.resolve({ error: null }),
  ]);
  const failed = results.find(result => result.error);
  if (failed) throw failed.error;
}
