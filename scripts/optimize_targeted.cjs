const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeImages() {
  console.log('Optimizing facilities images...');
  
  // 1. shared_kitchen_new.webp (was 126 KB)
  const kitchenPath = path.resolve('src/assets/shared_kitchen_new.webp');
  const kitchenInput = fs.readFileSync(kitchenPath);
  const kitchenBuf = await sharp(kitchenInput)
    .resize(600, null, { withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  fs.writeFileSync(kitchenPath, kitchenBuf);
  console.log('Optimized kitchenPhoto:', kitchenBuf.length, 'bytes');

  // 2. frontdesk_new.webp (was 170 KB)
  const frontDeskPath = path.resolve('src/assets/frontdesk_new.webp');
  const frontDeskInput = fs.readFileSync(frontDeskPath);
  const frontDeskBuf = await sharp(frontDeskInput)
    .resize(600, null, { withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  fs.writeFileSync(frontDeskPath, frontDeskBuf);
  console.log('Optimized frontDeskPhoto:', frontDeskBuf.length, 'bytes');

  // 3. hero_deluxe_room.webp (desktop hero, was 87.3 KB -> under 75 KB)
  const heroDeskPath = path.resolve('public/hero/hero_deluxe_room.webp');
  const heroDeskInput = fs.readFileSync(heroDeskPath);
  const heroDeskBuf = await sharp(heroDeskInput)
    .resize(1024, null, { withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  fs.writeFileSync(heroDeskPath, heroDeskBuf);
  console.log('Optimized hero desktop:', heroDeskBuf.length, 'bytes');

  // 4. hero_deluxe_room-mobile.webp (mobile hero, was 43.9 KB -> ensure < 45 KB)
  const heroMobPath = path.resolve('public/hero/hero_deluxe_room-mobile.webp');
  const heroMobInput = fs.readFileSync(heroMobPath);
  const heroMobBuf = await sharp(heroMobInput)
    .resize(768, null, { withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();
  fs.writeFileSync(heroMobPath, heroMobBuf);
  console.log('Optimized hero mobile:', heroMobBuf.length, 'bytes');
}

optimizeImages().catch(err => {
  console.error(err);
  process.exit(1);
});
