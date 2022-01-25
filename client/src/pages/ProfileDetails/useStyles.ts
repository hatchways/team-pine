import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  coverImage: {
    position: 'relative',
    backgroundImage: 'url("https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg")',
    backgroundSize: 'cover',
    minHeight: 200,
    '& > *': {
      position: 'absolute',
      top: -35,
      left: 'calc(50% - 55px)',
      border: '5px solid ghostwhite',
    },
    '@media(min-width:600px)': {
      minHeight: 300,
      '& > *': {
        top: 220,
        left: 'calc(50% - 80px)',
      },
    },
  },
}));

export default useStyles;
