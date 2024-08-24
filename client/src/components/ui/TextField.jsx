import { forwardRef } from 'react';

const TextField = forwardRef(({ error, label, id, type }, ref) => {
  return (
    <div className="">
      <label htmlFor={id} className="text-white block font-inter text-[14px]">
        {label}
      </label>
      <input
        name={id}
        id={id}
        type={type || 'text'}
        ref={ref}
        className={`outline-none h-[40px] w-[250px] px-2 mt-1 bg-easyWhite
        ${error ? 'focus:bg-red-500' : 'focus:bg-white'}`}
      />
    </div>
  );
});

export default TextField;
