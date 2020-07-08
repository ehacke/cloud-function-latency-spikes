const { execSync } = require('child_process');

const exec = (generate) => {
  // The echo commands before and after the node command just provide timestamps in GCP Logging
  const cmdString = `echo "Start"; node ${generate ? 'src/lib/generateAndLoad.js' : 'src/lib/load.js'}; echo "End";`;

  const start = Date.now();

  console.log('Running command...');
  // eslint-disable-next-line no-process-env
  execSync(cmdString, { stdio: 'inherit', env: { PATH: process.env.PATH } });
  const duration = Date.now() - start;
  console.log(`Execution: ${duration} ms`);

  return duration;
};

module.exports = { exec };
