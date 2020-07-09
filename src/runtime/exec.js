const { execSync } = require('child_process');

/**
 * Run inside of a subprocess
 *
 * @param {string} type
 * @returns {number}
 */
const exec = (type) => {
  let cmdString;

  switch (type) {
    case 'regenerate': {
      cmdString = 'echo "Start"; node src/lib/generateAndLoad.js; echo "End";';
      break;
    }
    case 'hog': {
      cmdString = 'echo "Start"; ./node_modules/nodehog/bin.js cpu 1000 1 1; echo "End";';
      break;
    }
    case 'load':
    default: {
      cmdString = 'echo "Start"; node src/lib/load.js; echo "End";';
      break;
    }
  }

  const start = Date.now();

  console.log(`Running command: ${cmdString}`);
  // eslint-disable-next-line no-process-env
  execSync(cmdString, { stdio: 'inherit', env: { PATH: process.env.PATH } });
  const duration = Date.now() - start;
  console.log(`Execution: ${duration} ms`);

  return duration;
};

module.exports = { exec };
