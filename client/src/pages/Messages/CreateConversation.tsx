import React, { useState } from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import createConversation from '../../helpers/APICalls/Messages/createConversation';
import { useSnackBar } from '../../context/useSnackbarContext';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

export default function CreateConversation() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();
  const [message, setMessage] = useState<string>('');
  const [receiver, setReceiver] = useState<string>('');

  const handleSubmit = (receiver: string, description: string) => {
    setSubmitting(true);
    createConversation(receiver, description).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage('Message sent!');
        setSubmitting(false);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'message') {
      setMessage(event.target.value);
    } else {
      setReceiver(event.target.value);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: 300,
      }}
      onSubmit={() => handleSubmit(receiver, message)}
    >
      {' '}
      {isSubmitting ? (
        <CircularProgress />
      ) : (
        <Stack spacing={3}>
          <TextField sx={{ minWidth: '200px' }} id="message" label="message" value={message} onChange={handleChange} />

          <TextField sx={{ minWidth: '50px' }} id="receiver" label="user" value={receiver} onChange={handleChange} />

          <Button
            onClick={() => handleSubmit(receiver, message)}
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              width: 100,
              margin: 'auto',
            }}
          >
            Send
          </Button>
        </Stack>
      )}
    </Box>
  );
}
