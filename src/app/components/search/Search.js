import { useState } from 'react';
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

  const { scope = [] } = props;

  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(null);

  const keyDownMap = {
    enter: () => console.log('hello'),
    arrowup: () => console.log('hi'),
  };

  function handleKeyDown(e) {
    const key = e.key.toLowerCase();
    console.log(key);
    if (keyDownMap[key]) keyDownMap[key]();
  }

  const matches = scope.filter(({ title }) => {
    const regex = new RegExp(value, 'i');
    return title.match(regex);
  });

  const matchList = matches.map((value, id) => {
    return <Result href={`#${id}`}>{value.title}</Result>;
  });

  return (
    <div className={'Search' + className}>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
      <Select value={selected} onSelect={(value) => setSelected(value)}>
        {matchList}
      </Select>
    </div>
  );
};

export default Search;
