import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useSubmit } from 'react-router-dom';

import BootcampsDropdown from 'components/Bootcamp/Dropdown';
import { useAuth } from 'store/AuthProvider';

const MainNavigation = () => {
  const { isLoggedIn } = useAuth();
  const submit = useSubmit();

  const handleLogout = () => {
    submit({}, { method: 'POST' });
  };

  const loginOrLogoutButton = () => {
    if (isLoggedIn) {
      return (
        <Button onClick={handleLogout} color="inherit">
          Logout
        </Button>
      );
    }
    return (
      <Button color="inherit">
        <NavLink to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          Login
        </NavLink>
      </Button>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, mb: '6em' }}>
      <AppBar sx={{ position: 'fixed', top: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Codemasons
          </Typography>
          <Button color="inherit">
            <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </NavLink>
          </Button>

          <BootcampsDropdown />

          {loginOrLogoutButton()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavigation;
