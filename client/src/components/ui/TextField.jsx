import { forwardRef } from 'react';

const TextField = forwardRef(
  ({ errorFill, label, id, type, errorText, onChange }, ref) => {
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
          onChange={onChange}
          className={`outline-none h-[40px] w-[250px] px-2 mt-1 bg-easyWhite
        ${errorFill ? 'focus:bg-red-500' : 'focus:bg-white'}`}
        />
        {errorText && (
          <p className="text-red-400 mt-1 font-cairo text-[15px]">
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

export default TextField;
