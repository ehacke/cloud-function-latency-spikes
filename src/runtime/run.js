const http = require('http');
const url = require('url');
const { exec } = require('./exec');

// eslint-disable-next-line no-process-env
const PORT = process.env.PORT || 3000;

/**
 * Create server for Cloud Run service
 *
 * @type {Server}
 */
const app = http.createServer((req, res) => {
  const { query = {} } = url.parse(req.url, true) || {};

  const duration = exec(query.generate || false);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ duration }));
});

app.listen(PORT);
