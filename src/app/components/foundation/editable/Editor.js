import ReactCodemirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';
import './Editor.scss';

const Editor = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { mode = 'null', value = '', onChange = () => {} } = props;

  return (
    <div className={'Editor' + className}>
      <div className="background">
        <ReactCodemirror
          width="100%"
          value={value}
          onChange={(codemirror) => {
            onChange(codemirror.getValue(), codemirror);
          }}
          options={{
            theme: 'dracula',
            keyMap: 'sublime',
            mode,
            scrollbarStyle: 'null',
            lineWrapping: true,
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
