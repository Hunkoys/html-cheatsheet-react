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

// function newID() {
//   let largest = 0;
//   for (const { id } of data) {
//     if (id > largest) largest = id;
//   }
//   const id = largest + 1;
//   return id;
// }

let data = provideEntriesData();

const entries = {
  get data() {
    return data;
  },

  // push(entry) {
  //   const id = newID();
  //   entry.id = id;
  //   data.push(entry);
  //   queueStore();
  // },

  // edit(i, mod) {
  //   const entry = data[i];
  //   for (const part in entry) {
  //     if (mod[part]) entry[part] = mod[part];
  //   }

  //   queueStore();
  // },

  replace(newData) {
    data = newData;
    console.log(data);

    queueStore();
  },
};

exports.entries = entries;
