import ProgramCard from './ProgramCard';

const ProgramList = ({
  programs,
  selectedProgramId,
  onProgramClick,
  horizontal = false,
}) => {
  return (
    <div
      className={`flex ${
        horizontal
          ? 'overflow-auto pb-4 gap-8'
          : 'flex-col items-center overflow-y-scroll gap-4 px-4'
      }`}
    >
      {programs.map((program) => (
        <ProgramCard
          key={program.id}
          program={program}
          onClick={onProgramClick}
          selected={selectedProgramId === program.id}
        />
      ))}
    </div>
  );
};

export default ProgramList;
