import { PropTypes } from "prop-types";
import { Box, Typography } from "@mui/material";

const BoldTitleContent = ({ title, content }) => {
  return (
    <Box>
      <Typography fontWeight="bold">{title}</Typography>
      <Typography>{content}</Typography>
    </Box>
  );
};

BoldTitleContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

BoldTitleContent.defaultProps = {
  title: "",
  content: "",
};

export default BoldTitleContent;
