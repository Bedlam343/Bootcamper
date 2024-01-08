import { Outlet, defer, json } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const BootcampsRootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

async function loadBootcamps() {
  const response = await fetch(`${BACKEND_URL}/api/v1/bootcamps`);

  if (!response.ok) {
    throw json({ message: "Could not fetch bootcamps." }, { status: 500 });
  } else {
    const responseData = await response.json();
    const bootcamps = responseData.data;
    return bootcamps;
  }
}

export async function loader() {
  return defer({
    bootcamps: loadBootcamps(),
  });
}

export default BootcampsRootLayout;
