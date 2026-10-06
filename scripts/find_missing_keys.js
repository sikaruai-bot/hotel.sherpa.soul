import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, '../src/Locales');

const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

function getKeys(obj, prefix = '') {
  let keys = {};
  for (const k in obj) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(keys, getKeys(obj[k], p));
    } else {
      keys[p] = obj[k];
    }
  }
  return keys;
}

const enKeys = getKeys(en);
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

files.forEach(file => {
  const data = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
  const fileKeys = getKeys(data);
  const missing = [];
  for (const k in enKeys) {
    if (!(k in fileKeys) || fileKeys[k] === enKeys[k]) {
      missing.push(k);
    }
  }
  console.log(`${file}: ${missing.length} missing/untranslated keys out of ${Object.keys(enKeys).length}`);
});
