const fs = require('fs');
const path = require('path');

// Let's inspect dist generated files directly!
const distDir = path.resolve(__dirname, '..', 'dist');

function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = findHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files in dist/:\n`);

const results = [];

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  if (relPath.includes('google') || relPath.includes('report')) continue;
  
  const content = fs.readFileSync(file, 'utf8');

  // Title
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';

  // Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const desc = descMatch ? descMatch[1] : '';

  // Canonical
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1] : '';

  // OG tags
  const ogTitle = (content.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i) || [])[1];
  const ogDesc = (content.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i) || [])[1];
  const ogUrl = (content.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']*)["']/i) || [])[1];
  const ogImage = (content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i) || [])[1];

  // Twitter cards
  const twCard = (content.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']*)["']/i) || [])[1];
  const twTitle = (content.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']*)["']/i) || [])[1];
  const twDesc = (content.match(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']*)["']/i) || [])[1];

  // H1 count
  const h1Matches = content.match(/<h1[\s>][\s\S]*?<\/h1>/gi) || [];

  // Images without alt
  const imgMatches = content.match(/<img[^>]*>/gi) || [];
  const missingAlt = [];
  for (const img of imgMatches) {
    if (!/alt=["'][^"']*["']/i.test(img)) {
      missingAlt.push(img.substring(0, 100));
    }
  }

  // Schema.org scripts
  const schemaMatches = content.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  const schemaTypes = [];
  for (const s of schemaMatches) {
    const jsonStr = s.replace(/<script\b[^>]*>/i, '').replace(/<\/script>/i, '').trim();
    try {
      const parsed = JSON.parse(jsonStr);
      schemaTypes.push(parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown'));
    } catch (e) {
      schemaTypes.push(`Invalid JSON: ${e.message}`);
    }
  }

  results.push({
    file: relPath,
    title,
    desc,
    descLen: desc.length,
    canonical,
    h1Count: h1Matches.length,
    h1Text: h1Matches.map(h => h.replace(/<[^>]+>/g, '').trim()),
    missingAltCount: missingAlt.length,
    schemaCount: schemaMatches.length,
    schemaTypes,
    ogComplete: !!(ogTitle && ogDesc && ogUrl && ogImage),
    twComplete: !!(twCard && twTitle && twDesc)
  });
}

console.log(JSON.stringify(results, null, 2));

console.log('\n--- Checking src/ for images without descriptive alt ---');
function checkSrcImgs(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      checkSrcImgs(p);
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      const txt = fs.readFileSync(p, 'utf8');
      const imgRegex = /<img([\s\S]*?)>/gi;
      let m;
      while ((m = imgRegex.exec(txt)) !== null) {
        const tag = m[0];
        const rel = path.relative(path.resolve(__dirname, '..'), p);
        if (!/alt\s*=\s*["'{]/i.test(tag) || /alt\s*=\s*["']\s*["']/i.test(tag)) {
          console.log(`[ALT MISSING] ${rel}: ${tag.replace(/\s+/g, ' ').substring(0, 120)}`);
        }
      }
    }
  }
}
checkSrcImgs(path.resolve(__dirname, '..', 'src'));

