const fs = require('fs');
const path = require('path');

const langs = [
  'en',
  'ne',
  'hi',
  'es',
  'fra',
  'de',
  'it',
  'pt',
  'nl',
  'rs',
  'ch',
  'ja',
  'ko',
  'ar',
  'he'
];

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

console.log('--- Applying Full Multilingual Translations across all 15 Locales ---');

for (const lang of langs) {
  const modPath = path.resolve(__dirname, `translations/${lang}.cjs`);
  const jsonPath = path.resolve(__dirname, `../src/Locales/${lang}.json`);

  if (!fs.existsSync(modPath)) {
    console.error(`Error: Translation module missing: ${modPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: Target JSON missing: ${jsonPath}`);
    process.exit(1);
  }

  const translations = require(modPath);
  const jsonRaw = fs.readFileSync(jsonPath, 'utf-8');
  const jsonData = JSON.parse(jsonRaw);

  deepMerge(jsonData, translations);

  // If fra, also update fr if it exists or ensure fr alias works
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2) + '\n', 'utf-8');
  console.log(`✓ Updated src/Locales/${lang}.json with new sections (${Object.keys(translations).join(', ')})`);
}

console.log('\nAll 15 locale JSON files updated successfully!');

