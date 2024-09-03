import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { forwardRef, useRef, useState } from 'react';

const FILTERS = [
  // { img: './assets/house.png', label: 'Housing', filter: 'housing' },
  {
    img: './assets/guarantee.png',
    label: 'Job Guarantee',
    filter: 'jobGuarantee',
  },
  {
    img: './assets/handshake.png',
    label: 'Job Assistance',
    filter: 'jobAssistance',
  },
];

const Filters = forwardRef(({ filters = {}, onChange, onReset }, ref) => {
  const maxCostRef = useRef();

  const handleMaxCostChange = (event) => {
    const value = maxCostRef.current.value || 20_000;
    onChange('maximumCost', value);
  };

  return (
    <div
      ref={ref}
      className="flex justify-center items-center gap-4 border-b-[1px] border-[#575757]"
    >
      {FILTERS.map(({ img, label, filter }) => (
        <div
          key={filter}
          onClick={() => onChange(filter, !filters[filter])}
          className={`flex items-center justify-center hover:bg-[#3f3f3f] 
    hover:cursor-pointer px-6 py-4 gap-2 border-b-[3px] border-t-[3px] border-t-transparent ${
      filters[filter] ? 'border-white' : 'border-b-transparent'
    }`}
        >
          <img src={img} alt={label} className="w-[30px]" />
          <p className="text-white font-cairo">{label}</p>
        </div>
      ))}
      <div
        className="flex items-center justify-center hover:bg-[#3f3f3f] 
    hover:cursor-pointer px-6 py-4 gap-2 group"
      >
        <img src="./assets/cash.png" alt="Cash" className="w-[30px]" />
        <div className="flex items-center gap-2">
          <p className="text-white font-cairo group-hover:hidden w-[170px]">
            Maximum Cost: ${filters.maximumCost}
          </p>
          <input
            ref={maxCostRef}
            onBlur={handleMaxCostChange}
            defaultValue={filters.maximumCost}
            type="number"
            min="1000"
            step="10000"
            max="20000"
            className="outline-none px-2 font-cairo h-[30px] 
            hidden group-hover:block w-[170px]"
          />
        </div>
      </div>

      <Button onClick={onReset} height={30} fontSize={13}>
        Reset
      </Button>
    </div>
  );
});

export default Filters;
