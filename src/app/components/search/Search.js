import { useEffect, useState } from 'react';
import Collection from '../../util/collection';
import { addKeymap, removeKeymap } from '../../util/keyboard';
import Select from '../foundation/button/Select';
import './Search.scss';

const keymap = {};

function onKey(key, task) {
  keymap[key] = task;
}

const Result = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { href = '#' } = props;

  return (
    <a href={href} className={'Result' + className}>
      {children}
    </a>
  );
};

// Search ////////////////

const Search = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { scope = Collection() } = props;

  const [value, setValue] = useState('');
  const [selected, setSelected] = useState();

  const matches = scope.filter(({ title }) => {
    const regex = new RegExp(value, 'i');
    return title.match(regex);
  });

  useEffect(() => {
    const keyboard = addKeymap(keymap);

    return () => {
      removeKeymap(keyboard);
    };
  }, []);

  useEffect(() => {
    function selectUp(e) {
      e.preventDefault();
      const end = matches.length - 1;
      const last = matches.at(end) && matches.at(end).id;
      const prev = matches.previousIdOf(selected) || last;
      if (prev) setSelected(prev);
    }

    function selectDown(e) {
      e.preventDefault();
      const first = matches.at(0) && matches.at(0).id;
      const next = matches.nextIdOf(selected) || first;
      if (next) setSelected(next);
    }

    function all(e) {}

    onKey('ArrowUp', selectUp);
    onKey('ArrowDown', selectDown);
    onKey('all', all);
  }, [matches, selected, value]);

  const matchList = matches.map((value, id) => {
    return <Result href={`#${id}`}>{value.title}</Result>;
  });

  return (
    <div className={'Search' + className}>
      <input
        type="text"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => e.target.focus()}
      />
      <Select selected={selected} onSelect={(value) => setSelected(value)}>
        {matchList}
      </Select>
    </div>
  );
};

export default Search;
