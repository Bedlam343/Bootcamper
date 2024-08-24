const Checkbox = ({ id, checked, onClick, label }) => {
  return (
    <div className="flex gap-8">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        className="h-[20px] w-[20px] [clip-path:circle(40%_at_50%_50%)]"
        onClick={onClick}
      />
      <label htmlFor={id} className="text-white font-inter text-[14px]">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
