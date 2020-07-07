const path = require('path');
const { execSync } = require('child_process');

execSync(`node ${path.join(__dirname, './src/block.js')}`);
