const { execSync } = require('child_process');

exports.subprocess = (req, res) => {
  const start = Date.now();

  console.log('Before mocha');
  // eslint-disable-next-line no-process-env
  execSync('./node_modules/mocha/bin/mocha **/*.unit.js', { stdio: 'inherit', env: { PATH: process.env.PATH } });

  const duration = Date.now() - start;
  console.log(`Execution: ${duration} ms`);

  res.status(200).json({ duration });
};
