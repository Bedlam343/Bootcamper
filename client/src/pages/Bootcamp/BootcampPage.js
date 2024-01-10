import { useLoaderData } from "react-router-dom";

import { deleteBootcamp, getBootcamp, getCoursesForBootcamp } from "service";
import { useAuth } from "store/AuthProvider";
import { useBootcamp } from "store/BootcampProvider";
import BootcampDetails from "components/Bootcamp/BootcampDetails";
import { useEffect } from "react";

const BootcampPage = () => {
  const { bootcamp, courses } = useLoaderData();
  const { id, role } = useAuth();
  const { setBootcamp } = useBootcamp();

  useEffect(() => {
    setBootcamp(bootcamp);
  }, [bootcamp]);

  const canEdit = role === "admin" || id === bootcamp.user;

  return (
    <BootcampDetails bootcamp={bootcamp} courses={courses} canEdit={canEdit} />
  );
};

const loadBootcamp = async (bootcampId) => {
  let bootcamp = null;
  try {
    const response = await getBootcamp(bootcampId);
    bootcamp = response.data.data;
  } catch (error) {
    console.log(error);
  }
  return bootcamp;
};

const loadCourses = async (bootcampId) => {
  let courses = null;
  try {
    const response = await getCoursesForBootcamp(bootcampId);
    courses = response.data.data;
  } catch (error) {
    console.log(error);
  }
  return courses;
};

export const loader = async ({ params }) => {
  const bootcampId = params.bootcampId;
  return {
    bootcamp: await loadBootcamp(bootcampId),
    courses: await loadCourses(bootcampId),
  };
};

export const action = async ({ request, params }) => {
  const bootcampId = params.bootcampId;
  const formData = await request.formData();
  const token = formData.get("token");

  try {
    await deleteBootcamp(bootcampId, token);
    return null;
  } catch (error) {
    console.log(error);
  }
};

export default BootcampPage;
