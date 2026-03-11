const https = require('https');

module.exports = (req, res) => {
  const page = req.query.page || '1';
  https.get({
    hostname: 'jobyyy.net', port: 443,
    path: `/api/messages/?page=${page}`,
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' }
  }, upstream => {
    res.setHeader('Content-Type', 'application/json');
    res.status(upstream.statusCode);
    upstream.pipe(res);
  }).on('error', err => res.status(502).json({ error: err.message }));
};
