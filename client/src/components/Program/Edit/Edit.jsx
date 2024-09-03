import Button from 'components/ui/Button';
import Checkbox from 'components/ui/Checkbox';
import Stickers from 'components/ui/Stickers';
import TextField from 'components/ui/TextField';
import { useRef, useState } from 'react';

const Title = ({ children }) => {
  return (
    <p className="text-white text-2xl font-cairo mb-6 text-center">
      {children}
    </p>
  );
};

const Edit = ({ program, fields, onCancel, onSave }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [careers, setCareers] = useState(program.careers || []);
  const [errors, setErrors] = useState(null);
  const careersRef = useRef();

  const handleSave = () => {
    const newData = {};
    for (const field of fields) {
      const input = document.getElementById(field);
      if (input) {
        if (
          !input.value &&
          field !== 'jobGuarantee' &&
          field !== 'jobAssistance'
        ) {
          field === 'careers' ? careersRef.current.focus() : input.focus();
          setErrors((errs) => ({ ...errs, [field]: true }));
          return;
        } else {
          // data is valid
          newData[field] =
            field === 'careers' ? input.value.split(',') : input.value;
        }
      } else {
        console.log('input not found');
      }
    }

    onSave({ ...program, ...newData });
    setIsSaving(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const render = () => {
    return fields.map((field) => {
      switch (field) {
        case 'name':
          return (
            <TextField
              key={field}
              id={field}
              width={300}
              defaultValue={program.name}
              label="Name"
              errorFill={errors?.[field]}
              required
            />
          );
        case 'averageCost':
          return (
            <TextField
              key={field}
              defaultValue={program.averageCost}
              id={field}
              label="Average Cost ($1000 - $10,000)"
              type="number"
              min="1000"
              max="10000"
              width={300}
              errorFill={errors?.[field]}
              required
            />
          );

        case 'jobGuarantee':
          return (
            <div key={field} className="w-[100%]">
              <label className="text-white block font-inter text-[16px]">
                Benefits
              </label>
              <div className="mt-1 flex w-[100%] gap-14">
                <Checkbox
                  id="jobGuarantee"
                  label="Job Guarantee"
                  gap="gap-3"
                  defaultChecked={program.jobGuarantee}
                />
                <Checkbox
                  id="jobAssistance"
                  label="Job Assistance"
                  gap="gap-3"
                  defaultChecked={program.jobAssistance}
                />
              </div>
            </div>
          );

        case 'weeks':
          return (
            <TextField
              key={field}
              defaultValue={
                program.weeks ||
                program.courses.reduce(
                  (acc, course) => acc + Number(course.weeks),
                  0
                )
              }
              id={field}
              label="Duration (weeks)"
              type="number"
              min="1"
              width={300}
              errorFill={errors?.[field]}
              required
            />
          );
        case 'description':
          return (
            <div key={field}>
              <label
                htmlFor="description"
                className="text-white block font-inter text-[16px]"
              >
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={program.description}
                rows={5}
                className={`font-cairo outline-none mt-1 px-2 py-2 w-[100%] text-sm bg-easyWhite
      ${errors?.description ? 'focus:bg-red-500' : 'focus:bg-white'}`}
              />
            </div>
          );
        case 'careers':
          return (
            <div key={field} className="w-[100%]">
              <label
                htmlFor="careers"
                className="text-white block font-inter text-[16px]"
              >
                Tags (1-3) <span className="text-red-400">*</span>
              </label>
              <input
                className="hidden"
                name="careers"
                id="careers"
                value={careers}
                readOnly
              />
              <Stickers
                items={careers}
                ref={careersRef}
                error={errors?.careers}
                maxItems={3}
                onAddItem={(career) => {
                  setCareers((currCareers) => [...currCareers, career]);
                  setErrors((errs) => ({ ...errs, careersEmptyError: false }));
                }}
                onRemoveItem={(careerToRemove) =>
                  setCareers((currCareers) => {
                    return currCareers.filter(
                      (career) => career !== careerToRemove
                    );
                  })
                }
              />
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      onChange={() => setErrors(null)}
      className="flex flex-col bg-black 
    px-6 py-4 border-2 border-white rounded-[10px] w-[500px]"
    >
      <Title>Edit</Title>
      <div className="flex flex-col gap-6">{render()}</div>
      <div className="flex justify-end gap-4 w-[100%] mt-8">
        <Button type="button" onClick={onCancel} danger>
          Cancel
        </Button>
        <Button type="button" onClick={handleSave}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default Edit;
