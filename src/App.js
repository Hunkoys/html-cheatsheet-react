import { useState } from 'react';
import './App.css';
import network from './app/util/network';

function newEntryClickHandler(e) {
  network.post('/entry', { text: 'Bwisi' }).then((yo) => console.log(yo));
}

function App() {
  const [entries, setEntries] = useState();

  return (
    <main>
      <header>HTML Cheat Sheet</header>
      <section id="content">
        <ul id="entries">{entries}</ul>
      </section>
      <button onClick={newEntryClickHandler}>New Entry</button>
    </main>
  );
}

export default App;
