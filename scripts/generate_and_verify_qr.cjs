const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const sharp = require('sharp');
const jsQR = require('jsqr');

const TARGET_URL = 'https://hotelsherpasoul.com/guest-guide';
const OUTPUT_PNG = path.resolve(__dirname, '..', 'public', 'guest-guide-qr.png');
const OUTPUT_SVG = path.resolve(__dirname, '..', 'public', 'guest-guide-qr.svg');

async function run() {
  console.log('📌 Target URL to encode:', TARGET_URL);

  // 1. Generate High-Resolution PNG (1024px width, error correction H, margin 4)
  console.log('⏳ Generating PNG...');
  await QRCode.toFile(OUTPUT_PNG, TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1024,
    margin: 4,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
  console.log('✓ Saved PNG to:', OUTPUT_PNG);

  // 2. Generate Vector SVG
  console.log('⏳ Generating SVG...');
  const svgString = await QRCode.toString(TARGET_URL, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 4,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
  fs.writeFileSync(OUTPUT_SVG, svgString, 'utf-8');
  console.log('✓ Saved SVG to:', OUTPUT_SVG);

  // 3. Scan & Decode Test the PNG using sharp + jsQR
  console.log('🔍 Scan-testing generated PNG with jsQR decoder...');
  const { data, info } = await sharp(OUTPUT_PNG)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const clampedData = new Uint8ClampedArray(data);
  const code = jsQR(clampedData, info.width, info.height);

  if (!code) {
    console.error('❌ Failed to decode QR code!');
    process.exit(1);
  }

  console.log('🎯 Decoded content:', code.data);

  if (code.data === TARGET_URL) {
    console.log('🎉 SUCCESS: Decoded URL exactly matches the target canonical URL!');
    console.log('Details:');
    console.log('  - Target URL:  ', TARGET_URL);
    console.log('  - Decoded Data:', code.data);
    console.log('  - Symbol size: ', `${info.width}x${info.height}px`);
    console.log('  - Error correction: H (30% recovery capacity)');
    console.log('  - Contains NO private credentials or sensitive metadata.');
  } else {
    console.error(`❌ Mismatch! Expected "${TARGET_URL}" but found "${code.data}"`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Fatal error during QR generation/verification:', err);
  process.exit(1);
});
