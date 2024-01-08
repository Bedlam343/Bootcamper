import { useContext, useReducer } from "react";

import AuthContext from "./auth-context";

const defaultAuthState = {
  isLoggedIn: false,
  id: "",
  name: "",
  email: "",
  role: "",
  token: "",
};

const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    if (!state.isLoggedIn) {
      return { ...state, isLoggedIn: true };
    }
  }
  if (action.type === "UPDATE") {
    const newState = {
      isLoggedIn: true,
      id: action.userData._id,
      name: action.userData.name,
      email: action.userData.email,
      role: action.userData.role,
    };
    return newState;
  }
  if (action.type === "UPDATE_TOKEN") {
    return { ...state, token: action.token };
  }
  if (action.type === "LOGOUT") {
    if (state.isLoggedIn) {
      return defaultAuthState;
    }
  }

  return defaultAuthState;
};

const AuthProvider = (props) => {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );

  const login = () => {
    dispatchAuthAction({ type: "LOGIN" });
  };

  const updateUserData = (userData) => {
    dispatchAuthAction({ type: "UPDATE", userData: userData });
  };

  const updateToken = (token) => {
    dispatchAuthAction({ type: "UPDATE_TOKEN", token: token });
  };

  const logoutUser = () => {
    dispatchAuthAction({ type: "LOGOUT" });
  };

  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    id: authState.id,
    firstName: authState.firstName,
    lastName: authState.lastName,
    email: authState.email,
    role: authState.role,
    token: authState.token,
    login,
    updateUserData,
    updateToken,
    logout: logoutUser,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export { AuthProvider, useAuth };
