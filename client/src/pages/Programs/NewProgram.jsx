import Stepper from 'components/ui/Stepper';
import Stickers from 'components/ui/Stickers';
import TextField from 'components/ui/TextField';
import { useState } from 'react';

const NewProgram = () => {
  const [careers, setCareers] = useState([]);

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="w-[450px]">
        <p className="font-cairo text-2xl text-white text-center">
          New Program
        </p>

        <Stepper step={1} numSteps={3} stepWidth={100} className="mt-8" />

        <form className="flex flex-col items-start mt-8 gap-6">
          <TextField id="name" label="Program Name" width={300} />

          <div className="w-[100%]">
            <label
              htmlFor="description"
              className="text-white block font-inter text-[14px]"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              className={`font-cairo outline-none mt-1 px-2 py-2 w-[100%] text-sm bg-easyWhite
                focus:bg-white`}
            />
          </div>

          <div className="flex justify-between w-fit gap-10 items-end">
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
              className="text-white block font-inter text-[14px]"
            >
              Tags (1-3)
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

          <div className={`flex w-[100%] mt-12 justify-end`}>
            <button
              type="button"
              className={`min-w-[90px] bg-easyWhite hover:bg-white w-fit h-[40px] py-2 px-4 flex justify-center
              items-center rounded-[5px] font-cairo ease-linear duration-300`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProgram;
