import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  bookings: {
    '@media(min-width: 600px)': {
      order: -1,
    },
    '& .MuiBox-root': {
      textTransform: 'uppercase',
      fontSize: '.7rem',
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
