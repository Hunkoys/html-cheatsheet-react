import Card from '../src/app/components/Card';

const CardList = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { content = (item, id) => <Card key={id}>{item}</Card>, onDelete = () => {} } = props;

  function createOnDeleteHandler(id) {
    return () => onDelete(id);
  }

  const list =
    children.map &&
    children.map((item, id) => (
      <li key={id}>
        <Card key={id} onDelete={createOnDeleteHandler(id)}>
          {content(item, id)}
        </Card>
      </li>
    ));

  return <ol className={'CardList' + className}>{list}</ol>;
};

export default CardList;
