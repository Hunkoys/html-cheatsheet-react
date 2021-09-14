import { useEffect, useState } from 'react';
import Entries from './app/components/entries/Entries';
import { createEntry } from './app/data/creator';
import { getEntries, saveEntries } from './app/data/entries';
import debounce from './app/util/debounce';
import './App.scss';
import Search from './app/components/search/Search';
import Collection from './app/util/collection';
import { addKeymap, removeKeymap } from './app/util/keyboard';

const STATUS = {
  syncing: 'Syncing',
  synced: 'Synced',
  failed: '<!> Sync Failed',
};

const keymap = {};

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
  const [searchOpen, setSearchOpen] = useState(false);

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
    onKey('+Space', (e) => {
      e.preventDefault();
      setSearchOpen(!searchOpen);
    });

    onKey('Escape', (e) => {
      e.preventDefault();
      setSearchOpen(false);
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

  function insertHandler(id) {
    entries.insert(id, createEntry());
    updateEntries();

    queueSave();
  }

  return (
    <main className={'App' + className}>
      <header className="header">
        <h1 className="title">HTML Cheat Sheet</h1>
      </header>
      <Entries onChange={entryOnChangeHandler} onDelete={deleteHandler} onInsert={insertHandler}>
        {entries}
      </Entries>
      <button className="button new-entry-btn" onClick={newEntryClickHandler}>
        New Entry
      </button>
      <div className="status">{status}</div>
      {searchOpen && <Search scope={entries} onClose={() => setSearchOpen(false)} />}
    </main>
  );
};

export default App2;
