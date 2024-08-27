import { useEffect, useRef } from 'react';

const Stepper = ({
  step,
  numSteps = 2,
  stepWidth = 150,
  stepHeight = 5,
  className = '',
  activeColor = 'themeBlue',
  inactiveColor = 'gray-700',
}) => {
  return (
    <div
      className={`grid grid-cols-${numSteps.toString()} w-[100%] items-end gap-2 ${className}`}
    >
      {Array.from({ length: numSteps }).map((_, index) => (
        <div key={index}>
          {step === index + 1 && (
            <p className="text-easyWhite font-inter text-[14px]">
              Step {index + 1} of {numSteps}
            </p>
          )}
          <div
            className={`h-[${stepHeight}px] ${
              step === index + 1 ? `bg-${activeColor}` : `bg-${inactiveColor}`
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default Stepper;
