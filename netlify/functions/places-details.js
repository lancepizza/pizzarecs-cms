const https = require('https');

exports.handler = async (event) => {
  const { place_id } = event.queryStringParameters || {};
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!place_id) return { statusCode: 400, body: JSON.stringify({ error: 'Missing place_id' }) };

  const fields = 'name,formatted_address,website,opening_hours,formatted_phone_number,url';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${API_KEY}`;

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
