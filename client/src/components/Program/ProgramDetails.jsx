import UnitList from 'components/Unit/UnitList';

const ProgramDetails = ({ program, style = {}, editable }) => {
  if (!program) return null;

  console.log(program);

  const programDuration =
    program.weeks ||
    program.courses.reduce((acc, course) => acc + Number(course.weeks), 0);

  return (
    <div
      style={{ ...style }}
      className="sm:max-w-[750px] overflow-y-scroll bg-lightBlack"
    >
      <img
        src={program.photo}
        alt=""
        className="w-[100%] h-[300px] object-cover"
      />

      <div className="px-8 py-8">
        <p className="text-4xl text-white font-cairo">{program.name}</p>

        {/* <div className="mt-1 flex gap-x-3 items-center">
          <img
            src="./assets/location.png"
            alt="Location"
            className="h-[20px] w-[20px]"
          />
          <p className="text-gray-400 font-cairo">
            {program.location.formattedAddress}
          </p>
        </div> */}

        <div className="flex mt-4 gap-x-3 items-center">
          <img
            src="./assets/target.png"
            alt="Location"
            className="h-[20px] w-[20px]"
          />
          <div className="font-cairo flex flex-wrap gap-x-2 text-gray-200">
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

        <div className="flex gap-x-3 items-center">
          <img
            src="./assets/cash.png"
            alt="Location"
            className="h-[20px] w-[20px]"
          />
          <p className="text-gray-200 font-cairo">
            Average Cost: ${program.averageCost}
          </p>
        </div>

        <div className="flex gap-x-3 items-center">
          <img
            src="./assets/calendar.png"
            alt="Location"
            className="h-[20px] w-[20px]"
          />
          <p className="text-gray-200 font-cairo">
            Duration: {programDuration} weeks
          </p>
        </div>

        <div className="mt-8">
          <p className="text-2xl font-cairo text-white">Description</p>
          <p className="font-cairo text-gray-300 mt-1">{program.description}</p>
        </div>

        <div className="mt-8">
          <p className="text-2xl font-cairo text-white">Course Breakdown</p>

          <div className="w-[100%] flex justify-center mt-8">
            <div className="w-[80%] flex flex-col gap-y-6">
              <UnitList units={program.courses} editable={editable} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
