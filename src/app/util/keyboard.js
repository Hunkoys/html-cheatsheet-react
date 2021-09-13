import Collection from './collection';

const keymapCollection = Collection();

function addKeymap(keymap) {
  const id = keymapCollection.push(keymap);
  return id;
}

function removeKeymap(id) {
  keymapCollection.delete(id);
}

const MODS = ['Control', 'Alt', 'Shift', 'Meta'];
const SHORTS = {
  Control: '+',
  Alt: '!',
  Shift: '^',
  Meta: '#',
};

function nameKey(key) {
  if (key === ' ') return 'Space';
  return key;
}

function handleKeyDown(e) {
  const { key, ctrlKey, altKey, shiftKey, metaKey } = e;

  const keyName = nameKey(key);

  let stroke = '';
  if (ctrlKey) stroke += SHORTS.Control;
  if (altKey) stroke += SHORTS.Alt;
  if (shiftKey) stroke += SHORTS.Shift;
  if (metaKey) stroke += SHORTS.Meta;

  if (!MODS.includes(keyName)) stroke += keyName;

  keymapCollection.forEach((keymap) => {
    if (keymap[stroke]) keymap[stroke](e);
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
