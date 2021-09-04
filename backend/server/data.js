const path = require('path');
const fs = require('fs');

const dataPath = path.resolve(__dirname, './data-store');

function readFile(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(dataPath, name), (err, raw) => {
      if (err) reject(err);
      resolve(raw);
    });
  });
}

function readJSON(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(dataPath, `${name}.json`), { encoding: 'utf8' }, (err, raw) => {
      console.log(raw);
      if (err) reject(err);
      resolve(JSON.parse(raw));
    });
  });
}

function writeJSON(name, data) {
  const string = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(dataPath, `${name}.json`), string, (err) => {
      if (err) reject(err);
      resolve(string);
    });
  });
}

function readJSONSync(name) {
  return JSON.parse(fs.readFileSync(path.join(dataPath, `${name}.json`), { encoding: 'utf8' }));
}

function writeJSONSync(name, data) {
  fs.writeFileSync(path.join(dataPath, `${name}.json`), JSON.stringify(data));
}

module.exports = {
  readFile,
  readJSON,
  readJSONSync,
  writeJSON,
  writeJSONSync,
};
