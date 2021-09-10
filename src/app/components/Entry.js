import CardList from './CardList';
import { createCase } from '../data/creator';
import Case from './Case';
import Editable from './Editable';

const Entry = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { value, onChange = () => {} } = props;
  const { title, description, cases = [], details } = value;

  function onCaseChange(caseId, part, value) {
    cases[caseId][part] = value;
    onChange('cases', cases);
  }

  function onCaseDeleteHandler(id) {
    delete cases[id];
    onChange('cases', cases);
  }

  function pushNewCase() {
    cases.push(createCase());
    onChange('cases', cases);
  }

  const caseList = cases.map((_case, id) => {
    return [id, <Case onChange={(...p) => onCaseChange(id, ...p)}>{_case}</Case>];
  });

  return (
    <div className="Entry">
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
      <button className="button new-case-button" onClick={pushNewCase}>
        New Case
      </button>
    </div>
  );
};

export default Entry;
