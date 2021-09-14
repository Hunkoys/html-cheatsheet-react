import { useRef } from 'react';
import { createCase } from '../../data/creator';
import { cj } from '../../util/classJoin';
import Case from '../case/Case';
import CardList from '../foundation/block/CardList';
import FloatingButton from '../foundation/button/FloatingButton';
import Editable from '../foundation/editable/Editable';

const COVERED = 'covered';

function checkIfCovered({ top, bottom }) {
  if (top < 0 && bottom > 100) return true;
  return false;
}

const Entry = ({ children, id, className, ...props }) => {
  className = className ? ' ' + className : '';

  const entryRef = useRef(null);

  const { value, onChange = () => {}, onInsert = () => {} } = props;
  const { title, description, cases = [], details } = value;

  const rect = entryRef.current && entryRef.current.getBoundingClientRect();
  const covered = rect ? checkIfCovered(rect) : false;

  function updateCases(caseId, part, value) {
    cases.get(caseId)[part] = value;
    onChange('cases', cases);
  }

  function onCaseDeleteHandler(id) {
    cases.delete(id);
    onChange('cases', cases);
  }

  function pushNewCase() {
    cases.push(createCase());
    onChange('cases', cases);
  }

  const caseList = cases.map((_case, id) => {
    return <Case onChange={(part, value) => updateCases(id, part, value)}>{_case}</Case>;
  });

  return (
    <div id={id} className={cj('Entry', className, covered && COVERED)} ref={entryRef}>
      <div className={cj('card')}>
        <div className="header">
          <Editable className="title" value={title} onChange={(...p) => onChange('title', ...p)} placeholder="Title" />
        </div>
        <Editable
          className="description"
          value={description}
          onChange={(...p) => onChange('description', ...p)}
          placeholder="Description"
        />

        <CardList className="case-list" onDelete={onCaseDeleteHandler}>
          {caseList}
        </CardList>
        <button className="button new-case-btn" onClick={pushNewCase}>
          New Case
        </button>
      </div>

      <FloatingButton onClick={onInsert}>+</FloatingButton>
    </div>
  );
};

export default Entry;
