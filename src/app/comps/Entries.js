import CardList from './CardList';
import Editable from './Editable';
import './Entries.scss';

const Entries = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onChange = () => {}, onDelete = () => {} } = props;

  function createContent({ title, description, cases, details }, id) {
    function createOnChangeHandler(part) {
      return (value) => onChange(id, part, value);
    }

    return (
      <section>
        <h2 className="title">
          <Editable value={title} onChange={createOnChangeHandler('title')} placeholder="Title" />
        </h2>
      </section>
    );
  }

  return (
    <section className={'Entries' + className}>
      <CardList content={(value, id) => createContent(value, id)} onDelete={onDelete}>
        {children}
      </CardList>
    </section>
  );
};

export default Entries;
