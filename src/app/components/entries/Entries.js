import Entry from './Entry';
import './Entries.scss';
import CardList from '../foundation/block/CardList';

const Entries = ({ children = [], className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onChange = () => {}, onDelete = () => {} } = props;

  function createOnChangeHandler(id) {
    return function (part, value) {
      onChange(id, part, value);
    };
  }

  const entryList = children.map((entry, id) => {
    return <Entry value={entry} onChange={createOnChangeHandler(id)} />;
  });

  return (
    <section className={'Entries' + className}>
      <CardList onDelete={onDelete}>{entryList}</CardList>
    </section>
  );
};

export default Entries;
