import ProgramForm from 'components/Program/ProgramForm';
import Stepper from 'components/ui/Stepper';

const NewProgram = () => {
  const onProgramFormSubmit = (formData) => {
    console.log(formData.get('photo'));
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-[450px]">
        <p className="font-cairo text-2xl text-white text-center">
          New Program
        </p>

        <Stepper step={1} numSteps={3} stepWidth={100} className="mt-8" />

        <ProgramForm onSubmit={onProgramFormSubmit} />
      </div>
    </div>
  );
};

export default NewProgram;
