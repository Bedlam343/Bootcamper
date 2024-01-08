import { useLoaderData } from "react-router-dom";

import BootcampsList from "components/Bootcamp/BootcampsList";
import { getBootcamps } from "service";

const AllBootcamps = () => {
  const bootcamps = useLoaderData();

  console.log(bootcamps);

  const renderBootcampCards = () => {
    if (bootcamps.length > 0) {
      return <BootcampsList bootcamps={bootcamps} />;
    }
    return null;
  };

  return <>{renderBootcampCards()}</>;
};

export const loader = async () => {
  const bootcamps = await getBootcamps();
  return bootcamps;
};

export default AllBootcamps;
