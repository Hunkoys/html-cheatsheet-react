import { useRef, useEffect } from 'react';

const Editable = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';
  const { value, onChange = () => {} } = props;

  const el = useRef(null);

  useEffect(() => {
    el.current.innerText = children;
  }, []);

  function onChangeHandler(e) {
    const value = e.target.innerText;
    onChange(value);
  }

  return (
    <span
      className={'Editable' + className}
      ref={el}
      contentEditable
      suppressContentEditableWarning
      onInput={onChangeHandler}
    ></span>
  );
};

export default Editable;
