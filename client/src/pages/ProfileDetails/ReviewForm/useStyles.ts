import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  reviewForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: `${theme.spacing(1)} auto`,
  },
}));

export default useStyles;
