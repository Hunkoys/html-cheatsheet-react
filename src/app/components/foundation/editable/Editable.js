import { useRef, useEffect, useState } from 'react';
import { cj } from '../../../util/classJoin';
import './Editable.scss';

const Editable = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';
  const { value = '', placeholder, onChange = () => {} } = props;

  const [empty, setEmpty] = useState('');

  const el = useRef(null);

  useEffect(() => {
    el.current.innerText = value;
    if (value) setEmpty('');
    else setEmpty('empty');
  }, []);

  function onChangeHandler(e) {
    const value = e.target.innerText;

    if (value) setEmpty('');
    else setEmpty('empty');

    onChange(value);
  }

  return (
    <div className={cj('Editable', className, empty)}>
      <div className="value" ref={el} contentEditable suppressContentEditableWarning onInput={onChangeHandler}></div>
      <div className="placeholder">{placeholder}</div>
    </div>
  );
};

export default Editable;
