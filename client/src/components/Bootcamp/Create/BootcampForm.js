import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import Address from "common/Address";
import CareersDropdown from "../CareersDropdown";
import { useState } from "react";
import { combineAddress, splitAddress } from "util/helpers";

const BootcampForm = ({
  bootcamp,
  onCancel,
  onBootcampFormSubmit,
  rightBtnText,
}) => {
  const [data, setData] = useState(bootcamp);

  const {
    name = "",
    description = "",
    careers = [],
    jobGuarantee = false,
    jobAssistance = false,
    housing = false,
    acceptGi = false,
    phone = "",
    email = "",
    website = "",
    street = "",
    city = "",
    state = "",
    zipcode = "",
    country = "",
    address = "",
  } = data;

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.careers = data.careers.split(",");
    data.address = combineAddress(
      data.street,
      data.city,
      data.state,
      data.zipcode,
      data.country
    );
    onBootcampFormSubmit(data);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Bootcamp Details
      </Typography>
      <Grid
        onSubmit={handleSubmit}
        component="form"
        id="bootcamp-form"
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleChange}
          />
        </Grid>

        <Address
          street={street}
          city={city}
          state={state}
          zipcode={zipcode}
          country={country}
          onChange={handleChange}
          required
        />
        <CareersDropdown careers={careers} required />

        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    jobGuarantee: e.target.checked,
                  }));
                }}
                checked={Boolean(jobGuarantee)}
                name="jobGuarantee"
                value={true}
              />
            }
            label={<Typography fontSize="15px">Job Guarantee</Typography>}
            labelPlacement="top"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    jobAssistance: e.target.checked,
                  }));
                }}
                name="jobAssistance"
                checked={Boolean(jobAssistance)}
                value={true}
              />
            }
            label={<Typography fontSize="15px">Job Assistance</Typography>}
            labelPlacement="top"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    housing: e.target.checked,
                  }));
                }}
                name="housing"
                checked={Boolean(housing)}
                value={true}
              />
            }
            label={<Typography fontSize="15px">Housing</Typography>}
            labelPlacement="top"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    acceptGi: e.target.checked,
                  }));
                }}
                name="acceptGi"
                checked={Boolean(acceptGi)}
                value={true}
              />
            }
            label={<Typography fontSize="15px">Accept GI</Typography>}
            labelPlacement="top"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            variant="standard"
            value={phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="website"
            name="website"
            label="Website"
            fullWidth
            variant="standard"
            value={website}
            onChange={handleChange}
          />
        </Grid>

        {/* <Grid
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
          item
          xs={12}
        >
          <Button component="label" variant="outlined">
            Upload Image
            <input type="file" hidden />
          </Button>
          <Typography color="text.secondary" fontStyle="italic">
            No Image.
          </Typography>
        </Grid> */}

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onCancel} sx={{ mt: 3, ml: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
              {rightBtnText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

BootcampForm.propTypes = {
  bootcamp: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    careers: PropTypes.arrayOf(PropTypes.string),
    jobGuarantee: PropTypes.bool || PropTypes.string,
    jobAssistance: PropTypes.bool || PropTypes.string,
    housing: PropTypes.bool || PropTypes.string,
    acceptGI: PropTypes.bool || PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
    country: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onBootcampFormSubmit: PropTypes.func,
  rightBtnText: PropTypes.string,
};

BootcampForm.defaultProps = {
  bootcamp: {
    name: "",
    description: "",
    careers: [],
    jobGuarantee: false,
    jobAssistance: false,
    housing: false,
    acceptGI: false,
    phone: "",
    email: "",
    website: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  },
  onCancel: () => {},
  onBootcampFormSubmit: () => {},
  rightBtnText: "",
};

export default BootcampForm;
