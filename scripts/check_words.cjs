const fs = require('fs');

const htmlFiles = [
  'dist/index.html',
  'dist/rooms/index.html',
  'dist/about/index.html',
  'dist/services/index.html',
  'dist/contact/index.html',
  'dist/book-now/index.html',
  'dist/room/budget-family-room/index.html',
  'dist/room/deluxe-room/index.html',
  'dist/room/family-room/index.html',
  'dist/gallery/index.html',
  'dist/blog/index.html',
  'dist/privacy/index.html',
  'dist/terms/index.html',
  'dist/guest-guide/index.html'
];

htmlFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const html = fs.readFileSync(f, 'utf8');
    // Strip scripts and styles
    const bodyOnly = (html.match(/<body[\s\S]*?<\/body>/i) || [html])[0]
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
    const text = bodyOnly.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    console.log(`${f.padEnd(42)} -> Total Body Words: ${words}`);
  } else {
    console.log(`${f.padEnd(42)} -> NOT FOUND`);
  }
});
