import { Outlet } from "react-router-dom";

import { AuthProvider } from "./AuthProvider";

const AuthContextLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AuthContextLayout;
