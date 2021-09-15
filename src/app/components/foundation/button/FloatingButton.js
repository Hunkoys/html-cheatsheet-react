import { useEffect, useRef, useState } from 'react';
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
    limiters[limiterToken](updateRect);

    const left = e.clientX - rect.left;
    setLeft(left);
  }

  return (
    <div className={'FloatingButton' + className} ref={elRef} onMouseMove={handlePointerMove}>
      <button className="click-area" onClick={onClick}></button>
      <div className="rail"></div>
      <div className="floater" style={{ position: 'absolute', left }}>
        {children}
      </div>
    </div>
  );
};

export default FloatingButton;
