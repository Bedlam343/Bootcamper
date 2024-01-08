import { Await, useRouteLoaderData } from "react-router-dom";
import BootcampsList from "../components/Bootcamp/BootcampsList";
import { Suspense } from "react";

const BootcampsPage = () => {
  // useLoaderData() gets access to the "closest" loader data
  const { bootcamps } = useRouteLoaderData("bootcampsRoot");

  return (
    <Suspense
      fallback={<p style={{ textAlign: "center" }}>Loading Bootcamps...</p>}
    >
      <Await resolve={bootcamps}>
        {(loadedBootcamps) => <BootcampsList bootcamps={loadedBootcamps} />}
      </Await>
    </Suspense>
  );
};

export default BootcampsPage;
