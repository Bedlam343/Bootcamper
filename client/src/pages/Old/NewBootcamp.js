import { Await, json, redirect, useRouteLoaderData } from "react-router-dom";
import { Suspense, useContext } from "react";
import AuthContext from "../store/auth-context";
import NewBootcamp from "../components/Bootcamp/NewBootcamp";

const NewBootcampPage = () => {
  const authContext = useContext(AuthContext);
  const { bootcamps } = useRouteLoaderData("bootcampsRoot");
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={bootcamps}>
        {(loadedBootcamps) => {
          const myBootcamps = loadedBootcamps.filter(
            (bootcamp) => bootcamp.user === authContext._id
          );
          return <NewBootcamp myBootcamps={myBootcamps} />;
        }}
      </Await>
    </Suspense>
  );
};

export default NewBootcampPage;

// add new bootcamp and its courses to the database
export async function action({ request }) {
  // add bootcamp
  const formData = await request.formData();
  const bootcampData = {
    name: formData.get("name"),
    description: formData.get("description"),
    website: formData.get("website"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    careers: formData.get("careers").split(","),
    housing: formData.get("housing") === "on",
    jobAssistance: formData.get("jobAssistance") === "on",
    jobGuarantee: formData.get("jobGuarantee") === "on",
    acceptGi: formData.get("acceptGi") === "on",
  };

  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  let response = await fetch(`/api/v1/bootcamps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(bootcampData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    console.log("BRUH");
    throw json({ message: "Could not add bootcamp" }, { status: 500 });
  }

  const responseData = await response.json();

  return redirect(`/bootcamps/${responseData.data._id}/new-bootcamp-courses`);
}
