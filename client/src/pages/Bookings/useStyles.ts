import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

// Standardize the box shadow styling
const boxShadow =
  '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: 'center',
  },
  upcomingBookings: {
    '@media(min-width: 600px)': {
      order: -1,
    },
    '& Box': {
      boxShadow: boxShadow,
    },
    '& .MuiGrid-root': {
      flexDirection: 'column',
    },
  },
  calendar: {
    '& .react-calendar__navigation__label': {
      color: theme.palette.primary.main,
    },
    border: 'none',
    boxShadow: boxShadow,
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
