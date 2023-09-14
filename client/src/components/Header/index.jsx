// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Badge from '@mui/material/Badge';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import LogoutButton from '../LogoutButton';
import '../../pages/css/home.css';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // const goToProfile = (event) => {
  //   event.window.replace('/me')
  // }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          
            <MailIcon />
          
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <header className="app-bar">
      <nav className="toolbar">
        <div className="menu-icon">
          <a href="/">
            <img src="../../images/loudmouth.png" alt="logo" style={{ width: '200px', marginRight: '0px' }} />
          </a>
        </div>
        <h1 className='siteName' style={{ marginLeft: '0px' }}>LoudMouth</h1>
        <div className="actions">
          {Auth.loggedIn() ? (
            <LogoutButton />
          ) : (
            <a href="/login" className="login-button">
              Log in
            </a>
          )}
          <button
            className="icon-button mail-button"
            aria-label="show 4 new mails"
            
          >
            📬
          </button>
          <Link to="/me">
            <button
              className="icon-button profile-button"
              aria-label="account of current user"
              onClick={handleProfileMenuOpen}
            >
              <span role="img" aria-label="user icon">
                👤
              </span>
            </button>
          </Link>
        </div>
      </nav>
      {/* <div className="mobile-menu-icon">
        <button
          className="icon-button"
          aria-label="show more"
          onClick={handleMobileMenuOpen}
        >
          ☰
        </button>
      </div> */}
    </header>
  );
}
export default NavBar;
