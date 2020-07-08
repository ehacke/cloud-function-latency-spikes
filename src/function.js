const { execSync } = require('child_process');

exports.subprocess = (req, res) => {
  const start = Date.now();

  console.log('Before mocha');
  // eslint-disable-next-line no-process-env
  execSync('sleep 0.5', { stdio: 'inherit', env: { PATH: process.env.PATH, DEBUG: 'mocha*' } });

  const duration = Date.now() - start;
  console.log(`Execution: ${duration} ms`);

  res.status(200).json({ duration });
};
