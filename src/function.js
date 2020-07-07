const path = require('path');
const { execSync } = require('child_process');

exports.subprocess = (req, res) => {
  const start = Date.now();

  execSync(`node ${path.join(__dirname, './block.js')}`);

  const duration = Date.now() - start;
  console.log(`Execution: ${duration} ms`);

  res.status(200).json({ duration });
};
