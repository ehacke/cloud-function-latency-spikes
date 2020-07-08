const path = require('path');
const { start } = require('./invokeAndRecord');

(async () => {
  const OUTPUT_PATH = path.join(__dirname, '../local');

  await start('http://localhost:3000', 'load', OUTPUT_PATH, 1000);
  await start('http://localhost:3000', 'hog', OUTPUT_PATH, 1500);
  await start('http://localhost:3000', 'regenerate', OUTPUT_PATH, 5000);

  // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
  process.exit(0);
})();
