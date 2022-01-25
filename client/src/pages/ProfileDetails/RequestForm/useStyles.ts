import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  requestForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: `${theme.spacing(5)} auto`,
  },
}));

export default useStyles;
