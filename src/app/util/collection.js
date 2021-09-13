function generateId(collection) {
  let highest = 0;
  collection.order.forEach(({ id }) => {
    id = Number(id);
    if (id > highest) highest = id;
  });

  const availableId = highest + 1;
  return availableId;
}

function proximOf(id, offset) {
  const { order } = this;
  const subjectIndex = order.findIndex(({ id: itemId }) => {
    if (Number(itemId) === Number(id)) return true;
  });

  const match = subjectIndex < 0 ? false : true;
  const index = match ? subjectIndex + offset : -1;

  return order[index];
}

function Collection(collectionData = {}) {
  const collection = {
    push,
    insert(id, ...values) {
      const location = this.indexOfId(id);

      if (location) {
        const index = location - 1;
        values.reverse();

        for (const value of values) {
          const id = generateId(this);
          this.order.splice(index, 0, { id, value });
        }
      }
    },
    delete: del,
    forEach,
    find,
    map,
    filter,
    get,
    set,
    at(spot) {
      return this.order[spot];
    },
    indexOfId(id) {
      const match = this.find((value, itemId) => {
        return Number(id) === itemId;
      });

      if (match) return match.id;
    },
    nextOf(id) {
      return proximOf.call(this, id, 1);
    },
    previousOf(id) {
      return proximOf.call(this, id, -1);
    },
    nextIdOf(id) {
      const next = this.nextOf(id);
      return next && next.id;
    },
    previousIdOf(id) {
      const prev = this.previousOf(id);
      return prev && prev.id;
    },
    log,
    get length() {
      let count = 0;
      this.forEach(() => {
        count++;
      });

      return count;
    },
    order: collectionData.order ? [...collectionData.order] : [],
  };

  return collection;
}

// const tw = Collection();

// tw.push('hallo');
// tw.push('iu');
// tw.push('jackson');
// tw.push('bts');

// tw.delete(3);

// tw.log(); //?

// tw.insert(2, 'tanglo');

// tw.nextOf(2); //?

// tw.previousOf(4); //?

// tw.nextIdOf(1); //?

// tw.previousIdOf(4); //?

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
  return id;
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
  this.find((value, id) => {
    collection.order.push({ id, value: callback(value, id) });
  });

  return Collection(collection);
}

function filter(callback) {
  const collection = { order: [] };
  this.find((value, id) => {
    if (callback(value, id)) collection.order.push({ id, value });
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

function log() {
  const array = {};
  this.forEach((value, id) => {
    array[id] = value;
  });

  console.log(array);
}

export default Collection;
