import { Box } from "@mui/material";
import MuiModal from "@mui/material/Modal";

const Modal = ({ open, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "1em 2em 1.5em",
};

export default Modal;
