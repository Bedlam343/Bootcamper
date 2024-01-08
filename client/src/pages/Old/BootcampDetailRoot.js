import { Outlet, json } from "react-router-dom";
import { BACKEND_URL } from "../constants";

const BootcampDetailLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

async function loadBootcamp(bootcampId) {
  const response = await fetch(`${BACKEND_URL}/api/v1/bootcamps/${bootcampId}`);

  if (!response.ok) {
    throw json({ message: "Could not fetch bootcamp." }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData.data;
  }
}

async function loadCourses(bootcampId) {
  const response = await fetch(
    `${BACKEND_URL}/api/v1/bootcamps/${bootcampId}/courses`
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch courses for bootcamp." },
      { status: 500 }
    );
  } else {
    const responseData = await response.json();
    const courses = responseData.data;
    return courses;
  }
}

// get id of bootcamp from url
export async function loader({ params }) {
  const bootcampId = params.bootcampId;
  return {
    bootcamp: await loadBootcamp(bootcampId),
    courses: await loadCourses(bootcampId),
  };
}

export default BootcampDetailLayout;
