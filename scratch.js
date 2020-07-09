const { execSync } = require('child_process');

console.log('Starting exec...');
execSync(`node userFile.js`, { timeout: 2000 });
console.log('Done exec');

const thing = require('foo-dependency');
const anotherThing = require('bar-dependency');

console.log('Starting user code');
