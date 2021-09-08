import { useEffect, useRef } from 'react';
import CloseBtn from './CloseBtn';

const Card = ({ children, ...props }) => {
  const el = useRef(null);

  useEffect(() => {
    el.current.innerText = children;
  }, []);

  const { onClose = () => {}, onChange = () => {}, className = '' } = props;

  return (
    <div className={className}>
      <div
        ref={el}
        className="content"
        contentEditable
        suppressContentEditableWarning
        onInput={({ target }) => {
          const value = target.innerText;
          onChange(value);
        }}
      ></div>
      <CloseBtn onClick={onClose} />
    </div>
  );
};

export default Card;
