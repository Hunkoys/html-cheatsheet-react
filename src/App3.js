import { useEffect, useState } from 'react';
import './App.scss';
import Content from './app/components/Content';
import createEntry from './app/data/createEntry';
import debounce from './app/util/debounce';
import network from './app/util/network';

const STATUS = {
  syncing: 'Syncing',
  synced: 'Synced',
};

const queueSave = debounce(1000, (entries, callback) => {
  network.put(`/entries/result`, entries).then((entries) => {
    callback(entries);
  });
});

function App(props) {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    setStatus(STATUS.syncing);

    network.get('/entries').then((entries) => {
      setEntries(entries);
      setStatus(STATUS.synced);
    });
  }, []);

  function entryChangedHandler(id, part, value) {
    entries.find(({ id: itId }) => itId === id)[part] = value;

    setEntries(entries);
    setStatus(STATUS.syncing);

    queueSave(entries, (entries) => {
      setEntries(entries);
      setStatus(STATUS.synced);
    });
  }

  function newEntryClickHandler(e) {
    const entry = createEntry();
    setStatus(STATUS.syncing);

    network.post('/entry/result', entry).then((entries) => {
      setEntries(entries);
      setStatus(STATUS.synced);
    });
  }

  return (
    <main className="App">
      <header>HTML Cheat Sheet</header>
      <Content className="Content" onChange={entryChangedHandler}>
        {entries}
      </Content>
      <button onClick={newEntryClickHandler}>New Entry</button>
      <div className="status">{status}</div>
    </main>
  );
}

export default App;
