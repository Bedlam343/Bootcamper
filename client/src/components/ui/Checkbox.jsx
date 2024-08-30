const Checkbox = ({
  id,
  checked,
  onClick,
  label,
  gap = 'gap-8',
  defaultChecked,
}) => {
  return (
    <div className={`flex ${gap}`}>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        defaultChecked={defaultChecked}
        className="h-[20px] w-[20px] z-10 [clip-path:circle(40%_at_50%_50%)]"
        onClick={onClick}
      />
      <label htmlFor={id} className="text-white font-cairo text-[14px]">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
