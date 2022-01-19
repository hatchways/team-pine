import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  calendar: {
    // We need z-index so we can fit the active::before highlight circle in between the day number and the calendar itself
    zIndex: '-2',
    fontFamily: 'inherit',
    '& .react-calendar__navigation__label': {
      color: theme.palette.primary.main,
      fontFamily: 'inherit',
    },
    '& .react-calendar__month-view__weekdays__weekday > abbr': {
      textDecoration: 'none',
    },
    '& .react-calendar__navigation__prev2-button': {
      display: 'none',
    },
    '& .react-calendar__navigation__next2-button': {
      display: 'none',
    },
    '& .react-calendar__tile': {
      padding: '.90em .5em',
    },
    '& .react-calendar__tile--active': {
      backgroundColor: 'inherit',
      borderRadius: '50%',
      position: 'relative',
    },
    '& .react-calendar__tile--active > abbr::before': {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      display: 'inline-block',
      content: '""',
      backgroundColor: theme.palette.primary.main,
      padding: '15px 15px',
      borderRadius: '50%',
      zIndex: '-1',
    },
    '& .react-calendar__tile--active:enabled': {
      backgroundColor: 'inherit',
    },
    '& .react-calendar__tile--now': {
      backgroundColor: 'inherit',
    },
    '& .react-calendar__tile > abbr': {
      position: 'relative',
      zIndex: '2',
    },
    border: 'none',
    boxShadow:
      '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
    marginBottom: theme.spacing(3),
    padding: '2px',
    '@media(min-width: 600px)': {
      padding: theme.spacing(3),
      width: '400px',
    },
  },
  activeTile: {
    color: '#fff',
    '& ::before': {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      display: 'inline-block',
      content: '""',
      backgroundColor: theme.palette.primary.main,
      padding: '15px 15px',
      borderRadius: '50%',
      zIndex: '-1',
    },
  },
}));

export default useStyles;
