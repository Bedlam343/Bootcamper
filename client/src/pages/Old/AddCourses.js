import {
  json,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import Button from "../util/UI/Button";
import classes from "./AddCourses.module.css";
import CourseForm from "../components/Course/CourseForm";
import { useState } from "react";
import CourseItemList from "../components/Course/CourseItemList";
import { BACKEND_URL } from "../constants";

const AddCoursesPage = () => {
  let courses = useLoaderData();
  courses = courses ? courses : [];
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const navigate = useNavigate();
  const submit = useSubmit();

  const toggleAddCourseHandler = () => {
    if (isAddingCourse) {
      return;
    }
    setIsAddingCourse(true);
  };

  const finishHandler = () => {
    if (courses.length === 0) {
      window.alert("Must insert at least one course!");
      return;
    } else {
      navigate("/bootcamps");
    }
  };

  const discardNewCourseHandler = () => {
    setIsAddingCourse(false);
  };

  const addNewCourseHandler = (newCourse) => {
    const formData = new FormData();
    formData.append("method", "POST");
    formData.append("course", JSON.stringify(newCourse));
    submit(formData, { method: "post" });
    setIsAddingCourse(false);
  };

  const updateCourseHandler = (updatedCourse) => {
    const formData = new FormData();
    formData.append("method", "UPDATE");
    formData.append("course", JSON.stringify(updatedCourse));
    submit(formData, { method: "post" });
  };

  const removeCourseHandler = (courseId) => {
    const formData = new FormData();
    formData.append("method", "DELETE");
    formData.append("courseId", courseId);
    submit(formData, { method: "post" });
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <h1>Bootcamp Created!</h1>
        <h2>Add Courses</h2>
        <div className={classes.buttons}>
          <Button onClick={toggleAddCourseHandler}>Add +</Button>
          <Button onClick={finishHandler}>Finish</Button>
        </div>
      </div>
      {isAddingCourse && (
        <div className={classes.formContainer}>
          <CourseForm
            new={true}
            onSave={addNewCourseHandler}
            onDiscard={discardNewCourseHandler}
          />
        </div>
      )}
      <CourseItemList
        editable={true}
        courses={courses}
        onUpdate={updateCourseHandler}
        onRemove={removeCourseHandler}
      />
    </div>
  );
};

export async function loader({ params }) {
  const bootcampId = params.bootcampId;
  const response = await fetch(
    `${BACKEND_URL}/api/v1/bootcamps/` + bootcampId + "/courses"
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

export async function action({ params, request }) {
  const bootcampId = params.bootcampId;
  const formData = await request.formData();

  let response;
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;

  const newCourse = JSON.parse(formData.get("course"));

  // new course
  if (formData.get("method") === "POST") {
    const course = {
      title: newCourse.title,
      description: newCourse.description,
      weeks: newCourse.weeks,
      tuition: newCourse.tuition,
      minimumSkill: newCourse.minimumSkill,
      scholarshipsAvailable: newCourse.scholarshipsAvailable,
    };
    response = await fetch(
      `${BACKEND_URL}/api/v1/bootcamps/${bootcampId}/courses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization,
        },
        body: JSON.stringify(course),
      }
    );
  } else if (formData.get("method") === "UPDATE") {
    response = await fetch(`${BACKEND_URL}/api/v1/courses/${newCourse._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization,
      },
      body: JSON.stringify(newCourse),
    });
  } else if (formData.get("method") === "DELETE") {
    response = await fetch(
      `${BACKEND_URL}/api/v1/courses/${formData.get("courseId")}`,
      {
        method: "DELETE",
        headers: {
          authorization: authorization,
        },
      }
    );
  }

  if (response && !response.ok) {
    throw json({ message: "There was an error." }, { status: 500 });
  }

  return redirect(".");
}

export default AddCoursesPage;
