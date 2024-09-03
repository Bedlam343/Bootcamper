import { Outlet, useActionData, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MainNavigation from 'components/MainNavigation';
import { useAuth } from 'store/AuthProvider';
import { getMe } from 'service';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  const token = useLoaderData();
  const isLogout = useActionData();
  const { logout, updateUserData, updateToken, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe(token);
        updateUserData(response.data.data);
        updateToken(token);
      } catch (error) {
        console.log(error);
      }
    };

    if (token && !isLoggedIn) {
      fetchUser();
    }
  }, [token, isLoggedIn, updateUserData, updateToken]);

  useEffect(() => {
    if (isLogout === true) {
      localStorage.removeItem('token');
      logout();
    }
  }, [isLogout, logout]);

  return (
    <>
      <MainNavigation />

      <main>
        <Outlet />
      </main>

      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-center"
        theme="colored"
        pauseOnHover={false}
      />
    </>
  );
};

export const loader = () => {
  const token = localStorage.getItem('token');
  return token;
};

export default Root;
