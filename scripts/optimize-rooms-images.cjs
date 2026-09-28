const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const input = path.resolve('public/changes_photo/singlesitter.webp');
  const outDir = path.resolve('public/changes_photo');

  console.log('Optimizing singlesitter for mobile & desktop...');
  
  // 1. Mobile WebP (640px width, quality 80)
  await sharp(input)
    .resize(640, null, { withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(outDir, 'singlesitter-mobile.webp'));

  // 2. Mobile AVIF (640px width, quality 75)
  await sharp(input)
    .resize(640, null, { withoutEnlargement: true })
    .avif({ quality: 75, effort: 6 })
    .toFile(path.join(outDir, 'singlesitter-mobile.avif'));

  // 3. Desktop AVIF (960px width, quality 78)
  await sharp(input)
    .avif({ quality: 78, effort: 6 })
    .toFile(path.join(outDir, 'singlesitter.avif'));

  // Check sizes
  const orig = fs.statSync(input).size;
  const mobWebp = fs.statSync(path.join(outDir, 'singlesitter-mobile.webp')).size;
  const mobAvif = fs.statSync(path.join(outDir, 'singlesitter-mobile.avif')).size;
  const deskAvif = fs.statSync(path.join(outDir, 'singlesitter.avif')).size;

  console.log(`Original WebP: ${(orig / 1024).toFixed(1)} KB`);
  console.log(`Mobile WebP:   ${(mobWebp / 1024).toFixed(1)} KB`);
  console.log(`Mobile AVIF:   ${(mobAvif / 1024).toFixed(1)} KB`);
  console.log(`Desktop AVIF:  ${(deskAvif / 1024).toFixed(1)} KB`);
}

run().catch(console.error);
