import { Outlet } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";

const RootLayout = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    const updateAuthContext = () => {
      const userData = {
        _id: localStorage.getItem("_id"),
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
      };
      authContext.login(userData);
    };

    if (localStorage.getItem("token")) {
      updateAuthContext();
    }
  }, []);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
