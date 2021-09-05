import { useState } from 'react/cjs/react.development';
import Entry from './Entry';

const Content = ({ children, ...props }) => {
  const onChange = props.onChange || (() => {});

  return (
    <section>
      <ul className="entry-list">
        {children.map((entry) => {
          const { id } = entry;
          return (
            <Entry key={id} id={id} onChange={onChange}>
              {entry}
            </Entry>
          );
        })}
      </ul>
    </section>
  );
};

export default Content;
