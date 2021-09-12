import { useState } from 'react';
import Select from '../foundation/button/Select';
import './Search.scss';

const Result = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { id = '#' } = props;

  return (
    <a href={id} className={'Result' + className}>
      {children}
    </a>
  );
};

// Search ////////////////

const keyDownMap = {
  enter: console.log('hello'),
};

const Search = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { scope = [] } = props;

  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(null);

  function handleKeyDown(e) {
    const key = e.key.toLowerCase();
    if (keyDownMap[key]) keyDownMap[key]();
  }

  const matches = scope.filter(({ title }) => {
    const regex = new RegExp(value, 'i');
    return title.match(regex);
  });

  const matchList = matches.map((value, id) => {
    return <Result id={`#${id}`}>{value.title}</Result>;
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
