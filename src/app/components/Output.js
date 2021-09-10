import { useRef } from 'react';
import './Output.scss';
const Output = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const iframeRef = useRef(null);
  const { current: iframe } = iframeRef;

  const { html = '', css = '', js = '' } = props;

  if (iframe) {
    const doc = iframe.contentDocument;
    const head = doc.head || doc.getElementsByTagName('head')[0];
    const body = doc.body || doc.getElementsByTagName('body')[0];

    const style = doc.createElement('style');
    style.type = 'text/css';
    style.append(
      `
      * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      html {
        padding: 35px !important;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
      }
      
      ${css}
    `
    );
    head.innerText = '';
    head.append(style);

    body.innerText = '';
    body.innerHTML = html;

    iframe.style.height = 0;
    iframe.style.height = body.scrollHeight + 'px';
  }

  return (
    <div className={'Output' + className}>
      <iframe className="iframe" ref={iframeRef}></iframe>
    </div>
  );
};

export default Output;
