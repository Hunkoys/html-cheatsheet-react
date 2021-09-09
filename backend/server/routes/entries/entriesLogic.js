const { writeJSON, readJSONSync } = require('../../data');
const debounce = require('../../util/debounce');

const FILENAME = 'entries';

function provideEntriesData() {
  let data = readJSONSync(FILENAME);
  if (typeof data !== 'object') {
    data = {};
  }
  return data;
}

const queueStore = debounce(2000, () => {
  return writeJSON(FILENAME, data);
});

let data = provideEntriesData();

const entries = {
  get data() {
    return data;
  },

  push(entry) {
    const { id, ...value } = entry;
    data[id] = value;

    return queueStore();
  },

  edit(id, value) {
    data[id] = value;

    return queueStore();
  },

  replace(newData) {
    data = newData;
    console.log(data);

    return queueStore();
  },
};

exports.entries = entries;
