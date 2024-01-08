import { NavLink, Outlet } from "react-router-dom";
import NewButton from "common/NewButton";

const BootcampsRoot = () => {
  return (
    <>
      <NavLink to="/bootcamps/new">
        <NewButton tooltip="New Bootcamp" />
      </NavLink>
      <Outlet />
    </>
  );
};

export default BootcampsRoot;
