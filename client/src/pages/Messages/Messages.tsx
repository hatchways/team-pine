import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
  Paper,
  Fab,
  TextField,
} from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import { makeStyles } from '@mui/styles';
import { useAuth } from '../../context/useAuthContext';
import ConversationInterface from '../../interface/Conversation';
import getConversations from '../../helpers/APICalls/Messages/getConversations';
import { useSnackBar } from '../../context/useSnackbarContext';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  inboxSection: {
    width: '100%',
    height: '80vh',
  },
  messageSection: {
    height: '70vh',
    overflowY: 'auto',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
});
type Conversations = ConversationInterface[];

export default function MessagesDashboard(): JSX.Element {
  const classes = useStyles();
  const [conversations, setConversations] = useState<Conversations>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();
  const [chatbox, setChatBox] = useState<number>(0);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    setSubmitting(true);

    getConversations().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        const conversations = data.success.conversations;

        setChatBox(conversations.length);

        setConversations(conversations);

        setSubmitting(false);
      } else {
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  }, [updateSnackBarMessage]);

  return (
    <PageContainer>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" className="header-message">
              Inbox
            </Typography>
          </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.inboxSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <Divider />
            <List>
              {conversations.map((conversation, index) => (
                <ListItem button onClick={() => setChatBox(index)} key={conversation._id}>
                  <ListItemIcon>
                    <Avatar
                      alt={
                        conversation.participants[0].name === loggedInUser?.name
                          ? `${conversation.participants[0].name}s profile picture`
                          : `${conversation.participants[1].name}s profile picture`
                      }
                      src="https://material-ui.com/static/images/avatar/1.jpg"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      conversation.participants[0].name === loggedInUser?.name
                        ? `${conversation.participants[0].name}`
                        : `${conversation.participants[1].name}`
                    }
                  >
                    {conversation.participants[0].name === loggedInUser?.name
                      ? `${conversation.participants[0].name}`
                      : `${conversation.participants[1].name}`}
                  </ListItemText>
                  <ListItemText secondary={`${conversation.updatedAt}`}></ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={9}>
            <List className={classes.messageSection}>
              {!isSubmitting &&
                conversations[chatbox] &&
                conversations[chatbox].messages.map((message, index) => (
                  <ListItem key={message._id}>
                    <Grid container>
                      <Grid alignItems="right" item xs={12}>
                        <ListItemText primary={message.description}></ListItemText>
                      </Grid>
                      <Grid alignItems="right" item xs={12}>
                        <ListItemText secondary={moment(message.updatedAt).calendar()}></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
              <Grid item xs={11}>
                <TextField id="send-message" label="Reply" fullWidth />
              </Grid>
              <Grid xs={1}>
                <Fab color="primary" aria-label="add">
                  Send
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
