import Collection from '../util/collection';
import network from '../util/network';

function Categories(collection) {
  const categories = Collection(collection);

  return categories;
}

function Cases(collection) {
  const cases = Collection(collection);

  cases.forEach((_case) => {
    const CATEGORIES = 'categories';

    _case[CATEGORIES] = Categories(_case[CATEGORIES]);
  });

  return cases;
}

function Details(collection) {
  const details = Collection(collection);

  return details;
}

function Entries(collection) {
  const entries = Collection(collection);

  entries.forEach((entry) => {
    const CASES = 'cases';
    const DETAILS = 'details';

    entry[CASES] = Cases(entry[CASES]);
    entry[DETAILS] = Details(entry[DETAILS]);
  });

  return entries;
}

const ENTRIES_PATH = '/entries';

function getEntries() {
  return network.get(ENTRIES_PATH).then((entries) => {
    return Entries(entries);
  });
}

export default getEntries;
export { Entries, Cases, Categories, Details };
