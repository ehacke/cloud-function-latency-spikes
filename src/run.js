const http = require('http');
const path = require('path');
const { execSync } = require('child_process');

// eslint-disable-next-line no-process-env
const PORT = process.env.PORT || 3000;

const app = http.createServer((req, res) => {
  const start = Date.now();

  execSync(`node ${path.join(__dirname, './block.js')}`);

  const duration = Date.now() - start;
  console.log(`Execution: ${duration} ms`);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ duration }));
});
app.listen(PORT);
