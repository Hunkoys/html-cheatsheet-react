import { useState } from 'react';
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

const SELECTED = 'selected';

const Select = ({ children = [], className, ...props }) => {
  className = className ? ' ' + className : '';

  const { selected: selectedInitial, onSelect = () => {} } = props;
  const [selected, setSelected] = useState(selectedInitial);

  function select(id) {
    setSelected(id);
    onSelect(id);
  }

  const optionList = children.map(([id, item]) => (
    <Item key={id} className={Number(id) === Number(selected) && SELECTED} onClick={() => select(id)}>
      {item}
    </Item>
  ));

  return <div className={'Select' + className}>{optionList}</div>;
};

export default Select;
