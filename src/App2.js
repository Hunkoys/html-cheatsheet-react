import { useEffect, useState } from 'react';
import Entries from './app/comps/Entries';
import getEntries from './app/data/entries';
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

const App2 = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const [entries, setEntries] = useState({});
  const [status, setStatus] = useState(STATUS.syncing);

  useEffect(async () => {
    setStatus(STATUS.syncing);

    const entries = await getEntries();

    setEntries(entries);
    setStatus(STATUS.synced);
  }, []);

  return (
    <main className={'App2' + className}>
      <header className="header">
        <h1 className="title">HTML Cheat Sheet</h1>
      </header>
      <Entries>{entries}</Entries>
      <div className="status">{status}</div>
    </main>
  );
};

export default App2;
