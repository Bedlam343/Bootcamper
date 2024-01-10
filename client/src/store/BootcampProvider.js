import { useContext, useReducer } from "react";
import BootcampContext from "./bootcamp-context";

const defaultState = {};

const bootcampsReducer = (state, action) => {
  if (action.type === "SET") {
    return action.bootcamp;
  }

  if (action.type === "CLEAR") {
    return defaultState;
  }

  return defaultState;
};

const BootcampProvider = (props) => {
  const [bootcamp, dispatchBootcampAction] = useReducer(
    bootcampsReducer,
    defaultState
  );

  const setBootcamp = (bootcamp) => {
    dispatchBootcampAction({ type: "SET", bootcamp: bootcamp });
  };

  const clearBootcamp = () => {
    dispatchBootcampAction({ type: "CLEAR" });
  };

  const bootcampContext = {
    bootcamp,
    setBootcamp,
    clearBootcamp,
  };

  return (
    <BootcampContext.Provider value={bootcampContext}>
      {props.children}
    </BootcampContext.Provider>
  );
};

const useBootcamp = () => {
  const bootcampContext = useContext(BootcampContext);
  return bootcampContext;
};

export { BootcampProvider, useBootcamp };
