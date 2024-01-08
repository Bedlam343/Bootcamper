import { useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        Bootcamps
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/bootcamps" style={{ textDecoration: "none" }}>
            <Typography>All Bootcamps</Typography>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink
            to="/bootcamps/my-bootcamps"
            style={{ textDecoration: "none" }}
          >
            <Typography>My Bootcamps</Typography>
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Dropdown;
