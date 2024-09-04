import { useLoaderData } from 'react-router-dom';
import { queryClient } from 'queryClient';
import { getBootcamps } from 'service';

import Homepage from 'components/Homepage';

const Home = () => {
  const bootcamps = useLoaderData();
  return <Homepage bootcamps={bootcamps} />;
};

export const loader = async () => {
  const params = {
    limit: 4,
  };
  const { bootcamps } = await queryClient.fetchQuery({
    queryKey: ['home-bootcamps'],
    queryFn: () => getBootcamps(params),
  });
  return bootcamps;
};

export default Home;
