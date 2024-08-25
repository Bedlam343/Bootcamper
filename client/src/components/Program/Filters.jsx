import { useState } from 'react';

const FILTERS = [
  { img: './assets/house.png', label: 'Housing', filter: 'housing' },
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

const Filters = () => {
  const [activeFilters, setActiveFilters] = useState({
    housing: false,
    jobGuarantee: false,
    jobAssistance: false,
  });

  const handleFilterClick = (filter) => {
    // flip the active status of the filter
    setActiveFilters((filters) => ({ ...filters, [filter]: !filters[filter] }));
  };

  return (
    <div className="flex justify-center gap-4 border-b-[1px] border-[#575757]">
      {FILTERS.map(({ img, label, filter }) => (
        <div
          onClick={() => handleFilterClick(filter)}
          className={`flex items-center justify-center hover:bg-[#3f3f3f] 
    hover:cursor-pointer px-6 py-4 gap-2 border-b-[3px] border-t-[3px] border-t-transparent ${
      activeFilters[filter] ? 'border-white' : 'border-b-transparent'
    }`}
        >
          <img src={img} alt={label} className="w-[30px]" />
          <p className="text-white font-cairo">{label}</p>
        </div>
      ))}
      <div
        className="flex items-center justify-center hover:bg-[#3f3f3f] 
    hover:cursor-pointer px-6 py-4 gap-2"
      >
        <img src="./assets/cash.png" alt="Cash" className="w-[30px]" />
        <p className="text-white font-cairo">Cost Range</p>
      </div>
    </div>
  );
};

export default Filters;
