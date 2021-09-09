import './Card.scss';

const Card = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';
  const { onDelete = () => {} } = props;

  return (
    <div className={'Card' + className}>
      <div className="content">{children}</div>
      <button className="close-btn" onClick={onDelete}>
        x
      </button>
    </div>
  );
};

export default Card;
