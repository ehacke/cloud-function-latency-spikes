const path = require('path');
const getenv = require('getenv');
const { start } = require('./invokeAndRecord');
require('dotenv').config();

(async () => {
  const OUTPUT_PATH = path.join(__dirname, '../results/run');

  await start(getenv('CLOUD_RUN_URL'), 'load', OUTPUT_PATH, 1000);
  await start(getenv('CLOUD_RUN_URL'), 'hog', OUTPUT_PATH, 2000);
  await start(getenv('CLOUD_RUN_URL'), 'regenerate', OUTPUT_PATH, 6000);
  console.log('Done all for run');
})();
