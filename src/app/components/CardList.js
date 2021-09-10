import Card from './Card';

const CardList = ({ children = [], className, ...props }) => {
  className = className ? ' ' + className : '';

  const { onDelete = () => {} } = props;

  function createOnDeleteHandler(id) {
    return () => onDelete(id);
  }

  return (
    <ol className={'CardList' + className}>
      {children.map(([id, element]) => (
        <li key={id}>
          <Card key={id} onDelete={createOnDeleteHandler(id)}>
            {element}
          </Card>
        </li>
      ))}
    </ol>
  );
};

export default CardList;
