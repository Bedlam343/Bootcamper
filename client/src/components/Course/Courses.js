import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PropTypes } from "prop-types";

const Courses = ({ courses, canEdit }) => {
  const render = () => {
    if (courses.length > 0) {
      return (
        <Container sx={{ mt: "2em", mb: "2em" }} maxWidth="md">
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.title}
                    </Typography>
                    <Typography>{course.description}</Typography>
                  </CardContent>
                  {canEdit && (
                    <CardActions>
                      <Button size="small">Edit</Button>
                      <Button size="small">Delete</Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    }
    return null;
  };

  return <>{render()}</>;
};

Courses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape()),
  canEdit: PropTypes.bool,
};

Courses.defaultProps = {
  courses: [],
  canEdit: false,
};

export default Courses;
