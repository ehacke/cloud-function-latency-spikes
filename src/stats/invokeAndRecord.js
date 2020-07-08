const fs = require('fs-extra');
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
 * @param {string} type
 * @param {string} outputPath
 * @param {number} timeoutMs
 * @returns {void}
 */
const start = async (url, type, outputPath, timeoutMs) => {
  outputPath += `-${type}.out`;

  if (fs.existsSync(outputPath)) {
    fs.removeSync(outputPath);
  }

  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      if (counter >= MAX_COUNT) {
        await fs.appendFile(outputPath, 'end\n', 'utf8');
        clearInterval(interval);
        console.log('Done');
        resolve();
      }

      if (counter === 0) {
        await fs.appendFile(outputPath, 'start\n', 'utf8');
      }

      const requestId = counter++;

      const { duration } = await got(`${url}?type=${type}`).json();
      console.log(`Request: ${requestId} duration: ${duration}`);
      await fs.appendFile(outputPath, `${duration}\n`, 'utf8');
    }, timeoutMs);
  });
};

module.exports = { start };
