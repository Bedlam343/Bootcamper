import { useReducer } from "react";
import BootcampContext from "./bootcamp-context";

const initialBootcamps = [];

const bootcampsReducer = (state, action) => {
  if (action.type === "ADD") {
    // add bootcamp if unique
    if (
      state.filter((bootcamp) => bootcamp._id === action.bootcamp._id)
        .length === 0
    ) {
      return [action.bootcamp, ...state];
    }
    return [...state];
  }
  if (action.type === "EDIT") {
  }
  if (action.type === "REMOVE") {
    // remove bootcamp with bootcampId and return new array
    return state.filter((bootcamp) => bootcamp._id !== action.bootcampId);
  }

  return initialBootcamps;
};

const BootcampProvider = (props) => {
  const [bootcampsState, dispatchBootcampsAction] = useReducer(
    bootcampsReducer,
    initialBootcamps
  );

  const addBootcamp = (bootcamp) => {
    dispatchBootcampsAction({ type: "ADD", bootcamp: bootcamp });
  };

  const editBootcamp = (bootcampId, updatedBootcamp) => {
    dispatchBootcampsAction({ type: "EDIT", bootcampId, updatedBootcamp });
  };

  const removeBootcamp = (bootcampId) => {
    dispatchBootcampsAction({ type: "DELETE", bootcampId: bootcampId });
  };

  const bootcampContext = {
    bootcamps: bootcampsState,
    addBootcamp,
    editBootcamp,
    removeBootcamp,
  };

  return (
    <BootcampContext.Provider value={bootcampContext}>
      {props.children}
    </BootcampContext.Provider>
  );
};

export default BootcampProvider;
