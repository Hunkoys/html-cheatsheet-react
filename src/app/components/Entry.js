import { useEffect, useRef, useState } from 'react';
import debounce from '../util/debounce';

const debouncedOnChange = debounce(300, (callback) => {
  callback();
});

const Entry = ({ children, ...props }) => {
  const titleEl = useRef(null);
  const descriptionEl = useRef(null);

  const [title, setTitle] = useState(children.title);
  const [description, setDescription] = useState(children.description);

  useEffect(() => {
    titleEl.current.innerText = title;
    descriptionEl.current.innerText = description;
  }, []);

  const { id, onChange = () => {} } = props;

  return (
    <li className="item">
      <h2
        ref={titleEl}
        type="text"
        className="title"
        contentEditable
        suppressContentEditableWarning
        onInput={({ target }) => {
          const value = target.innerText;

          setTitle(value);
          debouncedOnChange(() => {
            onChange(id, 'title', value);
          });
        }}
        // value={title}
      ></h2>
      <p
        ref={descriptionEl}
        className="description"
        contentEditable
        suppressContentEditableWarning
        onInput={({ target }) => {
          const value = target.innerText;

          setDescription(value);
          debouncedOnChange(() => {
            onChange(id, 'description', value);
          });
        }}
      ></p>
    </li>
  );
};

export default Entry;
