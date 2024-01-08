import { Outlet } from "react-router-dom";

import BootcampProvider from "./BootcampProvider";

const BootcampContextLayout = () => {
  return (
    <BootcampProvider>
      <Outlet />
    </BootcampProvider>
  );
};

export default BootcampContextLayout;
