import { Outlet, defer, json } from "react-router-dom";

const BootcampsRootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

async function loadBootcamps() {
  const response = await fetch(`/api/v1/bootcamps`);

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
