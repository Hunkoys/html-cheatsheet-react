import Card from './Card';

const CardList = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';

  const { content = (item, id) => <Card key={id}>{item}</Card> } = props;

  const list =
    children.map &&
    children.map((item, id) => (
      <li key={id}>
        <Card key={id}>{content(item, id)}</Card>
      </li>
    ));

  return <ol className={'CardList' + className}>{list}</ol>;
};

export default CardList;
