import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import dogs from '../../images/landing/dogs.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  dogImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  form: {
    width: '50%',
    marginLeft: theme.spacing(10),
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 10,
  },
  submit: {
    padding: 10,
    display: 'flex',
    alignContent: 'flex-start',
    width: 200,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    width: '100%', // Fix IE 11 issue.
    textAlign: 'left',
    padding: 20,
  },
}));

export default useStyles;
