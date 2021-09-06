import Codemirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import './case.scss';
import Output from './Output';

const Case = ({ children, ...props }) => {
  const { onChange = () => {} } = props;

  const [htmlHidden, setHtmlHidden] = useState('');
  const [cssHidden, setCssHidden] = useState('');

  const [html, setHtml] = useState(children.html);
  const [css, setCss] = useState(children.css);

  function createOnChangeHandler(part, setter) {
    return function (codemirror) {
      const value = codemirror.getValue();
      setter(value);
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
      <ul className="category-list"></ul>
    </div>
  );
};

export default Case;
