import React, { useEffect, useState } from 'react';
import { NavLink, useSubmit } from 'react-router-dom';
import { useAuth } from 'store/AuthProvider';

const MainNavigation = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isLoggedIn } = useAuth();
  const submit = useSubmit();

  // update state when window size changes
  useEffect(() => {
    const updateWindowWith = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWith);

    return () => window.removeEventListener('resize', updateWindowWith);
  }, []);

  const handleLogout = () => {
    submit({}, { method: 'POST' });
  };

  return (
    <div
      className="w-full py-3 pl-6 pr-10 sm:px-0 sm:py-4 bg-[#000000] 
      flex items-center justify-between sm:justify-evenly"
    >
      <NavLink to="/">
        <div className="flex gap-2 items-center justify-center hover:cursor-pointer">
          <img
            src="./assets/hammer.png"
            alt="Codemason Logo"
            className="w-[40px] sm:w-[45px] lg:w-[55px]"
          />
          <p className="text-themeBlue text-2xl lg:text-4xl font-kellySlab">
            Codemasons
          </p>
        </div>
      </NavLink>

      {windowWidth >= 768 ? (
        // List of Links
        <>
          <ul className="text-easyWhite font-cairo font-semibold flex justify-evenly text-md uppercase min-w-[350px] lg:min-w-[450px] xl:min-w-[600px]">
            <li className="hover:cursor-pointer hover:text-themeBlue text-[14px]  lg:text-[16px]">
              <NavLink to="/programs">Learn</NavLink>
            </li>
            <li className="hover:cursor-pointer hover:text-themeBlue text-[14px]  lg:text-[16px]">
              <NavLink to="/my">Teach</NavLink>
            </li>
            <li className="hover:cursor-pointer hover:text-themeBlue text-[14px]  lg:text-[16px]">
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white uppercase rounded-lg w-[90px] lg:w-[120px] 
            h-[45px] lg:h-[50px] bg-themeOrange hover:bg-themeBlue 
            flex items-center justify-center"
            >
              Log out
            </button>
          ) : (
            <NavLink to="/login">
              <button
                className="text-white uppercase rounded-lg w-[90px] lg:w-[120px] 
          h-[45px] lg:h-[50px] bg-themeOrange hover:bg-themeBlue 
          flex items-center justify-center"
              >
                Sign up
              </button>
            </NavLink>
          )}
        </>
      ) : (
        // Dropdown
        <div className="flex flex-col gap-1 hover:cursor-pointer">
          <div className="w-[20px] h-[2px] bg-white" />
          <div className="w-[20px] h-[2px] bg-white" />
          <div className="w-[20px] h-[2px] bg-white" />
        </div>
      )}
    </div>
  );
};

export default MainNavigation;
