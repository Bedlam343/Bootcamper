import { Suspense } from "react";
import { Await, json, redirect, useRouteLoaderData } from "react-router-dom";
import BootcampItem from "../components/Bootcamp/BootcampItem";
import { BACKEND_URL } from "../constants";

const BootcampDetailPage = () => {
  const bootcamp = useRouteLoaderData("bootcampDetail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={bootcamp}>
          {(loadedBootcamp) => (
            <BootcampItem
              bootcamp={loadedBootcamp.bootcamp}
              courses={loadedBootcamp.courses}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
};

// delete a bootcamp
export async function action({ request }) {
  const formData = await request.formData();
  const bootcampId = formData.get("bootcampId");

  const userToken = localStorage.getItem("token");
  const authorization = "Bearer " + userToken;

  const response = await fetch(
    `${BACKEND_URL}/api/v1/bootcamps/${bootcampId}`,
    {
      method: "delete",
      headers: {
        authorization: authorization,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not delete bootcmap" }, { status: 500 });
  }

  return redirect("/bootcamps");
}

export default BootcampDetailPage;
