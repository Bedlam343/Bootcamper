import { Typography } from "@mui/material";
import CreateBootcamp from "components/Bootcamp/Create/CreateBootcamp";
import { useAuth } from "store/AuthProvider";
import { ADMIN, PUBLISHER, USER } from "util/constants";
import { createBootcamp, createCourse } from "service";
import { redirect } from "react-router-dom";

const NewBootcamp = () => {
  const { role } = useAuth();

  const render = () => {
    if (role === PUBLISHER || role === ADMIN) {
      return <CreateBootcamp />;
    }
    if (role === USER) {
      return (
        <Typography sx={{ margin: "1em" }} variant="h4">
          Only publisher accounts can create Bootcamps.
        </Typography>
      );
    }
    return (
      <Typography sx={{ margin: "1em" }} variant="h4">
        Please Log in with a publisher account to publish a Bootcamp.
      </Typography>
    );
  };

  return <>{render()}</>;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const { bootcamp, courses } = JSON.parse(formData.get("data"));
  const token = formData.get("token");

  try {
    let response = await createBootcamp(bootcamp, token);
    const bootcampId = response.data.data._id;

    for (const course of courses) {
      response = await createCourse(course, bootcampId, token);
    }

    return redirect(`/bootcamps/${bootcampId}`);
  } catch (error) {
    console.log(error);

    if (error.response.status === 400) {
      return error.response.data;
    }

    return {
      error: "Something went wrong. Please try again later.",
    };
  }
};

export default NewBootcamp;
