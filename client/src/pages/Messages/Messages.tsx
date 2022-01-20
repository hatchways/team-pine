import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../context/useAuthContext';
import ConversationInterface from '../../interface/Conversation';
import getConversations from '../../helpers/APICalls/Messages/getConversations';
import { useSnackBar } from '../../context/useSnackbarContext';

const useStyles = makeStyles({
  image: {
    width: '100%',
  },
});

type Conversations = ConversationInterface[];

export default function MessagesDashboard(): JSX.Element {
  const classes = useStyles();

  const [conversations, setConversations] = useState<Conversations>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();

  const { loggedInUser } = useAuth();

  useEffect(() => {
    setSubmitting(true);

    getConversations().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        const conversations = data.success.conversations;
        console.log(conversations);

        setConversations(conversations);

        setSubmitting(false);
      } else {
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  }, []);

  return (
    <PageContainer>
      <Box sx={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>{isSubmitting ? 'loading' : 'done'}</Box>
    </PageContainer>
  );
}
