import ProgramForm from 'components/Program/ProgramForm';
import Stepper from 'components/Stepper';
import Units from 'components/Unit/Units';
import { useRef, useState } from 'react';

const NUM_STEPS = 2;

const NewProgram = () => {
  const [step, setStep] = useState(1);
  const [programFormData, setProgramFormData] = useState(null);
  const [units, setUnits] = useState([]);

  const programFormRef = useRef();
  const unitsFormRef = useRef();
  const unitsFormSubmitRef = useRef();
  const unitsFormPersistRef = useRef();

  const handleIncrementStep = () => {
    switch (step) {
      case 1:
        programFormRef.current.requestSubmit();
        break;
      case 2:
        unitsFormSubmitRef.current.requestSubmit();
        break;
      default:
        break;
    }
  };

  const handleDecrementStep = () => {
    switch (step) {
      case 2:
        unitsFormPersistRef.current.requestSubmit();
        break;
      case 3:
        setStep(step - 1);
        break;
      default:
        break;
    }
  };

  const onProgramFormSubmit = (formData) => {
    setProgramFormData(formData);
    setStep(step + 1);
  };

  const onUnitsFormSubmit = (newUnits) => {
    setUnits(newUnits);
    setStep(step + 1);
  };

  const onUnitsFormPersist = (newUnits) => {
    setUnits(newUnits);
    setStep(step - 1);
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
          finalButtonText="Finish"
          content={[
            <ProgramForm
              programFormData={programFormData}
              ref={programFormRef}
              onSubmit={onProgramFormSubmit}
            />,
            <Units
              units={units}
              ref={unitsFormRef}
              formSubmissionRef={unitsFormSubmitRef}
              formPersistanceRef={unitsFormPersistRef}
              onSubmit={onUnitsFormSubmit}
              onPersist={onUnitsFormPersist}
            />,
          ]}
          onIncrementStep={handleIncrementStep}
          onDecrementStep={handleDecrementStep}
        />
      </div>
    </div>
  );
};

export default NewProgram;
