const Button = ({
  children,
  onClick,
  danger = false,
  type = 'button',
  disabled,
  height = 40,
  width = 'auto',
  fontSize = 16,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      style={{ height, width, fontSize }}
      className={`text-white ${
        danger ? 'border-red-400' : 'border-white'
      } border-2 rounded-[5px] 
      px-4 py-2flex items-center ease-in-out duration-300 
      ${
        danger
          ? 'hover:text-red-400'
          : 'hover:border-themeBlue hover:text-themeBlue'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
