import { NavLink } from 'react-router-dom';

const Teach = () => {
  return (
    <div className="flex flex-col items-center pt-12">
      <img
        src="./assets/hammer.png"
        alt="Codemason Hammer"
        className="w-[80px] h-[80px] animate-hammer-swing"
      />
      <p className="font-cairo text-xl mt-8 text-white max-w-[500px] text-center italic">
        "A good <span className="text-themeBlue">teacher</span> can be the{' '}
        <span className="text-themeBlue">difference</span> between{' '}
        <span className="text-themeBlue">enlightenment</span> and{' '}
        <span className="text-themeBlue">ignorance</span>..."
      </p>

      <div className="mt-16 flex flex-col items-center gap-4">
        <p className="text-easyWhite text-xl font-cairo uppercase">
          Your Programs
        </p>
        <div className="px-10 py-6 bg-lightBlack flex items-center justify-center">
          <p className="text-gray-200 font-cairo">
            You have no uploaded programs at the moment...
          </p>
        </div>
      </div>

      <NavLink to="/new-program">
        <button
          className="mt-10 uppercase font-cairo text-sm text-white border-2 
        border-white hover:border-themeBlue hover:text-themeBlue 
          rounded-[5px] px-4 py-2 ease-in-out duration-300"
        >
          New Program
        </button>
      </NavLink>
    </div>
  );
};

export default Teach;
