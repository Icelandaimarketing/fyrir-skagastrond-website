/**
 * upload-candidate-photos.mjs
 * 
 * Uploads the selected candidate photos to Supabase Storage (candidate-photos bucket).
 * Named by candidate slug: vigdis.jpg, ragnar.jpg, etc.
 * 
 * Run: node upload-candidate-photos.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const SUPABASE_URL = 'https://yestlkukcdjlrtvxugkg.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllc3Rsa3VrY2RqbHJ0dnh1Z2tnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI2Mjc5MCwiZXhwIjoyMDkxODM4NzkwfQ.-Xi3Dcgp_XKaKam1mBw-OW9d0zjq2AxxAe14LZIkb44';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Candidate → selected photo file (relative to /public)
const UPLOADS = [
  { slug: 'vigdis',   name: 'Vigdís Elva Þorgeirsdóttir', localPath: 'public/Vigdís 1st/1.jpg' },
  { slug: 'ragnar',   name: 'Ragnar Rögnvaldsson',          localPath: 'public/Ragnar 2nd/22.jpg' },
  { slug: 'astros',   name: 'Ástrós Elísdóttir',            localPath: 'public/Ástrós 3rd/25.jpg' },
  { slug: 'johann',   name: 'Jóhann Guðbjartur Sigurjónsson', localPath: 'public/Jóhann 4th/5.jpg' },
  { slug: 'halla',    name: 'Halla María Þórðardóttir',     localPath: 'public/Halla 5th/19.jpg' },
  // Patrik — photos not available yet, skipping
  { slug: 'eva-dis',  name: 'Eva Dís Gunnarsdóttir',        localPath: 'public/Eva Dís 7th/14.jpg' },
  { slug: 'andri',    name: 'Andri Már Welding',             localPath: 'public/Andri 8th/10.jpg' },
  { slug: 'daniela',  name: 'Daniela Esmeralda Ortega',     localPath: 'public/Daniela 9th/18.jpg' },
  { slug: 'agust',    name: 'Ágúst Óðinn Ómarsson',         localPath: 'public/Ágúst 10th/7.jpg' },
];

const BUCKET = 'candidate-photos';

async function uploadAll() {
  console.log('🚀 Starting candidate photo upload to Supabase Storage...\n');
  let successCount = 0;
  let errorCount = 0;

  for (const candidate of UPLOADS) {
    const localFull = resolve(candidate.localPath);
    const storagePath = `${candidate.slug}.jpg`;

    try {
      const fileBuffer = readFileSync(localFull);
      console.log(`⬆  Uploading ${candidate.name}...`);
      console.log(`   Local:   ${candidate.localPath}`);
      console.log(`   Storage: ${BUCKET}/${storagePath}`);

      const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true,  // overwrite if already exists
        });

      if (error) {
        console.error(`   ❌ ERROR: ${error.message}\n`);
        errorCount++;
      } else {
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
        console.log(`   ✅ Done! URL: ${urlData.publicUrl}\n`);
        successCount++;
      }
    } catch (err) {
      console.error(`   ❌ File read error for ${candidate.name}: ${err.message}\n`);
      errorCount++;
    }
  }

  console.log('─────────────────────────────────────────');
  console.log(`✅ Success: ${successCount}  ❌ Errors: ${errorCount}`);
  if (errorCount === 0) {
    console.log('\n🎉 All photos uploaded! Run npm run dev and click "Initialize Database" in the admin dashboard.');
  } else {
    console.log('\n⚠️  Some uploads failed. Check the errors above.');
  }

  // Print the image_url values to use in the database
  console.log('\n📋 Supabase public URLs for each candidate:');
  for (const c of UPLOADS) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(`${c.slug}.jpg`);
    console.log(`  ${c.slug}: ${data.publicUrl}`);
  }
}

uploadAll();
