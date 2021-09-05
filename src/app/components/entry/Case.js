import Codemirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import './case.scss';

const Case = ({ children, ...props }) => {
  const { html, css, output, categories } = children;
  const { onChange = () => {} } = props;

  const [htmlHidden, setHtmlHidden] = useState('');
  const [cssHidden, setCssHidden] = useState('hidden');

  const [liveHtml, setHtml] = useState(children.html);

  function createOnChangeHandler(part) {
    return function ({ target }) {
      const value = target.innerText;
      onChange(part, value);
    };
  }

  return (
    <div className="Case">
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

      <div className={`html code ${htmlHidden}`}>
        <div className="background">
          <Codemirror
            width="100%"
            value={liveHtml}
            onChange={(e) => {
              setHtml(e.getValue());
              onChange('html', e.getValue());
            }}
            options={{
              theme: 'dracula',
              keyMap: 'sublime',
              mode: 'html',
            }}
          />
        </div>
      </div>
      <div className={`css code ${cssHidden}`}>
        <div className="background">
          <Codemirror
            width="100%"
            value={css}
            onChange={(e) => {
              onChange('css', e.getValue());
            }}
            options={{
              theme: 'dracula',
              keyMap: 'sublime',
              mode: 'css',
            }}
          />
        </div>
      </div>

      <output className="output" dangerouslySetInnerHTML={{ __html: liveHtml }}></output>
      <ul className="category-list"></ul>
    </div>
  );
};

export default Case;
