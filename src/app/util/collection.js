function generateId(collection) {
  let highest = 0;
  collection.forEach((v, id) => {
    id = Number(id);
    if (id > highest) highest = id;
  });

  const availableId = highest + 1;
  return availableId;
}

function Collection(collectionData = {}) {
  let collection = {
    push,
    delete: del,
    forEach,
    find,
    map,
  };

  collection = {
    ...collection,
    ...collectionData,
  };

  // Reason for this way of defining collection:
  //   IDE Hinting for the statically defined properties.

  return collection;
}

function del(id) {
  id = Number(id);
  if (Number.isNaN(id)) {
    console.warn('Invalid ID');
    return;
  }

  delete this[id];
}

function push(value) {
  const id = generateId(this);
  this[id] = value;
}

function find(callback) {
  const { push, delete: del, forEach, find, map, ...list } = this;

  for (const id in list) {
    const result = callback(list[id], id);
    if (result) break;
  }
}

function forEach(callback) {
  this.find((...params) => {
    callback(...params);
  });
}

function map(callback) {
  const array = [];
  this.find((...params) => {
    array.push(callback(...params));
  });

  return array;
}

export default Collection;
