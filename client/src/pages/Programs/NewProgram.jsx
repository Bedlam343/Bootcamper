import ProgramDetails from 'components/Program/ProgramDetails';
import ProgramForm from 'components/Program/ProgramForm';
import Stepper from 'components/Stepper';
import Units from 'components/Unit/Units';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useActionData, useSubmit } from 'react-router-dom';
import { useAuth } from 'store/AuthProvider';

const NUM_STEPS = 3;

const NewProgram = () => {
  const [step, setStep] = useState(1);
  const [programFormData, setProgramFormData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [units, setUnits] = useState([]);
  const [creating, setCreating] = useState(false);

  const submit = useSubmit();
  const { token } = useAuth();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      setCreating(false);
    }
  }, [actionData]);

  const photo = programFormData?.get('photo');
  useEffect(() => {
    if (photo && typeof photo !== 'string') {
      console.log('creating object url of photo');
      setPhotoUrl(URL.createObjectURL(photo));
    }

    return () => URL.revokeObjectURL(photoUrl);
  }, [photo]);

  const program = useMemo(() => {
    if (!programFormData) return {};
    const programObject = Object.fromEntries(programFormData.entries());
    programObject.courses = units;
    programObject.careers = programObject.careers.split(',');
    programObject.photo = photoUrl;
    return programObject;
  }, [programFormData, units, photoUrl]);

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
      case 3:
        const formData = new FormData();
        formData.append(
          'program',
          JSON.stringify(Object.fromEntries(programFormData.entries()))
        );
        formData.append('photo', programFormData.get('photo'));
        formData.append('courses', JSON.stringify(units));
        formData.append('token', token);
        submit(formData, { method: 'POST', encType: 'multipart/form-data' });
        setCreating(true);
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
      <div className="min-w-[450px] max-w-[550px]">
        <p className="font-cairo text-3xl text-white text-center">
          New Program
        </p>

        <Stepper
          step={step}
          numSteps={NUM_STEPS}
          stepWidth={100}
          className="mt-8"
          finalButtonText={creating ? 'Creating...' : 'Create'}
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
            <>
              <div className="text-white font-cairo text-2xl mb-8">Preview</div>
              <ProgramDetails style={{ maxHeight: 500 }} program={program} />
            </>,
          ]}
          onIncrementStep={handleIncrementStep}
          onDecrementStep={handleDecrementStep}
        />
      </div>
    </div>
  );
};

export default NewProgram;
