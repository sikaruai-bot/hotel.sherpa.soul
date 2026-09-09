const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/lenovo/.gemini/antigravity-ide/brain/3a1ed44a-19e5-455d-b1f3-c75ae4340e50/.user_uploaded/media_1788940360418.png';

async function run() {
  console.log('Reading source image from:', srcPath);
  if (!fs.existsSync(srcPath)) {
    throw new Error('Source file does not exist: ' + srcPath);
  }

  // 1. Trim transparent whitespace around logo with small 10px safety padding
  const trimmed = await sharp(srcPath)
    .trim()
    .extend({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer({ resolveWithObject: true });

  console.log('Trimmed with padding dimensions:', trimmed.info.width, 'x', trimmed.info.height);

  // 2. Save public/logo.png
  await sharp(trimmed.data)
    .png({ compressionLevel: 9, quality: 100 })
    .toFile('public/logo.png');
  console.log('Saved public/logo.png');

  // 3. Save public/logo.webp
  await sharp(trimmed.data)
    .webp({ quality: 95, effort: 6, lossless: false })
    .toFile('public/logo.webp');
  console.log('Saved public/logo.webp');

  // Also update public/log.webp just in case
  await sharp(trimmed.data)
    .webp({ quality: 95, effort: 6, lossless: false })
    .toFile('public/log.webp');

  // 4. Also copy to dist if dist exists
  if (fs.existsSync('dist')) {
    fs.copyFileSync('public/logo.png', 'dist/logo.png');
    fs.copyFileSync('public/logo.webp', 'dist/logo.webp');
    fs.copyFileSync('public/log.webp', 'dist/log.webp');
    console.log('Copied to dist/');
  }

  // 5. Generate crisp square favicon from the emblem (mountains + sun + roof)
  const emblemCrop = await sharp(trimmed.data)
    .extract({
      left: Math.round(trimmed.info.width * 0.15),
      top: 0,
      width: Math.round(trimmed.info.width * 0.70),
      height: Math.round(trimmed.info.height * 0.58)
    })
    .trim()
    .extend({
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .resize(192, 192, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer({ resolveWithObject: true });

  await sharp(emblemCrop.data)
    .png()
    .toFile('public/favicon.png');
  console.log('Saved public/favicon.png (192x192)');

  await sharp(emblemCrop.data)
    .webp({ quality: 95 })
    .toFile('public/favicon.webp');
  console.log('Saved public/favicon.webp (192x192)');

  if (fs.existsSync('dist')) {
    fs.copyFileSync('public/favicon.png', 'dist/favicon.png');
    fs.copyFileSync('public/favicon.webp', 'dist/favicon.webp');
  }

  console.log('All logo and favicon assets successfully generated!');
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
