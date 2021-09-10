const CloseBtn = ({ children, ...props }) => {
  const { onClick = () => {} } = props;

  return (
    <button className="close-btn" onClick={onClick}>
      x
    </button>
  );
};

export default CloseBtn;
