function generateId(collection) {
  let highest = 0;
  collection.order.forEach(({ id }) => {
    id = Number(id);
    if (id > highest) highest = id;
  });

  const availableId = highest + 1;
  return availableId;
}

function Collection(collectionData = {}) {
  const collection = {
    push,
    delete: del,
    forEach,
    find,
    map,
    get,
    set,
    order: collectionData.order ? [...collectionData.order] : [],
  };

  return collection;
}

const tw = Collection();

tw.push('hallo');
tw.push('iu');
tw.push('jackson');
tw.push('bts');

// tw.order; //?

function del(id) {
  id = Number(id);
  if (Number.isNaN(id)) {
    console.warn('Invalid ID');
    return;
  }

  const index = this.order.findIndex(({ id: itemId }) => Number(itemId) === Number(id));
  const match = index < 0 ? false : true;

  if (match) this.order.splice(index, 1);
}

function push(value) {
  const id = generateId(this);
  this.order.push({ id, value });
}

function find(callback) {
  const { order } = this;

  for (const item of order) {
    const result = callback(item.value, item.id);
    if (result) return item;
  }
}

function forEach(callback) {
  this.find((...params) => {
    callback(...params);
  });
}

function map(callback) {
  const collection = { order: [] };
  console.log(collection);
  this.find((value, id) => {
    collection.order.push({ id, value: callback(value, id) });
  });

  return Collection(collection);
}

function get(id) {
  id = Number(id);
  const match = this.find((value, itemId) => Number(itemId) === id);

  if (match) return match.value;
}

function set(id, value) {
  id = Number(id);
  const match = this.find((value, itemId) => Number(itemId) === id);

  if (match) match.value = value;
}

export default Collection;
