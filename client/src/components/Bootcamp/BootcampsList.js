import { Box } from "@mui/material";
import BootcampCard from "components/Bootcamp/BootcampCard";

const BootcampsList = ({ bootcamps }) => {
  const sortedBootcamps = bootcamps.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    return 1;
  });

  console.log(sortedBootcamps);

  return (
    <Box sx={styles.box}>
      {sortedBootcamps.map(
        ({ id, user, name, description, averageCost, photo }) => (
          <BootcampCard
            key={id}
            id={id}
            user={user}
            name={name}
            description={description}
            averageCost={averageCost}
            photo={photo}
          />
        )
      )}
    </Box>
  );
};

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2em",
    mb: 3,
  },
};

export default BootcampsList;
