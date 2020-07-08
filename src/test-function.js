const fs = require('fs').promises;
const path = require('path');
const got = require('got');

console.log('Starting');

let counter = 0;
const MAX_COUNT = 60 * 10;
const OUTPUT_PATH = path.join(__dirname, '../function.out');

const interval = setInterval(async () => {
  if (counter >= MAX_COUNT) {
    await fs.appendFile(OUTPUT_PATH, 'end\n', 'utf8');
    clearInterval(interval);
    console.log('Done');
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  }

  if (counter === 0) {
    await fs.appendFile(OUTPUT_PATH, 'start\n', 'utf8');
  }

  const requestId = counter++;

  const { duration } = await got('https://us-central1-asserted-dev.cloudfunctions.net/subprocess').json();
  console.log(`Request: ${requestId} duration: ${duration}`);
  await fs.appendFile(OUTPUT_PATH, `${duration}\n`, 'utf8');
}, 1000);
