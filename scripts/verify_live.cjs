const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function verify() {
  try {
    const html = await get('https://hotel-sherpa-soul.vercel.app/index.html');
    const match = html.match(/src="([^"]+\.js)"/);
    console.log('Script tag found:', match ? match[1] : 'None');
    if (match) {
      const jsUrl = 'https://hotel-sherpa-soul.vercel.app' + match[1];
      const js = await get(jsUrl);
      console.log('Bundle length:', js.length);
      console.log('Has vision para2 content:', js.includes("Hotel Sherpa Soul is built around a simple understanding"));
      console.log('Has vision para3 content:', js.includes("What we offer is simpler and more meaningful"));
      console.log('Has Staff PMS button:', js.includes("Staff PMS"));
    }
  } catch (e) {
    console.error(e);
  }
}

verify();
