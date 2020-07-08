const path = require('path');
const { start } = require('./invokeAndRecord');

const OUTPUT_PATH = path.join(__dirname, '../function.out');

start('https://us-central1-asserted-dev.cloudfunctions.net/subprocess', false, OUTPUT_PATH);
