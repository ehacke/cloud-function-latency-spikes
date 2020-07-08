const fs = require('fs').promises;
const path = require('path');
const got = require('got');

console.log('Starting');

let counter = 0;
const MAX_COUNT = 60 * 20;
const OUTPUT_PATH = path.join(__dirname, '../run.out');

const interval = setInterval(async () => {
  if (counter >= MAX_COUNT) {
    await fs.writeFile(OUTPUT_PATH, 'end\n', 'utf8');
    clearInterval(interval);
    console.log('Done');
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  }

  if (counter === 0) {
    await fs.writeFile(OUTPUT_PATH, 'start\n', 'utf8');
  }

  const requestId = counter++;

  const { duration } = await got('https://subprocess-qab4oyrtea-uc.a.run.app/subprocess').json();
  console.log(`Request: ${requestId} duration: ${duration}`);
  await fs.writeFile(OUTPUT_PATH, `${duration}\n`, 'utf8');
}, 1200);
