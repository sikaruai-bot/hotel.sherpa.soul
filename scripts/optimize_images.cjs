const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 720;
const QUALITY = 85;

// Skip logos and icons
const SKIP_PATTERNS = [
  /favicon/i,
  /logo/i,
  /qr\./i,
  /vite\.svg/i,
  /flag/i,
  /google\.webp/i,
  /trip\.webp/i
];

function getAllImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results = results.concat(getAllImages(filePath));
    } else if (/\.(webp|png|jpg|jpeg)$/i.test(file)) {
      results.push(filePath);
    }
  }
  return results;
}

async function optimizeImages() {
  const images = getAllImages(path.join(__dirname, '..', 'public'));
  console.log(`Found ${images.length} images in public directory.`);
  let optimizedCount = 0;
  let skippedCount = 0;

  for (const imgPath of images) {
    const filename = path.basename(imgPath);
    const isSkipped = SKIP_PATTERNS.some(p => p.test(filename));
    if (isSkipped) {
      skippedCount++;
      continue;
    }

    try {
      const inputBuffer = fs.readFileSync(imgPath);
      const metadata = await sharp(inputBuffer).metadata();
      const needsResize = (metadata.width && metadata.width > TARGET_WIDTH) || 
                          (metadata.height && metadata.height > TARGET_HEIGHT);

      if (needsResize) {
        console.log(`Resizing: ${filename} (${metadata.width}x${metadata.height} -> max ${TARGET_WIDTH}x${TARGET_HEIGHT})`);
        
        const isPng = /\.png$/i.test(imgPath);
        let transformer = sharp(inputBuffer).resize({
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          fit: 'inside',
          withoutEnlargement: true
        });

        if (isPng) {
          transformer = transformer.png({ quality: QUALITY, compressionLevel: 8 });
        } else {
          transformer = transformer.webp({ quality: QUALITY, effort: 4 });
        }

        const buffer = await transformer.toBuffer();
        fs.writeFileSync(imgPath, buffer);
        optimizedCount++;
      }
    } catch (err) {
      console.error(`Error processing ${imgPath}:`, err.message);
    }
  }

  console.log(`Optimization completed!`);
  console.log(`Total resized & optimized: ${optimizedCount}`);
  console.log(`Skipped icons/logos: ${skippedCount}`);
}

optimizeImages();
