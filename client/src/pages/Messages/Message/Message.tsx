import React, { ReactElement } from 'react';
import { MessageInterface } from '../../../interface/Conversation';
import moment from 'moment';
import { Grid, ListItemText, ListItem, Avatar, Typography, ListItemAvatar, List } from '@mui/material';
import { useStyles } from './useStyles';
import { useAuth } from '../../../context/useAuthContext';

interface Props {
  message: MessageInterface;
}

export default function Message({ message }: Props): ReactElement {
  const { loggedInUser } = useAuth();

  const sender = message.sender.name === loggedInUser?.name ? true : false;

  const classes = useStyles(sender);

  return (
    <Grid container>
      <List>
        <Grid className={classes.root} item xs={12}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="profile picture" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={message.description}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    {moment(message.updatedAt).calendar()}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Grid>
      </List>
    </Grid>
  );
}
