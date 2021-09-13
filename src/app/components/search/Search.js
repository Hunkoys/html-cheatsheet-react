import { useEffect, useState } from 'react';
import Collection from '../../util/collection';
import Select from '../foundation/button/Select';
import './Search.scss';

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
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    console.log('added');
    return () => {
      console.log('removed');
    };
  }, []);

  const matches = scope.filter(({ title }) => {
    const regex = new RegExp(value, 'i');
    return title.match(regex);
  });

  const matchList = matches.map((value, id) => {
    return <Result href={`#${id}`}>{value.title}</Result>;
  });

  const keyDownMap = {
    enter: () => console.log('hello'),
    arrowup: (e) => {
      e.preventDefault();
      const prev = matches.previousIdOf(selected);
      if (prev) setSelected(prev);
    },
    arrowdown: (e) => {
      e.preventDefault();
      const next = matches.nextIdOf(selected);
      if (next) setSelected(next);
    },
  };

  function handleKeyDown(e) {
    const key = e.key.toLowerCase();
    console.log(key);
    if (keyDownMap[key]) keyDownMap[key](e);
  }

  return (
    <div className={'Search' + className}>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
      <Select selected={selected} onSelect={(value) => setSelected(value)}>
        {matchList}
      </Select>
    </div>
  );
};

export default Search;
