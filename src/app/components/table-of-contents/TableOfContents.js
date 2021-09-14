import { useRef, useState } from 'react';
import { cj } from '../../util/classJoin';
import './TableOfContents.scss';

const TableOfContents = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const copy = { ...children };
  const list = copy.order || [];

  const draggedRef = useRef(null);

  const [dragged, setDragged] = useState();
  const [hovered, setHovered] = useState();
  const [dragStart, setDragStart] = useState();

  function startDrag(e) {
    e.preventDefault();
    setDragStart(e.clientY);
  }

  function stopDrag(e) {
    e.preventDefault();

    if (draggedRef.current) draggedRef.current.style.top = '';
    setDragged(null);
  }

  function onDrag(e) {
    e.preventDefault();

    if (dragged) {
      const travel = e.clientY - dragStart;

      draggedRef.current.style.top = travel + 'px';
    }
  }

  let passed = false;
  let covered = false;
  const itemList = list.map(({ id, value }) => {
    const isDragged = dragged === id;
    const isHovered = hovered === id;

    if (isDragged) passed = true;

    if (isDragged) covered = !covered;
    if (isHovered) covered = !covered;

    return (
      <div
        key={id}
        className={cj(
          'item',
          isHovered && 'hovered',
          dragged && (isDragged ? 'dragged' : passed ? 'below' : 'above'),
          dragged && covered && !isDragged && 'covered'
        )}
        onMouseDown={() => setDragged(id)}
        onMouseEnter={() => setHovered(id)}
      >
        <div className="text" ref={isDragged ? draggedRef : undefined}>
          {value.title}
        </div>
      </div>
    );
  });

  return (
    <div
      className={'TableOfContents' + className}
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseMove={onDrag}
    >
      {itemList}
    </div>
  );
};

export default TableOfContents;
