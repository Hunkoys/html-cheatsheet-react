import CardList from './CardList';
import Editable from './Editable';
import './Entries.scss';

const Entries = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onChange = () => {} } = props;

  function createContent({ title, description, cases, details }, id) {
    function createOnChangeHandler(part) {
      return (value) => onChange(id, part, value);
    }

    return (
      <section>
        <h2>
          <Editable onChange={createOnChangeHandler('title')}>{title}</Editable>
        </h2>
      </section>
    );
  }

  return (
    <section className={'Content' + className}>
      <CardList content={(value) => createContent(value)}>{children}</CardList>
    </section>
  );
};

export default Entries;
