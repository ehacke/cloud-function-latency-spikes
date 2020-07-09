const path = require('path');
const getenv = require('getenv');
const { start } = require('./invokeAndRecord');
require('dotenv').config();

(async () => {
  const OUTPUT_PATH = path.join(__dirname, '../function');

  await start(getenv('CLOUD_FUNCTION_URL'), 'load', OUTPUT_PATH, 4000);
  await start(getenv('CLOUD_FUNCTION_URL'), 'hog', OUTPUT_PATH, 2000);
  await start(getenv('CLOUD_FUNCTION_URL'), 'regenerate', OUTPUT_PATH, 6000);

  // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
  process.exit(0);
})();
