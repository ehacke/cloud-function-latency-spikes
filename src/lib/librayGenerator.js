const path = require('path');
const faker = require('faker');
const { times } = require('lodash');
const reserved = require('reserved-words');
const fs = require('fs-extra');

const MAX_FILES = 500;
let counter = 0;

/**
 * There is no real importance to the properties selected here.
 * Just needs to be a bunch of random data.
 */
const getRandomData = () => ({
  title: faker.name.title(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  color: faker.internet.color(),
  password: faker.internet.password(),
  state: faker.address.state(),
  country: faker.address.country(),
});

const createFakeLibraries = (outputPath) => {
  if (fs.pathExistsSync(outputPath)) {
    fs.removeSync(outputPath);
  }

  fs.ensureDirSync(outputPath);

  const filenames = new Set();

  while (counter < MAX_FILES) {
    // Properties for the exportable object
    const properties = times(100, faker.lorem.word);

    // Creat a giant object to export
    const content = properties.reduce((_content, prop) => {
      _content[prop] = getRandomData();
      return _content;
    }, {});

    const filename = faker.lorem.word();

    // Make sure we don't accidentally create a reserved name
    if (reserved.check(filename)) {
      continue;
    }

    fs.writeFileSync(path.join(outputPath, `${filename}.js`), `module.exports = ${JSON.stringify(content, null, 2)}`);
    filenames.add(filename);

    counter++;
  }

  let indexContent = '';

  // eslint-disable-next-line no-return-assign
  [...filenames].forEach((filename) => (indexContent += `const ${filename} = require('./${filename}.js');\n`));

  indexContent += `module.exports = { ${[...filenames].join(', ')} }`;
  fs.writeFileSync(path.join(outputPath, 'index.js'), indexContent);
};

module.exports = {
  createFakeLibraries,
};
