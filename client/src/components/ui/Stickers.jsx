import { useState } from 'react';

const Stickers = ({ items, onAddItem, onRemoveItem, maxItems }) => {
  const [careerInputValue, setCareerInputValue] = useState('');

  const handleCareerInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (!event.target.value) return;
      onAddItem(event.target.value);
      setCareerInputValue('');
    }
  };

  return (
    <div className="flex justify-start gap-x-4 gap-y-1 w-[100%] bg-white items-center px-2 py-2 flex-wrap mt-1">
      {items.map((item) => (
        <div
          className="bg-gray-400 px-4 py-2 rounded-[5px] h-[40px] 
      flex gap-3 items-center justify-between"
        >
          <p className="text-white"> {item}</p>
          <p
            className="font-bold font-cairo hover:cursor-pointer"
            onClick={() => onRemoveItem(item)}
          >
            X
          </p>
        </div>
      ))}
      <input
        onChange={(event) => setCareerInputValue(event.target.value)}
        placeholder={items.length < maxItems ? 'Type and Press Enter' : ''}
        onKeyDown={handleCareerInputKeyDown}
        disabled={items.length === maxItems}
        value={careerInputValue}
        className="h-[50px] outline-none px-2 font-cairo text-sm"
      />
    </div>
  );
};

export default Stickers;
