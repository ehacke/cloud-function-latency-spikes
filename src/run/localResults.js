const path = require('path');
const { start } = require('./invokeAndRecord');

(async () => {
  const OUTPUT_PATH = path.join(__dirname, '../results/local');

  await start('http://localhost:3000', 'load', OUTPUT_PATH, 3000);
  await start('http://localhost:3000', 'hog', OUTPUT_PATH, 2000);
  await start('http://localhost:3000', 'regenerate', OUTPUT_PATH, 6000);
  console.log('Done all for local');
})();
