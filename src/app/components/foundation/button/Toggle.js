import { useEffect, useState } from 'react';
import { cj } from '../../../util/classJoin';

const DEPRESSED_CLASS = 'depressed';

const Toggle = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { buttons = [], defaultValue, onToggle = () => {} } = props;
  const [depressed, setDepressed] = useState(defaultValue);

  useEffect(() => {
    onToggle(depressed);
  }, []);

  function createOnToggleHandler(value) {
    return () => {
      if (value !== depressed) {
        onToggle(value);
        setDepressed(value);
      }
    };
  }

  function evalClass(text) {
    if (text === depressed) return DEPRESSED_CLASS;
  }

  const buttonList = buttons.map((text) => {
    return (
      <button key={text} className={cj('button', evalClass(text))} onClick={createOnToggleHandler(text)}>
        {text}
      </button>
    );
  });

  return <div className={'Toggle' + className}>{buttonList}</div>;
};

export default Toggle;
