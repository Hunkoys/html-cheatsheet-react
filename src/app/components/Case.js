import { useState } from 'react';
import CardList from './CardList';
import './Case.scss';
import Editable from './Editable';
import Editor from './Editor';
import Output from './Output';
import Toggle from './Toggle';

const HIDDEN_CLASS = 'hidden';
const editors = {
  html: 'HTML',
  css: 'CSS',
};

const Case = ({ children = {}, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onChange = () => {} } = props;
  const { categories = [], html: _html = '', css: _css = '' } = children;
  const defaultVisible = editors.html;

  const [html, setHtml] = useState(_html);
  const [css, setCss] = useState(_css);
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

  function createCategoryChangeHandler(id) {
    return function onCategoryChangeHandler(value) {
      categories.set(id, value);
      onChange('categories', categories);
    };
  }

  const categoryList = categories.map((category, id) => [
    id,
    <Editable className="category" value={category} onChange={createCategoryChangeHandler(id)} />,
  ]);

  function handleCardDelete(id) {
    categories.delete(id);
    onChange('categories', categories);
  }

  function newCategoryHandler() {
    categories.push('');
    onChange('cate');
  }

  function evalHidden(editor) {
    return !visible || visible === editor ? '' : HIDDEN_CLASS;
  }

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

      <Output html={html} css={css} />

      <div className="categories">
        <CardList onDelete={(id) => handleCardDelete(id)}>{categoryList}</CardList>
        <button className="button new-category-btn" onClick={() => newCategoryHandler()}>
          +
        </button>
      </div>
    </div>
  );
};

export default Case;
