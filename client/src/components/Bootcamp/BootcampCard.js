import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import { NO_IMAGE_URL } from "constants";
import { useAuth } from "store/AuthProvider";

const BootcampCard = ({ id, user, name, description, averageCost, photo }) => {
  const { id: userId } = useAuth();
  const photoUrl = photo || NO_IMAGE_URL;

  const owned = userId === user;

  return (
    <NavLink to={`/bootcamps/${id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ width: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={250}
            src={photoUrl}
            alt="green iguana"
            crossOrigin="anonymous"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <br />
            <Typography variant="body2">
              Average Cost: ${averageCost || "Unknown"}
            </Typography>

            {owned && (
              <Typography
                align="right"
                color="primary"
                fontWeight="bold"
                variant="body2"
              >
                Owned By You
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  );
};

BootcampCard.propTypes = {
  id: PropTypes.string,
  user: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  averageCost: PropTypes.number,
  photo: PropTypes.string,
};
BootcampCard.defaultProps = {
  id: "",
  user: "",
  name: "",
  description: "",
  averageCost: undefined,
  photo: "",
};

export default BootcampCard;
