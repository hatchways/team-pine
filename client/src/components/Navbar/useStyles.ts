import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  navbar: {
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    padding: theme.spacing(2),
    background: 'white',
  },
  transparentNavbar: {
    position: 'fixed',
    zindex: 10000,
    boxShadow: 'none',
    background: 'none',
  },
  navbarItemLanding: {
    fontWeight: 700,
    textDecoration: 'none',
    color: 'white !important',
    transition: 'color 120ms ease-in-out',
    '& .MuiButton-root': {
      color: 'white',
    },
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  navbarItem: {
    color: theme.palette.grey[900],
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  unreadNotification: {
    backgroundColor: '#FFFFFF',
    fontWeight: 700,
    textDecoration: 'none',
  },
  readNotification: {
    backgroundColor: theme.palette.grey[300],
    fontWeight: 700,
    textDecoration: 'none',
  },
  badge: {
    '& .MuiBadge-standard': {
      backgroundColor: '#4caf50',
      left: '1px',
      top: '-10px',
    },
  },
  navbarLogo: {
    width: 180,
  },
}));
