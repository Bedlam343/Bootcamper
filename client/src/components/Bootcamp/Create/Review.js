import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import BoldTitleContent from "common/BoldTitleContent";
import { combineAddress } from "util/helpers";
import CoursesList from "components/Course/List";

const Review = ({ bootcamp, courses, onBack, onNext }) => {
  const address = combineAddress(
    bootcamp.street,
    bootcamp.city,
    bootcamp.state,
    bootcamp.zipcode,
    bootcamp.country
  );

  const renderCourses = () => {
    if (courses.length === 0) {
      return <Typography fontStyle="italic">No courses.</Typography>;
    }
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        pr={1}
        maxHeight={700}
        overflow="scroll"
      >
        <CoursesList courses={courses} />
      </Box>
    );
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      <Grid container>
        <Grid xs={5} item>
          <Typography fontWeight="bold" gutterBottom>
            Bootcamp
          </Typography>

          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <BoldTitleContent title="Name" content={bootcamp.name} />
            <BoldTitleContent
              title="Description"
              content={bootcamp.description}
            />
            <BoldTitleContent
              title="Careers"
              content={bootcamp.careers.join(", ")}
            />
            <BoldTitleContent
              title="Job Guarantee"
              content={bootcamp.jobGuarantee ? "Yes" : "No"}
            />
            <BoldTitleContent
              title="Job Assitance"
              content={bootcamp.jobAssistance ? "Yes" : "No"}
            />
            <BoldTitleContent
              title="Housing"
              content={bootcamp.housing ? "Yes" : "No"}
            />
            <BoldTitleContent
              title="Accept GI"
              content={bootcamp.acceptGi ? "Yes" : "No"}
            />
            <BoldTitleContent title="Address" content={address} />
            {bootcamp.website && (
              <BoldTitleContent title="Website" content={bootcamp.website} />
            )}
            {bootcamp.email && (
              <BoldTitleContent title="Email" content={bootcamp.email} />
            )}
            {bootcamp.phone && (
              <BoldTitleContent title="Phone" content={bootcamp.phone} />
            )}
          </Box>
        </Grid>

        <Grid
          sx={{
            // background: "orange",
            display: "flex",
            justifyContent: "center",
          }}
          xs={1}
          item
        >
          <Divider orientation="vertical" />
        </Grid>

        <Grid xs={6} item>
          <Typography fontWeight="bold" gutterBottom>
            Courses
          </Typography>
          {renderCourses()}
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
        <Button onClick={onNext} variant="contained" sx={{ mt: 3, ml: 1 }}>
          Publish
        </Button>
      </Box>
    </>
  );
};

Review.propTypes = {
  bootcamp: PropTypes.shape(),
  courses: PropTypes.arrayOf(PropTypes.shape()),
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};

Review.defaultProps = {
  bootcamp: {},
  courses: [],
  onBack: () => {},
  onNext: () => {},
};

export default Review;
