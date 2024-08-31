import { Typography } from '@mui/material';

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const combineAddress = (street, city, state, zipcode, country) => {
  return `${street}, ${city}, ${state} ${zipcode}, ${country}`;
};

export const splitAddress = (address) => {
  if (!address) return {};
  const [street, city, stateAndZipcode, country] = address.split(',');
  const [state, zipcode] = stateAndZipcode.trim().split(' ');
  return {
    street: street.trim(),
    city: city.trim(),
    state: state.trim(),
    zipcode: zipcode.trim(),
    country: country.trim(),
  };
};

export const errorMessage = (error) => {
  if (error) {
    return (
      <Typography
        sx={{ marginTop: '2em' }}
        fontSize="18px"
        color="error"
        align="center"
      >
        {error}
      </Typography>
    );
  }
};

export const generateGsPublicUrl = (bucketName, fileName) => {
  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
};
