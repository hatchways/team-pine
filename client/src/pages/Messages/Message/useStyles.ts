import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../../context/useAuthContext';
import { MessageInterface } from '../../../interface/Conversation';
import { User } from '../../../interface/User';

export const useStyles = makeStyles((sender: boolean) => ({
  root: {
    '& .MuiListItem-root': {
      justifyContent: (sender) => (sender ? 'flex-start' : 'flex-end'),
      backgroundColor: (sender) => (sender ? 'white' : '#D3D3D3'),
      fontWeight: 700,
      textDecoration: 'none',
      borderRadius: '25px',
    },
  },
}));
