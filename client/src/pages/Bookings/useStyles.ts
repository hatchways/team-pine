import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  bookings: {
    '@media(min-width: 600px)': {
      order: -1,
    },
    '& .MuiBox-root': {
      boxShadow:
        '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
      textTransform: 'uppercase',
      fontSize: '.7rem',
      fontWeight: 'bold',
    },
  },
  bookingSectionLabel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bookingCard: {
    margin: '' + theme.spacing(1) + ' 0',
  },
  bookingCardContent: {
    padding: theme.spacing(0.2),
  },
}));

export default useStyles;
