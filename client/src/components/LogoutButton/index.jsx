
import Auth from "../../utils/auth";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const LogoutButton = () => {
  const handleLogout = () => {
    // Call logout function from auth utility
    Auth.logout();
  };

  return (
    <Button variant="outlined" color="inherit" size="small" onClick={handleLogout}>Log out</Button>
  );
};

export default LogoutButton;
