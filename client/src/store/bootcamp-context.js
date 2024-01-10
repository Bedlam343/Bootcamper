import React from "react";

const BootcampContext = React.createContext({
  bootcamp: {},
  setBootcamp: (bootcamp) => {},
  clearBootcamp: () => {},
});

export default BootcampContext;
