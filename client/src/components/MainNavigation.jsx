import React from 'react';
import Button from '@mui/material/Button';
import { NavLink, useSubmit } from 'react-router-dom';

import BootcampsDropdown from 'components/Bootcamp/Dropdown';
import { useAuth } from 'store/AuthProvider';

const MainNavigation = () => {
  const { isLoggedIn } = useAuth();
  const submit = useSubmit();

  const handleLogout = () => {
    submit({}, { method: 'POST' });
  };

  const loginOrLogoutButton = () => {
    if (isLoggedIn) {
      return (
        <Button onClick={handleLogout} color="inherit">
          Logout
        </Button>
      );
    }
    return (
      <Button color="inherit">
        <NavLink to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          Login
        </NavLink>
      </Button>
    );
  };

  return (
    <div className="w-full py-4 bg-[#000000] flex items-center justify-evenly">
      <div className="flex gap-2 items-center justify-center hover:cursor-pointer">
        <img
          src="./assets/hammer.png"
          alt="Codemason Logo"
          className="w-[55px]"
        />
        <p className="text-themeBlue text-4xl font-kellySlab">Codemasons</p>
      </div>
      <ul className="text-easyWhite font-cairo font-semibold flex justify-evenly text-md uppercase min-w-[600px]">
        <li className="hover:cursor-pointer hover:text-themeBlue">Programs</li>
        <li className="hover:cursor-pointer hover:text-themeBlue">Teach</li>
        <li className="hover:cursor-pointer hover:text-themeBlue">About</li>
      </ul>
      <button className="rounded-lg w-[120px] h-[50px] bg-themeOrange hover:bg-themeBlue flex items-center justify-center">
        <p className="text-white uppercase">Sign Up</p>
      </button>
    </div>
  );
};

export default MainNavigation;
