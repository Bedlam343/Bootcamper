import { useState } from 'react';

const Stepper = ({
  step,
  numSteps = 2,
  stepWidth = 150,
  stepHeight = 5,
  className = '',
  content,
  finalButtonText = 'Done',
  onIncrementStep,
  onDecrementStep,
}) => {
  const onIncrement = () => {
    onIncrementStep();
  };

  const onDecrement = () => {
    onDecrementStep();
  };

  return (
    <>
      <div
        className={`grid grid-cols-${numSteps} w-[100%] items-end gap-2 ${className}`}
      >
        {Array.from({ length: numSteps }).map((_, index) => (
          <div key={index}>
            {step === index + 1 && (
              <p className="text-easyWhite font-inter text-[14px]">
                Step {index + 1} of {numSteps}
              </p>
            )}
            <div
              className={`h-[5px] ${
                step === index + 1 ? `bg-themeBlue` : `bg-gray-700`
              }`}
            />
          </div>
        ))}
      </div>

      <div className="mt-8">{content[step - 1]}</div>

      <div
        className={`flex w-[100%] mt-12 ${
          step > 1 ? 'justify-between' : 'justify-end'
        }`}
      >
        {step > 1 && (
          <button
            type="button"
            onClick={onDecrement}
            className={`min-w-[90px] bg-gray-400 hover:bg-gray-300 w-fit h-[40px] py-2 px-4 flex justify-center
    items-center rounded-[5px] font-cairo ease-linear duration-300`}
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onIncrement}
          className={`min-w-[90px] bg-easyWhite hover:bg-white w-fit h-[40px] py-2 px-4 flex justify-center
    items-center rounded-[5px] font-cairo ease-linear duration-300`}
        >
          {step === numSteps ? finalButtonText : 'Next'}
        </button>
      </div>
    </>
  );
};

export default Stepper;
