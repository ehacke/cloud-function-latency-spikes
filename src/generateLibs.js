const path = require('path');
const fs = require('fs');
const faker = require('faker');
const { times } = require('lodash');
const reserved = require('reserved-words');

const OUTPUT_PATH = path.join(__dirname, './loadTheLibs');

const MAX_FILES = 500;

let counter = 0;

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

const filenames = new Set();

const createFiles = () => {
  while (counter < MAX_FILES) {
    const words = times(100, faker.lorem.word);

    const content = words.reduce((_content, word) => {
      _content[word] = getRandomData();
      return _content;
    }, {});

    const filename = faker.lorem.word();

    if (reserved.check(filename)) {
      continue;
    }

    fs.writeFileSync(path.join(OUTPUT_PATH, `${filename}.js`), `module.exports = ${JSON.stringify(content, null, 2)}`);

    filenames.add(filename);

    counter++;
  }
};

createFiles();

let indexString = '';

[...filenames].map((filename) => {
  indexString += `const ${filename} = require('./${filename}.js');\n`;
});

indexString += `module.exports = { ${[...filenames].join(', ')} }`;

fs.writeFileSync(path.join(OUTPUT_PATH, 'index.js'), indexString);
