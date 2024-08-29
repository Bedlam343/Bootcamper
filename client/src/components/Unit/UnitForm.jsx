import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';
import { useRef, useState } from 'react';

const initialErrors = {};

const UnitForm = ({ onCancel, onConfirm, unit, units }) => {
  const [errors, setErrors] = useState({});
  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!titleRef.current.value) {
      setErrors((errs) => ({ ...errs, titleEmptyError: true }));
      titleRef.current.focus();
      return;
    }

    if (!descriptionRef.current.value) {
      setErrors((errs) => ({ ...errs, descriptionEmptyError: true }));
      descriptionRef.current.focus();
      return;
    }

    const duplicate = units.find((u) => u.title === titleRef.current.value);

    // if duplicate name
    if (duplicate && (!unit || duplicate._id !== unit._id)) {
      setErrors((errs) => ({ ...errs, titleDuplicateError: true }));
      titleRef.current.focus();
      return;
    }

    onConfirm(titleRef.current.value, descriptionRef.current.value, unit?._id);
  };

  return (
    <form
      onChange={() => setErrors({ ...initialErrors })}
      onSubmit={handleFormSubmit}
      className="border-2 border-white rounded-[10px] w-[500px] py-4 px-6 
flex flex-col items-start gap-y-8"
    >
      <p className="text-cairo text-white text-center w-[100%] text-xl">
        New Unit
      </p>

      <div className="w-[100%]">
        <TextField
          id="title"
          label="Title"
          width={300}
          required
          ref={titleRef}
          defaultValue={unit?.title}
          errorFill={errors.titleEmptyError}
          errorText={
            errors.titleDuplicateError ? 'Unit names must be unique.' : ''
          }
        />
        <div className="w-[100%] mt-6">
          <label
            htmlFor="description"
            className="text-white block font-inter text-[16px]"
          >
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            ref={descriptionRef}
            rows={5}
            defaultValue={unit?.description}
            className={`font-cairo outline-none mt-1 px-2 py-2 w-[100%] text-sm bg-easyWhite
${errors.descriptionEmptyError ? 'focus:bg-red-500' : 'focus:bg-white'}`}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 w-[100%]">
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
        <Button type="submit">{unit ? 'Save' : 'Add'}</Button>
      </div>
    </form>
  );
};

export default UnitForm;
