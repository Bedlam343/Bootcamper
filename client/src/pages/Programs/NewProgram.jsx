import ProgramForm from 'components/Program/ProgramForm';
import Stepper from 'components/Stepper';
import Units from 'components/Unit/Units';
import { useRef, useState } from 'react';

const NUM_STEPS = 3;

const NewProgram = () => {
  const [step, setStep] = useState(1);
  const [programFormData, setProgramFormData] = useState(null);

  const programFormRef = useRef();

  const handleIncrementStep = () => {
    switch (step) {
      case 1:
        programFormRef.current.requestSubmit();
        break;
      default:
        break;
    }
  };

  const handleDecrementStep = () => {};

  const onProgramFormSubmit = (formData) => {
    setProgramFormData(formData);
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-[450px]">
        <p className="font-cairo text-3xl text-white text-center">
          New Program
        </p>

        <Stepper
          step={step}
          numSteps={NUM_STEPS}
          stepWidth={100}
          className="mt-8"
          content={[
            <ProgramForm ref={programFormRef} onSubmit={onProgramFormSubmit} />,
            <Units />,
          ]}
          onIncrementStep={handleIncrementStep}
          onDecrementStep={handleDecrementStep}
        />
      </div>
    </div>
  );
};

export default NewProgram;
