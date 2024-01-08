import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  id: "",
  name: "",
  email: "",
  role: "",
  token: "",
  login: () => {},
  updateUserData: (userData) => {},
  updateToken: (token) => {},
  logout: () => {},
});

export default AuthContext;
