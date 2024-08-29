const Button = ({ children, onClick, danger = false, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white ${
        danger ? 'border-red-400' : 'border-white'
      } border-2 rounded-[5px] 
      px-4 py-2 h-[40px] flex items-center ease-in-out duration-300 
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
