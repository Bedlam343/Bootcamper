import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useActionData, useSubmit } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emptyError, setEmptyError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const submit = useSubmit();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData) {
      setLoggingIn(false);
    }
  }, [actionData]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    if (!email) {
      setEmptyError('email');
      emailRef.current.focus();
      return;
    }
    const password = data.get('password');
    if (!password) {
      setEmptyError('password');
      passwordRef.current.focus();
      return;
    }

    setLoggingIn(true);
    submit(data, { method: 'POST' });
  };

  return (
    <>
      <div className="bg-black pt-12 flex flex-col items-center">
        <img
          src="./assets/hammer.png"
          alt="Codemason Hammer"
          className="w-[80px] h-[80px] animate-hammer-swing"
        />
        <div className="mt-16">
          <p className="uppercase font-cairo text-white font-semibold text-4xl text-center">
            Sign In
          </p>

          <form
            className="mt-8 flex flex-col items-center gap-10"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="text-easyWhite block font-inter"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="text"
                ref={emailRef}
                className={`outline-none h-[40px] w-[250px] px-2 mt-1 bg-easyWhite
                ${
                  emptyError === 'email' ? 'focus:bg-red-500' : 'focus:bg-white'
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-easyWhite block font-inter"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                ref={passwordRef}
                className={`outline-none h-[40px] w-[250px] px-2 mt-1 bg-easyWhite
                ${
                  emptyError === 'password'
                    ? 'focus:bg-red-500'
                    : 'focus:bg-white'
                }`}
              />
            </div>

            {actionData?.error && (
              <p className="text-red-400 text-xl font-cairo">
                {actionData?.error}
              </p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className={`bg-[#585858] min-w-[90px] w-fit h-[40px] py-2 px-4 flex justify-center
              items-center mt-4 rounded-[5px] hover:bg-[#424242] 
              ${loggingIn ? 'hover:cursor-not-allowed' : ''}`}
            >
              <p className="uppercase text-easyWhite">
                {loggingIn ? 'Signing in...' : 'Sign In'}
              </p>
            </button>
          </form>

          <div className="flex justify-center mt-12">
            <NavLink
              to="/signup"
              className="uppercase underline underline-offset-4 text-white font-cairo text-center text-lg
          hover:text-themeBlue hover:text-xl"
            >
              New Member?
            </NavLink>
          </div>
        </div>

        <div
          className="mt-16 w-[100%] py-10 font-cairo text-[#7d7d7d] text-center 
          text-[12px] font-semibold px-8 border-t-[1px] border-[#292929]"
        >
          <p className="">Copyright @ 2024, Codemasons.</p>
          <p>Codemasons is licensed by the Accepted Rite of Codemasonry.</p>
        </div>
      </div>
    </>
  );
};

export default Login;
