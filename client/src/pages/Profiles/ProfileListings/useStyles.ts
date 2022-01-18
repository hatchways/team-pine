import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  profileCard: {
    maxWidth: '350px',
    margin: '30px',
    textAlign: 'center',
    display: 'flex',
  },
  header: {
    gutterBottom: true,
    textAlign: 'center',
  },
  profileAvatar: {
    margin: '30px',
    justifyContent: 'center',
  },
  profileName: {},
  profileTitle: {},
  profileRating: {},
  profileDescription: {},
  profileAddress: { textAlign: 'left' },
  profilePay: { fontWeight: 'bolder', textAlign: 'right' },
  button: {
    textAlign: 'center',
  },
}));

export default useStyles;
