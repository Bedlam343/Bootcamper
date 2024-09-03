import ProgramCard from './ProgramCard';

const ProgramList = ({
  programs,
  selectedProgramId,
  onProgramClick,
  equalHeight,
  orientation = 'vertical',
}) => {
  let style = 'flex flex-col items-center overflow-y-scroll gap-4 px-4';
  if (orientation === 'horizontal') {
    style = 'flex overflow-auto pb-4 gap-8';
  } else if (orientation === 'grid') {
    style = 'grid grid-cols-2';
  }

  return (
    <div className={`${style}`}>
      {programs.map((program) => (
        <ProgramCard
          key={program.id}
          program={program}
          onClick={onProgramClick}
          selected={selectedProgramId === program.id}
          equalHeight={equalHeight}
        />
      ))}
    </div>
  );
};

export default ProgramList;
