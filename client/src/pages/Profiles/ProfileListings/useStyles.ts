import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  profileCard: {
    maxWidth: '350px',
    margin: '30px',
    textAlign: 'center',
  },
  header: {
    gutterBottom: true,
    textAlign: 'center',
  },
  profileAvatar: {
    margin: 'auto',
  },
  profileName: {},
  profileTitle: {},
  profileRating: {},
  profileDescription: {},
  profileAddress: { textAlign: 'left' },
  profilePay: { fontWeight: 'bolder', textAlign: 'right' },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    background: 'white',
    transition: 'color 120ms ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
