import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationInterface from '../../../interface/Notification';

export const useStyles = makeStyles<Theme, NotificationInterface>((theme) => ({
  root: {
    backgroundColor: ({ read }) => (read ? '#808080' : '#FFFFFF'),
    fontWeight: 700,
    textDecoration: 'none',
  },
}));
