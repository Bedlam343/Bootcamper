import { json, redirect, useRouteLoaderData } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import EditBootcamp from "../components/Bootcamp/EditBootcamp";

const EditBootcampPage = () => {
  const bootcamp = useRouteLoaderData("bootcampDetail");
  return (
    <>
      <EditBootcamp bootcamp={bootcamp.bootcamp} courses={bootcamp.courses} />
    </>
  );
};

async function sendRequest(url, method, data) {
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: authorization,
    },
    body: data,
  });

  return response;
}

export async function action({ params, request }) {
  const bootcampId = params.bootcampId;
  const formData = await request.formData();

  let response;
  let url = `${BACKEND_URL}/api/v1`;
  const method = formData.get("method");

  if (method === "POST_COURSE") {
    response = await sendRequest(
      `${url}/bootcamps/${bootcampId}/courses`,
      "POST",
      formData.get("course")
    );
  } else if (method === "UPDATE_COURSE") {
    response = await sendRequest(
      `${url}/courses/${formData.get("_id")}`,
      "PUT",
      formData.get("course")
    );
  }
  else if (method === "DELETE_COURSE") {
    
  }

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "There was an error." }, { status: 500 });
  }

  // update bootcamp
  // if (!formData.get("method") && formData.get("name")) {
  //   const bootcamp = {
  //     name: formData.get("name"),
  //     description: formData.get("description"),
  //     website: formData.get("website"),
  //     phone: formData.get("phone"),
  //     email: formData.get("email"),
  //     address: formData.get("address"),
  //     // careers: formData.get("careers").split(", "),
  //     housing: formData.get("housing") === "on",
  //     jobAssistance: formData.get("jobAssistance") === "on",
  //     jobGuarantee: formData.get("jobGuarantee") === "on",
  //     acceptGi: formData.get("acceptGi") === "on",
  //   };
  //   response = await fetch(`${BACKEND_URL}/api/v1/bootcamps/${bootcampId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: authorization,
  //     },
  //     body: JSON.stringify(bootcamp),
  //   });
  //   if (!response.ok) {
  //     throw json({ message: "Could not update bootcamp" }, { status: 500 });
  //   }
  //   return redirect(`/bootcamps/${bootcampId}`);
  // }

  // const course = JSON.parse(formData.get("course"));

  // if (formData.get("method") === "POST_COURSE") {
  //   const newCourse = {
  //     title: course.title,
  //     description: course.description,
  //     weeks: course.weeks,
  //     tuition: course.tuition,
  //     minimumSkill: course.minimumSkill,
  //     scholarshipsAvailable: course.scholarshipsAvailable,
  //   };
  //   response = await fetch(
  //     `${BACKEND_URL}/api/v1/bootcamps/${bootcampId}/courses`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: authorization,
  //       },
  //       body: JSON.stringify(newCourse),
  //     }
  //   );
  // } else if (formData.get("method") === "UPDATE_COURSE") {
  //   response = await fetch(`${BACKEND_URL}/api/v1/courses/${course._id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: authorization,
  //     },
  //     body: JSON.stringify(course),
  //   });
  // } else if (formData.get("method") === "DELETE_COURSE") {
  //   response = await fetch(
  //     `${BACKEND_URL}/api/v1/courses/${formData.get("courseId")}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         authorization: authorization,
  //       },
  //     }
  //   );
  // }

  // if (response && !response.ok) {
  //   throw json({ message: "Could not update bootcamp" }, { status: 500 });
  // }

  return redirect(".");
}

export default EditBootcampPage;
