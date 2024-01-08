import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import BoldTitleContent from "common/BoldTitleContent";
import { PropTypes } from "prop-types";
import { capitalizeFirstLetter as cfl } from "util/helpers";

const List = ({ courses, evenWidth }) => {
  const style = evenWidth ? styles.evenWidth : {};

  return (
    <>
      {courses.map((course) => (
        <Box sx={style} item key={course._id}>
          <Card sx={{ borderRadius: "10px" }} variant="outlined">
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                {course.title}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {course.description}
              </Typography>
              <BoldTitleContent title="Weeks" content={course.weeks} />
              <BoldTitleContent title="Tuition" content={course.tuition} />
              <BoldTitleContent
                title="Minimum Skill"
                content={cfl(course.minimumSkill)}
              />
              <BoldTitleContent
                title="Scholarships Available"
                content={course.scholarshipsAvailable ? "Yes" : "No"}
              />
            </CardContent>
          </Card>
        </Box>
      ))}
    </>
  );
};

const styles = {
  evenWidth: {
    width: 250,
  },
};

List.propTypes = {
  courses: PropTypes.array,
  evenWidth: PropTypes.bool,
};

List.defaultProps = {
  courses: [],
  evenWidth: false,
};

export default List;
