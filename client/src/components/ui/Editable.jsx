const Editable = ({ children, active, iconSize, onClick, gap = 50 }) => {
  const handleClick = () => {
    if (!active) return;
    onClick();
  };

  return (
    <div
      style={{ gap }}
      onClick={handleClick}
      className={`flex items-center group ${
        active && 'hover:cursor-pointer hover:bg-gray-700'
      }`}
    >
      {children}
      {active && (
        <img
          style={{ width: iconSize, height: iconSize }}
          src="/assets/edit.png"
          alt="Edit"
          // className="hidden group-hover:block"
        />
      )}
    </div>
  );
};

export default Editable;
