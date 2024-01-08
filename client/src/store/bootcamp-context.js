import React from "react";

const BootcampContext = React.createContext({
  bootcamps: [],
  addBootcamp: (bootcamp) => {},
  editBootcamp: (bootcampId, updatedBootcamp) => {},
  removeBootcamp: (bootcampId) => {},
});

export default BootcampContext;
