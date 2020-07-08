const fs = require('fs').promises;
const got = require('got');

console.log('Starting');

let counter = 0;
const MAX_COUNT = 60 * 20;

/**
 * This will:
 *  - invoke the provided URL
 *  - record results to file
 *  - exit once done
 *
 *
 * @param {string} url
 * @param {boolean} generate
 * @param {string} outputPath
 * @returns {void}
 */
const start = (url, generate, outputPath) => {
  const interval = setInterval(async () => {
    if (counter >= MAX_COUNT) {
      await fs.appendFile(outputPath, 'end\n', 'utf8');
      clearInterval(interval);
      console.log('Done');
      // eslint-disable-next-line no-process-exit,unicorn/no-process-exit
      process.exit(0);
    }

    if (counter === 0) {
      await fs.appendFile(outputPath, 'start\n', 'utf8');
    }

    const requestId = counter++;

    const { duration } = await got(`${url}?generate=${generate}`).json();
    console.log(`Request: ${requestId} duration: ${duration}`);
    await fs.appendFile(outputPath, `${duration}\n`, 'utf8');
  }, 2000);
};

module.exports = { start };
