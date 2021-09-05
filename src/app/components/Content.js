import { useState } from 'react/cjs/react.development';
import Entry from './Entry';

const Content = ({ children, ...props }) => {
  const { onChange = () => {} } = props;

  // console.log(children.length && children[0].cases);
  return (
    <section>
      <ul className="entry-list">
        {children.map((entry) => {
          const { id } = entry;
          return (
            <Entry
              key={id}
              id={id}
              onChange={(part, value) => {
                onChange(id, part, value);
              }}
            >
              {entry}
            </Entry>
          );
        })}
      </ul>
    </section>
  );
};

export default Content;
