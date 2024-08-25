const Stepper = ({ step }) => {
  return (
    <div className="flex gap-2 mt-8 items-end">
      <div>
        {step === 1 && (
          <p className="text-easyWhite font-inter text-[14px]">Step 1 of 2</p>
        )}
        <div
          className={`h-[5px] w-[150px] ${
            step === 1 ? 'bg-themeBlue' : 'bg-gray-700'
          }`}
        />
      </div>
      <div>
        <div>
          {step === 2 && (
            <p className="text-easyWhite font-inter text-[14px]">Step 2 of 2</p>
          )}
          <div
            className={`h-[5px] w-[150px] 
          ${step === 2 ? 'bg-themeBlue' : 'bg-gray-700'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Stepper;
