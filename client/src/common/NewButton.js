import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import { PropTypes } from "prop-types";

const NewButton = ({ onClick, tooltip }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: "1em 2em" },
        position: "fixed",
        bottom: 0,
        right: 0,
      }}
      onClick={onClick}
    >
      <Tooltip title={tooltip}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

NewButton.propTypes = {
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
};

NewButton.defaultProps = {
  onClick: () => {},
  tooltip: "",
};

export default NewButton;
