import './Card.scss';

const Card = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';
  const { onDelete = () => {} } = props;

  return (
    <div className={'Card' + className}>
      <button className="close-btn" onClick={onDelete} tabIndex="-1">
        x
      </button>
      <div className="content">{children}</div>
    </div>
  );
};

export default Card;
