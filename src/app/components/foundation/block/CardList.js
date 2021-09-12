import Card from './Card';
import './CardList.scss';

const CardList = ({ children = [], className, ...props }) => {
  className = className ? ' ' + className : '';

  const list = children.order || [];

  const { onDelete = () => {} } = props;

  function createOnDeleteHandler(id) {
    return () => onDelete(id);
  }

  return (
    <div className={'CardList' + className}>
      {list.map(({ value, id }) => {
        return (
          <Card key={id} onDelete={createOnDeleteHandler(id)}>
            {value}
          </Card>
        );
      })}
    </div>
  );
};

export default CardList;
