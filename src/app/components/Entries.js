import CardList from './CardList';
import Entry from './Entry';
import './Entries.scss';

const Entries = ({ children = [], className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onChange = () => {}, onDelete = () => {} } = props;

  function createOnChangeHandler(id) {
    return function (part, value) {
      onChange(id, part, value);
    };
  }

  return (
    <section className={'Entries' + className}>
      <CardList onDelete={onDelete}>
        {children.map((entry, id) => [id, <Entry value={entry} onChange={createOnChangeHandler(id)} />])}
      </CardList>
    </section>
  );
};

export default Entries;
