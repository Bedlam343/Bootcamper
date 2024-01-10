import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";

import Footer from "components/Bootcamp/Footer";
import Rating from "common/Rating";
import Courses from "components/Course/Courses";
import { useNavigate, useSubmit } from "react-router-dom";
import { useAuth } from "store/AuthProvider";

const BootcampDetails = ({ bootcamp, courses, canEdit }) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { token } = useAuth();

  const onEditClick = () => {
    navigate("edit", { state: { bootcamp } });
  };

  const onDeleteClick = () => {
    const formData = new FormData();
    formData.append("token", token);
    submit(formData, { method: "POST" });
    navigate(-1);
  };

  const address = bootcamp.address || bootcamp.location.formattedAddress;

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <Grid container spacing={2} sx={{ p: 2 }}>
          {canEdit && (
            <Grid item xs={12} display="flex" justifyContent="center" gap={2}>
              <Button onClick={onEditClick} variant="contained">
                Edit
              </Button>
              <Button onClick={onDeleteClick} variant="outlined">
                Delete
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
            >
              {bootcamp.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {bootcamp.description}
            </Typography>
          </Grid>

          {bootcamp.averageCost && (
            <Grid item xs={12}>
              <Typography
                align="center"
                sx={{ textTransform: "uppercase" }}
                fontSize="18px"
              >
                Average Cost: {`$${bootcamp.averageCost}` || "Unknown"}
              </Typography>
            </Grid>
          )}

          {bootcamp.careers?.length > 0 && (
            <Grid item xs={12}>
              <Typography
                sx={{ textTransform: "uppercase" }}
                fontSize="18px"
                align="center"
              >
                Careers:
              </Typography>
              <Typography fontSize="16px" align="center">
                {bootcamp.careers.join(", ")}
              </Typography>
            </Grid>
          )}

          <Grid
            container
            sx={{ mt: 4 }}
            direction="row"
            justifyContent="center"
          >
            {bootcamp.jobAssistance && (
              <FormControlLabel
                sx={{ width: "8em" }}
                label={<Typography variant="button">Job Assistance</Typography>}
                labelPlacement="top"
                control={<Checkbox disabled defaultChecked />}
              />
            )}
            {bootcamp.jobGuarantee && (
              <FormControlLabel
                sx={{ width: "8em" }}
                label={<Typography variant="button">Job Guarantee</Typography>}
                labelPlacement="top"
                control={<Checkbox disabled defaultChecked />}
              />
            )}
            {bootcamp.housing && (
              <FormControlLabel
                sx={{ width: "8em" }}
                label={<Typography variant="button">Housing</Typography>}
                labelPlacement="top"
                control={<Checkbox disabled defaultChecked />}
              />
            )}
            {bootcamp.acceptGi && (
              <FormControlLabel
                aria-readonly
                sx={{ width: "8em" }}
                label={<Typography variant="button">Accept GI</Typography>}
                labelPlacement="top"
                control={<Checkbox disabled defaultChecked />}
              />
            )}
          </Grid>

          {address && (
            <Grid item xs={12} justifyContent="center">
              <Typography variant="h6" align="center">
                Located at:
              </Typography>
              <Typography sx={{ textTransform: "uppercase" }} align="center">
                {bootcamp.address || bootcamp.location?.formattedAddress}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            {bootcamp.averageRating && (
              <Rating rating={bootcamp.averageRating} />
            )}
          </Grid>
        </Grid>
      </Box>

      <Courses courses={courses} canEdit={canEdit} />

      <Footer
        phone={bootcamp.phone}
        email={bootcamp.email}
        website={bootcamp.website}
      />
    </>
  );
};

BootcampDetails.propTypes = {
  bootcamp: PropTypes.shape(),
  courses: PropTypes.arrayOf(PropTypes.shape()),
  canEdit: PropTypes.bool,
};

BootcampDetails.defaultProps = {
  bootcamp: {},
  courses: [],
  canEdit: false,
};

export default BootcampDetails;
