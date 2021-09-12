import { createCase } from '../../data/creator';
import Case from '../case/Case';
import CardList from '../foundation/block/CardList';
import Editable from '../foundation/editable/Editable';

const Entry = ({ children, id, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { value, onChange = () => {} } = props;
  const { title, description, cases = [], details } = value;

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
    <div id={id} className="Entry">
      <Editable className="title" value={title} onChange={(...p) => onChange('title', ...p)} placeholder="Title" />
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
  );
};

export default Entry;
