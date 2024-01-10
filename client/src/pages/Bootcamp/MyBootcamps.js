import { Typography } from "@mui/material";
import BootcampsList from "components/Bootcamp/BootcampsList";
import Loading from "common/Loading";
import { useEffect, useState } from "react";
import { getMyBootcamps } from "service";
import { useAuth } from "store/AuthProvider";

const MyBootcamps = () => {
  const { id: userId, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bootcamps, setBootcamps] = useState([]);

  useEffect(() => {
    const fetchBootcamps = async () => {
      try {
        setLoading(true);
        const response = await getMyBootcamps(userId, token);
        console.log(response.data.data);
        setBootcamps(response.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    if (token && userId) {
      fetchBootcamps();
    }
  }, [token, userId]);

  const render = () => {
    if (loading) {
      return <Loading />;
    }
    if(!token) {
      return (
        <Typography variant="h3" align="center">
          Please login to view your bootcamps.
        </Typography>
      );
    }
    if (bootcamps.length > 0) {
      return (
        <>
          <Typography align="center" variant="h3" sx={{ mb: 3 }}>
            Your Bootcamps
          </Typography>
          <BootcampsList bootcamps={bootcamps} />
        </>
      );
    }
    return (
      <Typography variant="h3" align="center">
        You have no published Bootcamps.
      </Typography>
    );
  };

  return <>{render()}</>;
};

export default MyBootcamps;
