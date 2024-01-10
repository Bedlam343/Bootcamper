import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { getBootcamps } from "service";
import { NO_IMAGE_URL } from "constants";

const cards = [1, 2];

const Home = () => {
  const bootcamps = useLoaderData();
  console.log(bootcamps);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/bootcamps");
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 2,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Skilled Coders
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Our mission at Skilled Coders is to provide you with the best coding
            knowledge out there. We bring you the best bootcamps, with the best
            courses, to allow you to puruse your dream of becoming a top-notch
            programmer.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button onClick={handleClick} variant="contained">
              Checkout All Bootcamps
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {bootcamps.map((bootcamp) => (
            <Grid item key={bootcamp._id} xs={12} sm={6} md={4}>
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/bootcamps/${bootcamp._id}`}
              >
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
                    image={bootcamp.photo || NO_IMAGE_URL}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {bootcamp.name}
                    </Typography>
                    <Typography>{bootcamp.description}</Typography>
                  </CardContent>
                </Card>
              </NavLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const loader = async () => {
  const params = {
    limit: 3,
  };
  const bootcamps = await getBootcamps(params);
  return bootcamps;
};

export default Home;
