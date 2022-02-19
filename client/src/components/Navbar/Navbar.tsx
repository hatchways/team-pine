import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useAuth } from '../../context/useAuthContext';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  styled,
} from '@mui/material';
import { AccountType } from '../../types/AccountType';

import lovingSitterLogo from '../../images/logo.svg';
import { useStyles } from './useStyles';
import { NavLink, useLocation } from 'react-router-dom';
import { Settings, Logout, Person } from '@mui/icons-material';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';

const NavbarButton = styled(Button)({
  padding: '15px 0',
});

const menuItems = [
  {
    item: 'Become a Sitter',
    resource: '/dashboard',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Become a sitter',
    resource: '/signup?accountType=pet_sitter',
    canView: null,
    authenticated: false,
  },
  {
    item: 'My Jobs',
    resource: '/bookings',
    canView: [AccountType.PET_SITTER],
    authenticated: true,
  },
  {
    item: 'My Sitters',
    resource: '/sitters',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Messages',
    resource: '/messages',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: (
      <NavbarButton variant="outlined" size="large" fullWidth>
        Login
      </NavbarButton>
    ),
    resource: '/login',
    canView: null,
    authenticated: false,
  },
  {
    item: (
      <NavbarButton variant="contained" size="large" fullWidth disableElevation>
        Sign up
      </NavbarButton>
    ),
    resource: '/signup',
    canView: null,
    authenticated: false,
  },
];

const MenuItem: React.FC<{
  resource: string;
  item: string | JSX.Element;
}> = ({ resource, item }) => {
  const classes = useStyles();

  return (
    <Grid key={resource} sx={{ textAlign: 'center' }} xs={3} sm={2} justifySelf="flex-end" item>
      <NavLink className={classes.navbarItem} to={resource}>
        {item}
      </NavLink>
    </Grid>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { loggedInUser, loggedInUserProfile, logout } = useAuth();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  });

  const renderMenuItems = () => {
    return menuItems.map((menu) => {
      if (menu.authenticated && menu.canView) {
        if (loggedInUserProfile && loggedInUserProfile.isSitter) {
          return (
            loggedInUser && menu.canView.includes(AccountType.PET_SITTER) && <MenuItem key={menu.resource} {...menu} />
          );
        } else {
          return (
            loggedInUser && menu.canView.includes(AccountType.PET_OWNER) && <MenuItem key={menu.resource} {...menu} />
          );
        }
      } else {
        return !loggedInUser && <MenuItem key={menu.resource} {...menu} />;
      }
    });
  };

  return (
    <Box className={clsx(classes.navbar, location.pathname === '/' && classes.transparentNavbar)}>
      <Grid justifyContent="space-between" alignItems="center" container>
        <Grid xs={3} md={6} item>
          <img className={classes.navbarLogo} src={lovingSitterLogo} />
        </Grid>
        <Grid xs={9} md={6} item>
          <Grid container alignItems="center" gap={2} justifyContent="flex-end">
            {(windowWidth >= 600 || !loggedInUser) && renderMenuItems()}
            {loggedInUser && (
              <Grid xs={3} md={1} item>
                <>
                  <IconButton
                    size="large"
                    aria-label="account profile picture"
                    aria-controls="menu-navbar"
                    arais-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                  >
                    <AvatarDisplay
                      photoUrl={loggedInUserProfile ? loggedInUserProfile.photo : undefined}
                      loggedIn
                      width={50}
                      height={50}
                      name={loggedInUser.name}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <DropdownMenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </DropdownMenuItem>
                    <Divider />
                    <DropdownMenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </DropdownMenuItem>
                  </Menu>
                </>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {windowWidth < 600 && loggedInUser && (
        <>
          <Divider />
          <Grid mt={1} container>
            {renderMenuItems()}
          </Grid>
        </>
      )}
    </Box>
  );
};

export { Navbar };
