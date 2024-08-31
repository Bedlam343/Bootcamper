import { NavLink, useLoaderData } from 'react-router-dom';
import { useAuth } from 'store/AuthProvider';
import MasonHammer from 'components/ui/MasonHammer';
import { queryClient } from 'queryClient';
import { getBootcamps } from 'service';
import ProgramList from 'components/Program/ProgramList';

const Teach = () => {
  const { isLoggedIn, role } = useAuth();
  const programs = useLoaderData();

  if (!isLoggedIn)
    return (
      <div className="flex flex-col items-center pt-12">
        <MasonHammer />
        <p className="text-white text-xl text-center max-w-[300px] pt-16 uppercase">
          Sign In with a <span className="text-themeBlue">Teacher account</span>{' '}
          to publish programs.
        </p>
        <NavLink to="/login">
          <button
            className={`bg-gray-700 mt-10 min-w-[90px] w-fit h-[40px] py-2 px-4 flex justify-center
              items-center rounded-[5px] hover:bg-gray-600`}
          >
            <p className="uppercase text-easyWhite">{'Sign In'}</p>
          </button>
        </NavLink>
      </div>
    );

  if (role !== 'publisher' && role !== 'admin') {
    return (
      <div className="flex flex-col items-center pt-12">
        <MasonHammer />
        <p className="text-white text-xl text-center max-w-[300px] pt-16 uppercase">
          Only <span className="text-themeBlue">Teacher accounts</span> can
          publish programs.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-12">
      <MasonHammer />
      <p className="font-cairo px-4 sm:px-0 sm:text-xl mt-8 text-white sm:max-w-[500px] text-center italic">
        "A good <span className="text-themeBlue">teacher</span> can be the{' '}
        <span className="text-themeBlue">difference</span> between{' '}
        <span className="text-themeBlue">enlightenment</span> and{' '}
        <span className="text-themeBlue">ignorance</span>..."
      </p>

      <div className="mt-10 sm:mt-12 flex flex-col items-center gap-4">
        <p className="text-easyWhite text-xl sm:text-2xl font-cairo uppercase">
          Your Programs
        </p>
        <div
          className={`w-[300px] sm:min-w-[500px] md:min-w-[680px] lg:min-w-[720px] ${
            programs ? 'bg-black mt-4 mb-2' : 'bg-lightBlack px-8 py-6'
          } flex items-center justify-center`}
        >
          {programs ? (
            <ProgramList
              programs={programs}
              horizontal
              onProgramClick={() => {}}
              equalHeight
            />
          ) : (
            <p className="text-gray-200 font-cairo">
              You have no uploaded programs at the moment...
            </p>
          )}
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

// fetch programs belonging to the user
export const loader = async ({ params }) => {
  const { userId } = params;
  const bootcamps = await queryClient.fetchQuery({
    queryKey: ['my-bootcamps'],
    queryFn: () => getBootcamps({ user: userId }),
  });
  return bootcamps;
};

export default Teach;
