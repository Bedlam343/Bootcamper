import Box from "@mui/material/Box";
import MuiRating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";

const Rating = ({ rating }) => {
  const renderRating = () => {
    if (!isNaN(rating)) {
      return (
        <MuiRating name="customized-10" readOnly value={rating} max={10} />
      );
    }
    return (
      <Typography fontStyle="italic" color="text.secondary">
        Unavailable
      </Typography>
    );
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      <Typography variant="button" component="legend">
        Rating
      </Typography>
      {renderRating()}
    </Box>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

Rating.defaultProps = {
  rating: undefined,
};

export default Rating;
