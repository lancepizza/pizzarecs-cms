const https = require('https');

exports.handler = async (event) => {
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  // Check 1: is the env var set?
  if (!API_KEY) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'GOOGLE_PLACES_API_KEY environment variable is not set' })
    };
  }

  // Check 2: make a minimal Places API call
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Pizzeria+Bianco+Los+Angeles&key=${API_KEY}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed;
        try { parsed = JSON.parse(data); } catch(e) { parsed = { raw: data }; }
        resolve({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({
            key_present: true,
            key_prefix: API_KEY.substring(0, 10) + '...',
            api_status: parsed.status,
            result_count: parsed.results ? parsed.results.length : 0,
            error_message: parsed.error_message || null,
            first_result: parsed.results && parsed.results[0] ? parsed.results[0].name : null
          })
        });
      });
    }).on('error', (e) => {
      resolve({
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ network_error: e.message })
      });
    });
  });
};
