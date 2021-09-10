import Card from './Card';
import './CardList.scss';

const CardList = ({ children = [], className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onDelete = () => {} } = props;

  function createOnDeleteHandler(id) {
    return () => onDelete(id);
  }

  return (
    <div className={'CardList' + className}>
      {children.map(([id, element]) => (
        <Card key={id} onDelete={createOnDeleteHandler(id)}>
          {element}
        </Card>
      ))}
    </div>
  );
};

export default CardList;
