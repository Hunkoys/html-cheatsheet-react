import Entry from './Entry';
import './Entries.scss';
import CardList from '../foundation/block/CardList';
import { limit } from '../../util/debounce';
import { useEffect, useState } from 'react';

const Entries = ({ children = [], className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onChange = () => {}, onDelete = () => {}, onInsert = () => {} } = props;
  const [scroll, setScroll] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = limit(50, (e) => {
      setScroll(window.scrollY);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function createOnChangeHandler(id) {
    return function (part, value) {
      onChange(id, part, value);
    };
  }

  const entryList = children.map((entry, id) => {
    return <Entry id={`${id}`} value={entry} onChange={createOnChangeHandler(id)} onInsert={() => onInsert(id)} />;
  });

  return (
    <section className={'Entries' + className}>
      <CardList onDelete={onDelete}>{entryList}</CardList>
    </section>
  );
};

export default Entries;
