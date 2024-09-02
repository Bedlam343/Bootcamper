const Careers = ({ careers = [] }) => {
  return (
    <div className="font-cairo flex flex-wrap gap-x-2 text-gray-200">
      {careers.map((career, index) => (
        <div key={career} className="flex justify-center gap-2 items-center">
          <p className="">{career}</p>
          {index < careers.length - 1 && (
            <div className="w-[4px] h-[4px] rounded-full bg-[#cbcbcb]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Careers;
