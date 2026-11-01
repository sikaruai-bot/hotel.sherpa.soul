const fs = require('fs');
const path = require('path');

const localesMapping = {
  en: { module: './locales/en.cjs', file: '../src/Locales/en.json' },
  ne: { module: './locales/ne.cjs', file: '../src/Locales/ne.json' },
  hi: { module: './locales/hi.cjs', file: '../src/Locales/hi.json' },
  es: { module: './locales/es.cjs', file: '../src/Locales/es.json' },
  fra: { module: './locales/fra.cjs', file: '../src/Locales/fra.json' },
  de: { module: './locales/de.cjs', file: '../src/Locales/de.json' },
  it: { module: './locales/it.cjs', file: '../src/Locales/it.json' },
  pt: { module: './locales/pt.cjs', file: '../src/Locales/pt.json' },
  nl: { module: './locales/nl.cjs', file: '../src/Locales/nl.json' },
  rs: { module: './locales/rs.cjs', file: '../src/Locales/rs.json' },
  ch: { module: './locales/ch.cjs', file: '../src/Locales/ch.json' },
  ja: { module: './locales/ja.cjs', file: '../src/Locales/ja.json' },
  ko: { module: './locales/ko.cjs', file: '../src/Locales/ko.json' },
  ar: { module: './locales/ar.cjs', file: '../src/Locales/ar.json' },
  he: { module: './locales/he.cjs', file: '../src/Locales/he.json' },
};

console.log('Updating all 15 locale JSON files with guestGuide translations...');

for (const [lang, info] of Object.entries(localesMapping)) {
  const modPath = path.resolve(__dirname, info.module);
  const jsonPath = path.resolve(__dirname, info.file);

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

  jsonData.guestGuide = translations;

  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2) + '\n', 'utf-8');
  console.log(`✓ Updated ${info.file} (${lang}) with ${Object.keys(translations).length} guestGuide keys`);
}

console.log('All 15 locales successfully updated!');
