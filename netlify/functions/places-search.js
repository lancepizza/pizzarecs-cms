const https = require('https');

exports.handler = async (event) => {
  const { query, type } = event.queryStringParameters || {};
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!query) return { statusCode: 400, body: JSON.stringify({ error: 'Missing query' }) };

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=restaurant&key=${API_KEY}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
          body: data
        });
      });
    }).on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });
  });
};
