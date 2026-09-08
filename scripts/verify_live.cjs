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
      console.log('Has CMS Provider/Context:', js.includes("HSS_CMS_DATA_V1"));
      console.log('Has CMS route /cms:', js.includes("/cms"));
    }
  } catch (e) {
    console.error(e);
  }
}

verify();
