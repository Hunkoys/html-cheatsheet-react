import { useRef } from 'react';

const Output = ({ children, ...props }) => {
  const iframeRef = useRef();
  const { current: iframe } = iframeRef;

  const { html, css, js } = props;

  if (iframe) {
    const doc = iframe.contentDocument;
    const head = doc.head || doc.getElementsByTagName('head')[0];
    const body = doc.body || doc.getElementsByTagName('body')[0];

    const style = doc.createElement('style');
    style.type = 'text/css';
    style.append(
      `
      html {
        padding: 35px !important;
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
    <div className="output">
      <iframe className="doc" ref={iframeRef}></iframe>
    </div>
  );
};

export default Output;
