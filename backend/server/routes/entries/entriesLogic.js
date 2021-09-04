const { writeJSON, readJSONSync } = require('../../data');
const debounce = require('../../util/debounce');

const FILENAME = 'entries';

function provideEntriesData() {
  let data = readJSONSync(FILENAME);
  if (!Array.isArray(data)) data = [];
  return data;
}

const queueStore = debounce(2000, () => {
  console.log('hi');
  return writeJSON(FILENAME, data);
});

let data = provideEntriesData();

const entries = {
  get data() {
    return data;
  },

  push(entry) {
    data.push(entry);
    console.log(data);
    queueStore();
  },
};
exports.entries = entries;
