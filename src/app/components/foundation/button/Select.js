import Collection from '../../../util/collection';
import './Select.scss';

const Item = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onClick = () => {} } = props;

  return (
    <div className={'Item' + className} onClick={onClick}>
      {children}
    </div>
  );
};

// Select =======================

// IMplement window onKeyDown.

const SELECTED = 'selected';

const Select = ({ children = Collection(), className, ...props }) => {
  className = className ? ' ' + className : '';

  const list = children.order;

  const { selected, onSelect = () => {} } = props;

  function select(id) {
    onSelect(id);
  }

  const optionList = list.map(({ value, id }) => (
    <Item key={id} className={Number(id) === Number(selected) && SELECTED} onClick={() => select(id)}>
      {value}
    </Item>
  ));

  return <div className={'Select' + className}>{optionList}</div>;
};

export default Select;
