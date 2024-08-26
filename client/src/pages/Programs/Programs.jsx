import { useLoaderData } from 'react-router-dom';
import { queryClient } from 'queryClient';
import Filters from 'components/Program/Filters';
import { getBootcamps } from 'service';
import ProgramList from 'components/Program/ProgramList';
import { useState } from 'react';
import ProgramDetails from 'components/Program/ProgramDetails';

const Programs = () => {
  const programs = useLoaderData();
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);

  const handleProgramClick = (programId) => {
    if (programId === selectedProgram.id) return;
    setSelectedProgram(programs.find((program) => program.id === programId));
  };

  console.log(selectedProgram);

  return (
    <div className="">
      <Filters />
      <div className="flex justify-center gap-4 pt-10">
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
