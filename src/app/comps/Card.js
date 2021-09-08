const Card = ({ children, className, ...props }) => {
  className = className ? ' ' + className : '';
  const { onClose = () => {} } = props;

  return (
    <div className={'Card' + className}>
      <div className="content">{children}</div>
      <button className="close-btn" onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default Card;
