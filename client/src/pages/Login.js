import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useActionData, useSubmit } from "react-router-dom";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Skilled Coders
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const errorMessage = (error) => {
  if (error) {
    return (
      <Typography
        sx={{ marginTop: "2em" }}
        fontSize="18px"
        color="error"
        align="center"
      >
        {error}
      </Typography>
    );
  }
};

const Login = () => {
  const submit = useSubmit();
  const actionData = useActionData();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submit(data, { method: "POST" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* <TextField
            margin="dense"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          /> */}
          <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />

          {/* <FormControl required sx={{ marginTop: "1em" }}>
            <FormLabel>Account Type</FormLabel>
            <RadioGroup name="role" row>
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="publisher"
                control={<Radio />}
                label="Publisher"
              />
            </RadioGroup>
          </FormControl> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {errorMessage(actionData?.error)}
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
