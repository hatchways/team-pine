import React, { ReactElement } from 'react';
import NotificationInterface from '../../../interface/Notification';
import moment from 'moment';
import { Divider, ListItemText, ListItem, Avatar, Typography, ListItemAvatar } from '@mui/material';
import { useStyles } from '../useStyles';
import { NavLink } from 'react-router-dom';
import markNotificationAsRead from '../../../helpers/APICalls/markNotificationAsRead';

interface Props {
  notification: NotificationInterface;
}

export default function UnreadNotification({ notification }: Props): ReactElement {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.unreadNotification}
      key={notification._id}
      component={NavLink}
      to={`/messages/${notification._id}`}
      onClick={() => markNotificationAsRead(notification._id)}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar alt="change this later to users name" src="/static/images/avatar/1.jpg" />
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
