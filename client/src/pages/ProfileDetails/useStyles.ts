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
  listImage: {
    width: 125,
    height: 125,
    borderRadius: 10,
    marginRight: 20,
  },
  reviewsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: `${theme.spacing(2)} ${theme.spacing(2)}`,
    alignItems: 'flex-start',
  },
  review: {
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  },
}));

export default useStyles;
