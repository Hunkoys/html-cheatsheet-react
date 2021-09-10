import { useState } from 'react';
import './Case.scss';
import Editor from './Editor';
import Toggle from './Toggle';

const HIDDEN_CLASS = 'hidden';
const editors = {
  html: 'HTML',
  css: 'CSS',
};

const Case = ({ children = {}, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onChange = () => {} } = props;
  const defaultVisible = editors.html;

  const [html, setHtml] = useState(children.html || '');
  const [css, setCss] = useState(children.css || '');
  const [visible, setVisible] = useState(defaultVisible);

  function onToggleHandler(value) {
    setVisible(value);
  }

  function createOnChangeHandler(part, setter) {
    return function (value) {
      setter(value);
      onChange(part, value);
    };
  }

  function evalHidden(editor) {
    return !visible || visible === editor ? '' : HIDDEN_CLASS;
  }

  console.log(evalHidden ? 't' : 'f');
  return (
    <div className={'Case' + className}>
      <Toggle
        className="language-toggle"
        buttons={[editors.html, editors.css]}
        onToggle={onToggleHandler}
        defaultValue={defaultVisible}
      />

      <Editor
        className={evalHidden(editors.html)}
        mode="html"
        value={html}
        onChange={createOnChangeHandler('html', setHtml)}
      />
      <Editor
        className={evalHidden(editors.css)}
        mode="css"
        value={css}
        onChange={createOnChangeHandler('css', setCss)}
      />
    </div>
  );
};

export default Case;
