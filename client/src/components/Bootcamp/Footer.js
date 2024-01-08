import { Box, Stack, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import { PropTypes } from "prop-types";

const Footer = ({ phone, email, website }) => {
  return (
    <Box
      sx={{ bgcolor: "background.paper", p: 6, borderTop: "2px solid black" }}
      component="footer"
    >
      <Stack
        gap="2em"
        direction="row"
        justifyContent="center"
        overflow={{ xs: "hidden", sm: "visible" }}
      >
        {phone && (
          <Stack
            gap="0.5em"
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <PhoneIcon />
            <Typography fontSize="14px">{phone}</Typography>
          </Stack>
        )}
        {email && (
          <Stack
            gap="0.5em"
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <EmailIcon />
            <Typography fontSize="14px">{email}</Typography>
          </Stack>
        )}
        {website && (
          <Stack
            gap="0.5em"
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <LanguageIcon />
            <Typography fontSize="14px">{website}</Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

Footer.propTypes = {
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
};

Footer.defaultProps = {
  phone: "",
  email: "",
  website: "",
};

export default Footer;
