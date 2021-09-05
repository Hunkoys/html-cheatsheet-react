import { useEffect, useRef, useState } from 'react';
import createCase from '../data/createCase';
import debounce from '../util/debounce';
import Case from './entry/Case';

const debouncedOnChange = debounce(300, (callback) => {
  callback();
});

const Entry = ({ children, ...props }) => {
  const titleEl = useRef(null);
  const descriptionEl = useRef(null);

  const { title, description } = children;
  const [cases, setCases] = useState([]);

  useEffect(() => {
    titleEl.current.innerText = title;
    descriptionEl.current.innerText = description;
    setCases(children.cases);
  }, []);

  const { onChange = () => {} } = props;

  function caseChange(i, part, value) {
    cases[i][part] = value;
    onChange('cases', cases);
  }

  // console.log(cases);

  return (
    <li className="item">
      <h2
        ref={titleEl}
        className="title"
        contentEditable
        suppressContentEditableWarning
        onInput={({ target }) => {
          const value = target.innerText;

          onChange('title', value);
        }}
      ></h2>
      <p
        ref={descriptionEl}
        className="description"
        contentEditable
        suppressContentEditableWarning
        onInput={({ target }) => {
          const value = target.innerText;

          onChange('description', value);
        }}
      ></p>
      <ul className="cases-list">
        {cases.map((case_, i) => {
          return (
            <Case
              key={i}
              id={i}
              onChange={(part, value) => {
                caseChange(i, part, value);
              }}
            >
              {case_}
            </Case>
          );
        })}
      </ul>
      <button
        className="button"
        onClick={() => {
          const case_ = createCase();
          cases.push(case_);

          onChange('cases', cases);
        }}
      >
        New Case
      </button>
    </li>
  );
};

export default Entry;
