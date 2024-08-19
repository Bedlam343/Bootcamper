import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import { getBootcamps } from 'service';
import { NO_IMAGE_URL } from 'constants';
import Homepage from 'components/Homepage';

const Home = () => {
  const bootcamps = useLoaderData();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/bootcamps');
  };

  return <Homepage bootcamps={bootcamps} />;
};

export const loader = async () => {
  const params = {
    limit: 4,
  };
  const bootcamps = await getBootcamps(params);
  return bootcamps;
};

export default Home;
