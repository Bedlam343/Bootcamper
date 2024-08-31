const ProgramCard = ({ program, onClick, selected }) => {
  return (
    <div
      id={program.id}
      onClick={() => onClick(program.id)}
      className={`min-w-[300px] max-w-[400px] relative hover:cursor-pointer hover:opacity-80 border-2
  hover:border-white group ${selected ? 'border-white' : 'border-[#acacac] '}`}
    >
      <img
        src={program.photo}
        alt=""
        className="w-[400px] h-[130px] object-cover"
      />

      <div
        className={`px-4 py-4 group-hover:bg-gray-700 
    ${selected ? 'bg-gray-700' : 'bg-lightBlack'}`}
      >
        <p
          className={`font-cairo font-semibold text-xl text-white group-hover:underline
      ${selected ? 'underline' : ''}`}
        >
          {program.name}
        </p>

        <div className="flex gap-x-2 items-start mt-3">
          <img
            src="/assets/target.png"
            alt="Target"
            className="w-[20px] h-[20px]"
          />
          <div className="font-cairo flex flex-wrap gap-x-2 text-[14px] text-[#cbcbcb]">
            {program.careers.map((career, index) => (
              <div
                key={career}
                className="flex justify-center gap-2 items-center"
              >
                <p className="">{career}</p>
                {index < program.careers.length - 1 && (
                  <div className="w-[4px] h-[4px] rounded-full bg-[#cbcbcb]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div
          className="absolute top-4 right-4 h-[40px] w-[100px] flex items-center 
      justify-center bg-white rounded-full border-4 border-black"
        >
          Viewing
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
