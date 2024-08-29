import { useState } from 'react';

const UnitList = ({ units, editable, onEdit, onDelete }) => {
  const [expandedUnitIds, setExpandedUnitIds] = useState({});

  const handleUnitClick = (unitId) => {
    setExpandedUnitIds((expanded) => ({
      ...expanded,
      [unitId]: !expanded[unitId],
    }));
  };

  return (
    <>
      {units.map((unit, index) => (
        <div key={unit._id} className="w-[100%]">
          <div className="flex w-[100%] gap-4 justify-center items-center">
            <div
              onClick={() => handleUnitClick(unit._id)}
              className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center
                    hover:cursor-pointer group"
            >
              <img
                src={`./assets/${
                  expandedUnitIds[unit._id] ? 'minus' : 'plus'
                }.png`}
                alt="Plus"
                className="w-[25px] h-[25px] group-hover:w-[30px] group-hover:h-[30px]"
              />
            </div>

            <div
              onClick={() => handleUnitClick(unit._id)}
              className={`flex flex-col bg-gray-800 
                    rounded-[10px] flex-1 hover:cursor-pointer ${
                      expandedUnitIds[unit._id] ? 'border-4 border-white' : ''
                    }`}
            >
              <div className="flex justify-between items-center px-4 py-2">
                <p className="text-white">{unit.title}</p>
                <div className="bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              {expandedUnitIds[unit._id] && (
                <div className="border-t-2 border-gray-600 px-4 py-6">
                  <p className="text-white">{unit.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end text-white mt-2 gap-2">
            <button
              onClick={() => onEdit(unit._id)}
              className="rounded-full hover:bg-gray-700 px-2 py-2 hover:cursor-pointer"
            >
              <img src="./assets/edit.png" alt="Edit" className="w-[27px]" />
            </button>
            <button
              onClick={() => onDelete(unit._id)}
              className="rounded-full hover:bg-gray-700 px-2 py-2 hover:cursor-pointer"
            >
              <img src="./assets/delete.png" alt="Edit" className="w-[27px]" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default UnitList;
