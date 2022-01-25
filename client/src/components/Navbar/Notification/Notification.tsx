import React, { ReactElement, useState, useEffect } from 'react';
import NotificationInterface from '../../../interface/Notification';
import moment from 'moment';
import { Divider, ListItemText, ListItem, Avatar, Typography, ListItemAvatar } from '@mui/material';
import { useStyles } from './useStyles';
import markNotificationAsRead from '../../../helpers/APICalls/markNotificationAsRead';
import { useHistory } from 'react-router-dom';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Props {
  notification: NotificationInterface;
}

export default function Notification({ notification }: Props): ReactElement {
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles(notification);
  const history = useHistory();

  const handleClick = async () => {
    markNotificationAsRead(notification._id).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
      } else if (data.success) {
        setTimeout(() => {
          if (data.success.notification.type === 'message') {
            history.push('/messages');
          } else if (data.success.notification.type === 'request') {
            history.push('/bookings');
          } else if (data.success.notification.type === 'payment') history.push('/messages');
        }, 1000);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <ListItem className={classes.root} key={notification._id} alignItems="flex-start" onClick={() => handleClick()}>
      <ListItemAvatar>
        <Avatar alt="change this later to users name" />
      </ListItemAvatar>
      <ListItemText
        primary={`${notification.title}`}
        secondary={
          <React.Fragment>
            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
              {`${notification.description}`}
              <Divider />
              {`${moment(notification.updatedAt).format('MM-DD-YYYY')}`}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
