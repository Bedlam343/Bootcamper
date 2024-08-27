import React, { useEffect, useRef, useState } from 'react';
import Checkbox from 'components/ui/Checkbox';
import Footer from 'components/ui/Footer';
import Stepper from 'components/ui/Stepper';
import TextField from 'components/ui/TextField';
import { useActionData, useSubmit } from 'react-router-dom';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [checkedId, setCheckedId] = useState('');
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
    emptyError: '',
    generalError: '',
  });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const serverErrors = useActionData();

  useEffect(() => {
    if (!serverErrors) return;
    setErrors((currErrors) => ({
      ...currErrors,
      emailError: serverErrors.emailError,
      generalError: serverErrors.generalError,
    }));
    setIsSigningUp(false);
  }, [serverErrors]);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submit = useSubmit();

  const forwardBtnDisabled = step === 1 && !checkedId;

  const handleCheckboxToggle = (event) => {
    setCheckedId(event.target.id);
  };

  const removeTextError = (event) => {
    if (errors.emptyError) {
      setErrors((currErrors) => ({ ...currErrors, emptyError: '' }));
    }
    if (event.target.id === 'email' && errors.emailError) {
      setErrors((currErrors) => ({ ...currErrors, emailError: '' }));
    } else if (event.target.id === 'password' && errors.passwordError) {
      setErrors((currErrors) => ({ ...currErrors, passwordError: '' }));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!name) {
      setErrors((currErrors) => ({ ...currErrors, emptyError: 'name' }));
      nameRef.current.focus();
      return;
    }
    if (!email) {
      setErrors((currErrors) => ({ ...currErrors, emptyError: 'email' }));
      emailRef.current.focus();
      return;
    }
    if (!password) {
      setErrors((currErrors) => ({ ...currErrors, emptyError: 'password' }));
      passwordRef.current.focus();
      return;
    }

    // validate email
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setErrors((currErrors) => ({
        ...currErrors,
        emailError: 'Invalid Email',
      }));
      return;
    }

    // validate password
    if (password.length < 6) {
      setErrors((currErrors) => ({
        ...currErrors,
        passwordError: 'Password must contain at least 6 characters',
      }));
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set('role', formData.get('checkbox1') ? 'publisher' : 'user');
    submit(formData, { method: 'POST' });
    setIsSigningUp(true);
  };

  return (
    <div className="pt-12 flex flex-col items-center">
      <img
        src="./assets/hammer.png"
        alt="Codemason Hammer"
        className="w-[80px] h-[80px] animate-hammer-swing"
      />

      <div className="mt-14 flex flex-col items-center">
        <p className="uppercase font-cairo text-white font-semibold text-4xl text-center">
          The Beginning...
        </p>

        <Stepper step={step} />

        <form
          className="mt-8 flex flex-col items-center w-[100%]"
          onSubmit={handleFormSubmit}
        >
          <div className={`w-[100%] ${step === 2 ? 'hidden' : ''}`}>
            <p className="text-white text-[20px] font-cairo">
              What do you want to do at Codemasons?
            </p>

            <div className="mt-4 flex flex-col gap-4 px-2 items-start">
              <Checkbox
                id="checkbox1"
                checked={checkedId === 'checkbox1'}
                onClick={handleCheckboxToggle}
                label="I want to Teach & Learn"
              />
              <Checkbox
                id="checkbox2"
                checked={checkedId === 'checkbox2'}
                onClick={handleCheckboxToggle}
                label="I only want to Learn"
              />
            </div>
          </div>

          {step === 2 && (
            <div className="w-[100%]">
              <p className="text-white text-[20px]">
                Create {checkedId === 'checkbox1' ? 'Teacher' : 'Student'}{' '}
                Account
              </p>

              <div className="mt-6 flex flex-col gap-5">
                <TextField
                  id="name"
                  label="Name"
                  errorFill={errors.emptyError === 'name'}
                  onChange={removeTextError}
                  ref={nameRef}
                />
                <TextField
                  id="email"
                  label="Email"
                  errorFill={errors.emptyError === 'email'}
                  errorText={errors.emailError}
                  onChange={removeTextError}
                  ref={emailRef}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  errorFill={errors.emptyError === 'password'}
                  errorText={errors.passwordError}
                  onChange={removeTextError}
                  ref={passwordRef}
                />
              </div>
            </div>
          )}

          {step === 2 && serverErrors?.generalError && (
            <p className="mt-8 font-cairo text-red-400">
              {serverErrors?.generalError}
            </p>
          )}

          {/* buttons */}
          <div
            className={`flex w-[100%] mt-12 ${
              step === 1 ? 'justify-end' : 'justify-between'
            }`}
          >
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className={`min-w-[90px] w-fit h-[40px] py-2 px-4 flex justify-center
              items-center rounded-[5px] border-[1px] border-[#646464] hover:border-[#a4a4a4]`}
              >
                <p className="text-white">Back</p>
              </button>
            )}

            <button
              type="submit"
              disabled={forwardBtnDisabled}
              className={`min-w-[90px] w-fit h-[40px] py-2 px-4 flex justify-center
              items-center rounded-[5px]  
              ${
                forwardBtnDisabled
                  ? 'bg-[#5a5a5a] hover:cursor-not-allowed'
                  : 'bg-white hover:bg-[#d2d2d2]'
              }`}
            >
              {step === 1 ? 'Next' : isSigningUp ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
