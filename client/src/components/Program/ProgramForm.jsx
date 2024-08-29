import Checkbox from 'components/ui/Checkbox';
import Modal from 'modal/Modal';
import Stickers from 'components/ui/Stickers';
import TextField from 'components/ui/TextField';
import { forwardRef, useRef, useState } from 'react';

const initialErrors = {};

const ProgramForm = forwardRef(({ onSubmit, className = '' }, ref) => {
  const [errors, setErrors] = useState({
    ...initialErrors,
  });

  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const [careers, setCareers] = useState([]);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const careersRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedPhoto(file);
      if (errors.photoError) setErrors((errs) => ({ ...errs, photoError: '' }));
    } else {
      setErrors((errs) => ({ ...errs, photoError: 'Invalid file type.' }));
    }
  };

  const onPreviewImage = () => {
    setPreviewUrl(URL.createObjectURL(uploadedPhoto));
    setPreviewImage(true);
  };

  const renderImagePreview = () => {
    if (!previewImage || !previewUrl) return false;
    return (
      <Modal open={previewImage}>
        <div className="w-[500px] flex flex-col items-center gap-10 h-auto">
          <div
            className="bold text-white text-2xl hover:cursor-pointer hover:underline"
            onClick={onExitPreview}
          >
            Exit Preview
          </div>
          <img src={previewUrl} alt="Selected" />
        </div>
      </Modal>
    );
  };

  const onExitPreview = () => {
    URL.revokeObjectURL(previewUrl);
    setPreviewImage(false);
    setPreviewUrl('');
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();

    if (!nameRef.current.value) {
      nameRef.current.focus();
      setErrors((errs) => ({ ...errs, nameEmptyError: true }));
      return;
    }

    if (!descriptionRef.current.value) {
      descriptionRef.current.focus();
      setErrors((errs) => ({ ...errs, descriptionEmptyError: true }));
      return;
    }

    if (careers.length === 0) {
      careersRef.current.focus();
      setErrors((errs) => ({ ...errs, careersEmptyError: true }));
      return;
    }

    if (!uploadedPhoto) {
      setErrors((errs) => ({ ...errs, photoError: 'Please Upload an Image.' }));
      return;
    }

    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  };

  return (
    <>
      <p className="text-white font-cairo text-2xl">Program Details</p>
      <form
        ref={ref}
        onChange={() => setErrors({ ...initialErrors })}
        onSubmit={handleFormSubmission}
        className={`flex flex-col items-start gap-6 mt-8 ${className}`}
      >
        <TextField
          id="name"
          label="Program Name"
          ref={nameRef}
          width={300}
          errorFill={errors.nameEmptyError}
          required
        />

        <div className="w-[100%]">
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
            className={`font-cairo outline-none mt-1 px-2 py-2 w-[100%] text-sm bg-easyWhite
      ${errors.descriptionEmptyError ? 'focus:bg-red-500' : 'focus:bg-white'}`}
          />
        </div>

        <div className="flex justify-between items-end w-[100%]">
          <TextField id="address" label="Address" width={300} />
          <button
            type="button"
            className="text-white border-white border-2 rounded-[5px] 
    w-[80px] h-[40px] ease-in-out duration-300 hover:border-themeBlue hover:text-themeBlue"
          >
            Locate
          </button>
        </div>

        <div className="w-[100%]">
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
          />
          <Stickers
            items={careers}
            ref={careersRef}
            error={errors.careersEmptyError}
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

        <div className="w-[100%]">
          <label className="text-white block font-inter text-[16px]">
            Benefits
          </label>
          <div className="mt-1 flex justify-between w-[100%] gap-8">
            <Checkbox id="housing" label="Housing" gap="gap-3" />
            <Checkbox id="jobGuarantee" label="Job Guarantee" gap="gap-3" />
            <Checkbox id="jobAssistance" label="Job Assistance" gap="gap-3" />
          </div>
        </div>

        <div>
          <label className="text-white block font-inter text-[16px]">
            Image <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-4 mt-1 items-center">
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <label
              className="text-white text-[14px] border-white border-2 rounded-[5px] 
      w-[85px] h-[35px] ease-in-out duration-300 hover:border-themeBlue
     hover:text-themeBlue hover:cursor-pointer flex items-center justify-center"
              htmlFor="photo"
            >
              {!uploadedPhoto ? 'Upload' : 'Re-Upload'}
            </label>

            {!uploadedPhoto ? (
              <p className="text-[#959595] text-[14px] italic font-cairo">
                No Image Uploaded.
              </p>
            ) : (
              <div
                onClick={onPreviewImage}
                className="text-white text-[15px] hover:underline 
        hover:cursor-pointer font-cairo"
              >
                {uploadedPhoto.type}
              </div>
            )}
          </div>
          {errors.photoError && (
            <p className="text-red-400 mt-1 font-cairo">{errors.photoError}</p>
          )}
        </div>

        <button className="hidden" type="submit" />
      </form>

      {renderImagePreview()}
    </>
  );
});

export default ProgramForm;
