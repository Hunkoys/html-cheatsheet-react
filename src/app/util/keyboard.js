import Collection from './collection';

const keymapCollection = Collection();

function addKeymap(keymap) {
  const id = keymapCollection.push(keymap);
  return id;
}

function removeKeymap(id) {
  keymapCollection.delete(id);
}

function handleKeyDown(e) {
  const { key } = e;

  keymapCollection.forEach((keymap) => {
    if (keymap[key]) keymap[key](e);
  });
}

window.addEventListener('keydown', handleKeyDown);

export { addKeymap, removeKeymap };

// // add
// const k1 = {
//   'Enter': () => console.log('helo there'),
//   'ArrowUp': () => console.log('up up up'),
//   }

// const a = addKeymap(k1);
// // trigger
// // removeKeymap(a);

// handleKeyDown({ key: 'ArrowUp' });
