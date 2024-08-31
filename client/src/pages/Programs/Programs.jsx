import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { queryClient } from 'queryClient';
import Filters from 'components/Program/Filters';
import { getBootcamps } from 'service';
import ProgramList from 'components/Program/ProgramList';
import { useEffect, useRef, useState } from 'react';
import ProgramDetails from 'components/Program/ProgramDetails';

const Programs = () => {
  const programsDivRef = useRef();
  const filtersDivRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const programs = useLoaderData();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [programDivHeight, setProgramDivHeight] = useState(645);

  useEffect(() => {
    handleProgramClick(location.hash?.split('#')[1] || programs[0].id);
  }, [location.hash]);

  const handleProgramClick = (programId) => {
    if (selectedProgram && programId === selectedProgram.id) return;
    setSelectedProgram(programs.find((program) => program.id === programId));
    navigate(`/programs#${programId}`);
  };

  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateWindowHeight);

    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  // update div to extend to the bottom of the page
  useEffect(() => {
    if (!filtersDivRef?.current) return;
    setProgramDivHeight(
      windowHeight - filtersDivRef.current.getBoundingClientRect().bottom - 10
    );
  }, [windowHeight]);

  if (!selectedProgram) return null;

  return (
    <div className="">
      <Filters ref={filtersDivRef} />
      <div
        ref={programsDivRef}
        style={{ maxHeight: programDivHeight }}
        className="flex justify-center gap-4 py-8"
      >
        <ProgramList
          programs={programs}
          onProgramClick={handleProgramClick}
          selectedProgramId={selectedProgram.id}
        />

        <ProgramDetails program={selectedProgram} />
      </div>
    </div>
  );
};

export const loader = async () => {
  const bootcamps = await queryClient.fetchQuery({
    queryKey: ['bootcamps'],
    queryFn: () => getBootcamps({ limit: 10 }),
  });
  return bootcamps;
};

export default Programs;
