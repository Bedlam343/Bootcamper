import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Form, NavLink, useActionData, useSubmit } from "react-router-dom";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

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

const Signup = () => {
  const submit = useSubmit();
  const message = useActionData();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("role") === null) return;
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
          Sign up
        </Typography>

        <Form onSubmit={handleSubmit} style={{ marginTop: 2 }}>
          <TextField
            margin="dense"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
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

          <FormControl required sx={{ marginTop: "1em" }}>
            <FormLabel>Account Type</FormLabel>
            <RadioGroup name="role" row>
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="publisher"
                control={<Radio />}
                label="Publisher"
              />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>

          <Grid container>
            <Grid item xs>
              <NavLink to="" variant="body2">
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink style={{ color: "blue" }} to="/login" variant="body2">
                {"Sign In"}
              </NavLink>
            </Grid>
          </Grid>
        </Form>
        {errorMessage(message)}
      </Box>
    </Container>
  );
};

export default Signup;
