const { promisify } = require('util');

const sleep = promisify(setTimeout);
(async () => sleep(2000))();
