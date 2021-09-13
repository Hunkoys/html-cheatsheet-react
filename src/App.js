import { useEffect, useState } from 'react';
import Entries from './app/components/entries/Entries';
import { createEntry } from './app/data/creator';
import { getEntries, saveEntries } from './app/data/entries';
import debounce from './app/util/debounce';
import network from './app/util/network';
import './App.scss';
import Select from './app/components/foundation/button/Select';
import Search from './app/components/search/Search';
import Collection from './app/util/collection';
import { addKeymap, removeKeymap } from './app/util/keyboard';

const STATUS = {
  syncing: 'Syncing',
  synced: 'Synced',
  failed: '<!> Sync Failed',
};

const keymap = {
  Enter: () => console.log('I entered, tha`s right'),
  ArrowUp: () => console.log('yes sir'),
};

function onKey(key, task) {
  keymap[key] = task;
}

const saveDebounce = debounce(1000, (entries, callback) => {
  saveEntries(entries).then((result) => {
    callback(result);
  });
});

const App2 = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const [entries, setEntries] = useState(Collection());
  const [status, setStatus] = useState(STATUS.syncing);
  const [searchOpen, setSearchOpen] = useState(true);

  useEffect(() => {
    setStatus(STATUS.syncing);

    (async () => {
      const entries = await getEntries();

      setEntries(entries);
      setStatus(STATUS.synced);
    })();
  }, []);

  useEffect(() => {
    const keyboard = addKeymap(keymap);

    return () => {
      removeKeymap(keyboard);
    };
  }, []);

  useEffect(() => {
    onKey('+/', (e) => {
      e.preventDefault();
      setSearchOpen(!searchOpen);
    });
  }, [searchOpen]);

  function updateEntries() {
    setEntries({ ...entries });
  }

  function queueSave() {
    setStatus(STATUS.syncing);

    saveDebounce(entries, (result) => {
      if (result === true) setStatus(STATUS.synced);
      else setStatus(STATUS.failed);
    });
  }

  function entryOnChangeHandler(id, part, value) {
    entries.get(id)[part] = value;
    updateEntries();

    queueSave();
  }

  function deleteHandler(id) {
    entries.delete(id);
    updateEntries();

    queueSave();
  }

  function newEntryClickHandler() {
    entries.push(createEntry());
    updateEntries();

    queueSave();
  }

  return (
    <main className={'App' + className}>
      <header className="header">
        <h1 className="title">HTML Cheat Sheet</h1>
      </header>
      <Entries onChange={entryOnChangeHandler} onDelete={deleteHandler}>
        {entries}
      </Entries>
      <button className="button new-entry-btn" onClick={newEntryClickHandler}>
        New Entry
      </button>
      <div className="status">{status}</div>
      {searchOpen && <Search scope={entries} />}
    </main>
  );
};

export default App2;
