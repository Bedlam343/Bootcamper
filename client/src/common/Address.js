import { Grid, TextField } from "@mui/material";
import { PropTypes } from "prop-types";

const Address = ({
  street,
  city,
  state,
  zipcode,
  country,
  onChange,
  required,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          required={required}
          id="street"
          name="street"
          label="Street Address"
          fullWidth
          variant="standard"
          value={street}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required={required}
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
          value={city}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required={required}
          id="state"
          name="state"
          label="State/Province/Region"
          fullWidth
          variant="standard"
          value={state}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required={required}
          id="zipcode"
          name="zipcode"
          label="Zip / Postal code"
          fullWidth
          variant="standard"
          value={zipcode}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required={required}
          id="country"
          name="country"
          label="Country"
          fullWidth
          variant="standard"
          value={country}
          onChange={onChange}
        />
      </Grid>
    </>
  );
};

Address.propTypes = {
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipcode: PropTypes.string,
  country: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
Address.defaultProps = {
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  onChange: () => {},
  required: false,
};

export default Address;
