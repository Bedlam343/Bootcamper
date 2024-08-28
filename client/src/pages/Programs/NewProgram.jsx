import Checkbox from 'components/ui/Checkbox';
import Stepper from 'components/ui/Stepper';
import Stickers from 'components/ui/Stickers';
import TextField from 'components/ui/TextField';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const NewProgram = () => {
  const [errors, setErrors] = useState({
    photoError: '',
  });

  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const [careers, setCareers] = useState([]);

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

  const onExitPreview = () => {
    URL.revokeObjectURL(previewUrl);
    setPreviewImage(false);
    setPreviewUrl('');
  };

  const renderImagePreview = () => {
    if (!previewImage || !previewUrl) return false;
    return createPortal(
      <div
        onMIsse
        className="fixed w-[100%] h-[100%] top-0 z-50 left-0 bg-black 
      flex items-center justify-center bg-opacity-90"
      >
        <div className="w-[500px] flex flex-col items-center gap-10 h-auto">
          <div
            className="bold text-white text-2xl hover:cursor-pointer hover:underline"
            onClick={onExitPreview}
          >
            Exit Preview
          </div>
          <img src={previewUrl} alt="Selected" />
        </div>
      </div>,
      document.getElementById('overlays')
    );
  };

  return (
    <>
      <div className="flex flex-col items-center py-10">
        <div className="w-[450px]">
          <p className="font-cairo text-2xl text-white text-center">
            New Program
          </p>

          <Stepper step={1} numSteps={3} stepWidth={100} className="mt-8" />

          <form className="flex flex-col items-start mt-8 gap-6">
            <TextField id="name" label="Program Name" width={300} required />

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
                rows={5}
                className={`font-cairo outline-none mt-1 px-2 py-2 w-[100%] text-sm bg-easyWhite
                focus:bg-white`}
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
              <Stickers
                items={careers}
                maxItems={3}
                onAddItem={(career) =>
                  setCareers((currCareers) => [...currCareers, career])
                }
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
                <Checkbox
                  id="jobAssistance"
                  label="Job Assistance"
                  gap="gap-3"
                />
              </div>
            </div>

            <div>
              <label className="text-white block font-inter text-[16px]">
                Photo <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-4 mt-1 items-center">
                <input
                  id="photo"
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
                <p className="text-red-400 mt-1 font-cairo">
                  {errors.photoError}
                </p>
              )}
            </div>

            <div className={`flex w-[100%] mt-12 justify-end`}>
              <button
                type="submit"
                className={`min-w-[90px] bg-easyWhite hover:bg-white w-fit h-[40px] py-2 px-4 flex justify-center
              items-center rounded-[5px] font-cairo ease-linear duration-300`}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
      {renderImagePreview()}
    </>
  );
};

export default NewProgram;
