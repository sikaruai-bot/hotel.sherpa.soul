const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/Locales/en.json'), 'utf8'));

const langs = ['ne', 'hi', 'es', 'fra', 'de', 'it', 'pt', 'nl', 'rs', 'ch', 'ja', 'ko', 'ar', 'he'];

function countLeaves(obj) {
  let count = 0;
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      count += countLeaves(obj[k]);
    } else {
      count++;
    }
  }
  return count;
}

const totalEnLeaves = countLeaves(en);
console.log(`Total leaf keys in en.json: ${totalEnLeaves}`);

langs.forEach(lang => {
  const filePath = path.join(__dirname, `../src/Locales/${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`[${lang}] MISSING FILE`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  let missing = [];
  let untranslated = []; // identical to English
  
  function compare(eObj, lObj, prefix = '') {
    for (const k of Object.keys(eObj)) {
      const fullKey = prefix ? `${prefix}.${k}` : k;
      if (lObj === undefined || lObj[k] === undefined) {
        missing.push(fullKey);
      } else if (typeof eObj[k] === 'object' && eObj[k] !== null && !Array.isArray(eObj[k])) {
        compare(eObj[k], lObj[k], fullKey);
      } else if (typeof eObj[k] === 'string' && typeof lObj[k] === 'string') {
        const valE = eObj[k].trim();
        const valL = lObj[k].trim();
        // Skip purely numeric/symbol strings or very short
        if (valE.length > 3 && /[a-zA-Z]/.test(valE)) {
          if (valE === valL) {
            untranslated.push(fullKey);
          }
        }
      }
    }
  }

  compare(en, data);
  const sectionCounts = {};
  untranslated.forEach(fullKey => {
    const section = fullKey.split('.')[0];
    sectionCounts[section] = (sectionCounts[section] || 0) + 1;
  });
  console.log(`[${lang}] Untranslated breakdown by section:`, sectionCounts);
});
