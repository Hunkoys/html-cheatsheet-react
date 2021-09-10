import Codemirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';
import { useState } from 'react/cjs/react.development';
import Card from '../Card';
import './case.scss';
import Output from './Output';

let idCounter = 1;

function id() {
  return idCounter++;
}

const Case = ({ children, ...props }) => {
  const { onChange = () => {} } = props;

  const [htmlHidden, setHtmlHidden] = useState('');
  const [cssHidden, setCssHidden] = useState('hidden');

  const [html, setHtml] = useState(children.html);
  const [css, setCss] = useState(children.css);
  const [categories, setCategoies] = useState(
    children.categories.map((cat) => {
      return { id: id(), value: cat };
    })
  );

  function createOnChangeHandler(part, setter) {
    return function (codemirror) {
      const value = codemirror.getValue();
      setter(value);
      onChange(part, value);
    };
  }

  function updateCategories(categories) {
    setCategoies([...categories]);

    const list = categories.map(({ value }) => value);
    onChange('categories', list);
  }

  function createCaseOnChangeHandler(i) {
    return function (value) {
      categories[i].value = value;
      updateCategories(categories);
    };
  }

  function createCaseOnDeleteHandler(i) {
    return function () {
      categories.splice(i, 1);
      updateCategories(categories);
    };
  }

  return (
    <div className="Case">
      <div className="lang-toggle">
        <button
          onClick={() => {
            setHtmlHidden('');
            setCssHidden('hidden');
          }}
        >
          HTML
        </button>

        <button
          onClick={() => {
            setHtmlHidden('hidden');
            setCssHidden('');
          }}
        >
          CSS
        </button>
      </div>

      <div className={`css code ${cssHidden}`}>
        <div className="background">
          <Codemirror
            width="100%"
            value={css}
            onChange={createOnChangeHandler('css', setCss)}
            options={{
              theme: 'dracula',
              keyMap: 'sublime',
              mode: 'css',
              scrollbarStyle: 'null',
            }}
          />
        </div>
      </div>

      <div className={`html code ${htmlHidden}`}>
        <div className="background">
          <Codemirror
            width="100%"
            value={html}
            onChange={createOnChangeHandler('html', setHtml)}
            options={{
              theme: 'dracula',
              keyMap: 'sublime',
              mode: 'html',
              scrollbarStyle: 'null',
            }}
          />
        </div>
      </div>

      <Output html={html} css={css} />
      <div className="category-list">
        <ul>
          {categories.map(({ value, id }, i) => {
            return (
              <Card
                key={id}
                className="category-item"
                onChange={createCaseOnChangeHandler(i)}
                onClose={createCaseOnDeleteHandler(i)}
              >
                {value}
              </Card>
            );
          })}
        </ul>
        <button
          className="new-category-button"
          onClick={() => {
            categories.push({ value: '', id: id() });
            updateCategories(categories);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Case;
