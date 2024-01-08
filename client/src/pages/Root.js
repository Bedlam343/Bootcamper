import { Outlet, useActionData, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import MainNavigation from "components/MainNavigation";
import { useAuth } from "store/AuthProvider";
import { getMe } from "service";
import { CssBaseline } from "@mui/material";

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
      console.log("fetching user");
      fetchUser();
    }
  }, [token, isLoggedIn, updateUserData, updateToken]);

  useEffect(() => {
    if (isLogout === true) {
      localStorage.removeItem("token");
      logout();
    }
  }, [isLogout, logout]);

  return (
    <>
      <CssBaseline />
      <MainNavigation />
      <Outlet />
    </>
  );
};

export const loader = () => {
  const token = localStorage.getItem("token");
  return token;
};

export default Root;
