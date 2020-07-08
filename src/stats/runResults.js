const path = require('path');
const { start } = require('./invokeAndRecord');

const OUTPUT_PATH = path.join(__dirname, '../function.out');

start('https://subprocess-qab4oyrtea-uc.a.run.app/subprocess', false, OUTPUT_PATH);
