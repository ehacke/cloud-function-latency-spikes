const { execSync } = require('child_process');

exports.subprocess = (req, res) => {
  const start = Date.now();

  console.log('Before mocha');
  // eslint-disable-next-line no-process-env
  execSync('./node_modules/nodehog/bin.js cpu 500 1 1', { stdio: 'inherit', env: { PATH: process.env.PATH } });

  const duration = Date.now() - start;
  console.log(`Execution: ${duration} ms`);

  res.status(200).json({ duration });
};
