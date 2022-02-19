import { useEffect, useState, useRef } from 'react';
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
  Button,
  TextField,
  Modal,
} from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useAuth } from '../../context/useAuthContext';
import ConversationInterface from '../../interface/Conversation';
import getConversations from '../../helpers/APICalls/Messages/getConversations';
import { useSnackBar } from '../../context/useSnackbarContext';
import moment from 'moment';
import sendMessage from '../../helpers/APICalls/Messages/sendMessage';
import CircularProgress from '@mui/material/CircularProgress';
import Message from './Message/Message';
import SendIcon from '@mui/icons-material/Send';
import CreateConversation from './CreateConversation';
import useStyles from './useStyles';

type Conversations = ConversationInterface[];

export default function MessagesDashboard(): JSX.Element {
  const classes = useStyles();

  const [conversations, setConversations] = useState<Conversations>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();
  const [chatbox, setChatBox] = useState<number>(0);
  const { loggedInUser } = useAuth();
  const [message, setMessage] = useState<string>('');
  const scrollRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [chatbox]);

  const handleSubmit = (description: string, conversationId: string) => {
    setSubmitting(true);
    sendMessage(description, conversationId).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        console.log(data.success);
        updateSnackBarMessage('Sent!');
        getConversations().then((data) => {
          if (data.error) {
            updateSnackBarMessage(data.error.message);
          } else if (data.success) {
            const conversations = data.success.conversations;

            setConversations(conversations);

            setSubmitting(false);
          } else {
            console.error({ data });
            setSubmitting(false);
            updateSnackBarMessage('An unexpected error occurred. Please try again');
          }
        });
        setSubmitting(false);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  useEffect(() => {
    setSubmitting(true);

    getConversations().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        const conversations = data.success.conversations;

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
              Inbox Messages
            </Typography>
            <Button onClick={handleOpen}>Start new conversation</Button>
          </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.inboxSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <Divider />
            <List>
              {conversations.length &&
                conversations.map((conversation, index) => (
                  <ListItem button onClick={() => setChatBox(index)} key={conversation._id}>
                    <ListItemIcon>
                      <Avatar
                        alt={
                          conversation.participants[0].name === loggedInUser?.name
                            ? `${conversation.participants[1].name}s profile picture`
                            : `${conversation.participants[0].name}s profile picture`
                        }
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        conversation.participants[0].name === loggedInUser?.name
                          ? `${conversation.participants[1].name}`
                          : `${conversation.participants[0].name}`
                      }
                      secondary={conversation.messages[conversation.messages.length - 1].description}
                    >
                      {conversation.participants[0].name === loggedInUser?.name
                        ? `${conversation.participants[1].name}`
                        : `${conversation.participants[0].name}`}
                    </ListItemText>
                    <ListItemText
                      sx={{ textAlign: 'right' }}
                      secondary={`${moment(conversation.updatedAt).calendar()}`}
                    ></ListItemText>
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={9}>
            {!isSubmitting && conversations[chatbox] && (
              <Grid sx={{ padding: '30px' }} container>
                <Grid item>
                  <Avatar
                    alt={
                      conversations[chatbox].participants[0].name === loggedInUser?.name
                        ? `${conversations[chatbox].participants[1].name}s profile picture`
                        : `${conversations[chatbox].participants[0].name}s profile picture`
                    }
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h4" className="header-message">
                    {conversations[chatbox].participants[0].name === loggedInUser?.name
                      ? `${conversations[chatbox].participants[1].name}`
                      : `${conversations[chatbox].participants[0].name}`}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <List className={classes.messageSection}>
              {isSubmitting ? (
                <CircularProgress style={{ color: 'white' }} />
              ) : (
                conversations[chatbox] &&
                conversations[chatbox].messages.map((message, index) => (
                  <ListItem ref={scrollRef} key={message._id}>
                    <Message message={message} />
                  </ListItem>
                ))
              )}
            </List>
            <Divider />

            <Box
              component="form"
              sx={{
                width: 500,
              }}
              onSubmit={() => handleSubmit(message, conversations[chatbox]._id)}
            >
              <Grid container sx={{ padding: '20px' }}>
                <Grid item xs={11}>
                  <TextField
                    sx={{ minWidth: '400px' }}
                    id="outlined-name"
                    label="message"
                    value={message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    onClick={() => handleSubmit(message, conversations[chatbox]._id)}
                    color="primary"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: '24',
              p: 4,
            }}
            className={classes.modal}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Start a new conversation
            </Typography>
            <CreateConversation />
          </Box>
        </Modal>
      </Box>
    </PageContainer>
  );
}
