import { useRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { limit } from '../../../util/debounce';
import './FloatingButton.scss';

const limiters = [];
let i = 0;

function createLimiter() {
  limiters[i] = limit(2000, (callback) => callback());
  return i++;
}

function destroyLimiter(token) {
  limiters[token] = null;
}

const FloatingButton = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const elRef = useRef(null);

  const { onClick = () => {} } = props;
  const [left, setLeft] = useState(0);
  const [limiterToken, setLimiterToken] = useState();
  const [rect, setRect] = useState();

  useEffect(() => {
    setLimiterToken(createLimiter());

    return () => {
      destroyLimiter(limiterToken);
    };
  }, []);

  useEffect(() => {
    updateRect();
  }, [elRef]);

  function updateRect() {
    return setRect(elRef.current.getBoundingClientRect());
  }

  function handlePointerMove(e) {
    const left = e.clientX - elRef.current.getBoundingClientRect().left;

    limiters[limiterToken](updateRect);
    setLeft(left);
  }

  return (
    <div className={'FloatingButton' + className} ref={elRef} onMouseMove={handlePointerMove}>
      <button className="click-area"></button>
      <div className="rail"></div>
      <div className="floater" style={{ position: 'absolute', left }} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

export default FloatingButton;
