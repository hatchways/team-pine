import React, { useState, useEffect } from 'react';
import {
  Divider,
  Grid,
  IconButton,
  ListItemText,
  Menu,
  ListItem,
  List,
  Avatar,
  Typography,
  ListItemAvatar,
  Badge,
  Button,
} from '@mui/material';
import { useStyles } from './useStyles';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import getNotifications from '../../helpers/APICalls/getNotifications';

interface Notification {
  user: string;
  type: string;
  title: string;
  description: string;
  read: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const Notification: React.FC = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([] as any[]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getNotifications().then((res) => {
      const notifications = res.success.notifications;
      setNotifications(notifications);
      console.log(notifications);

      const unreadNotifications = notifications.filter((notification: Notification) => notification.read !== true);

      setUnreadNotificationCount(unreadNotifications.length);
    });
  }, []);

  return (
    <Grid xs={2} item>
      <Button
        id="notification-menu"
        aria-label="Notification Menu"
        aria-controls="notifications"
        arais-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
        className={classes.navbarItem}
      >
        {unreadNotificationCount != 0 ? (
          <Badge badgeContent={unreadNotificationCount} color="secondary">
            {'Notifications'}
          </Badge>
        ) : (
          'Notifications'
        )}
      </Button>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <List sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}>
          {notifications.map((notification, index) => (
            <ListItem
              className={classes.navbarItem}
              // sx={{ bgcolor: notification.read ? 'text.disabled' : 'background.paper' }}
              key={notification._id}
              component={NavLink}
              to={`/messages/${notification._id}`}
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
                      {`${moment(notification.updatedAt).format('MM-DD-YYYY HH:mm')}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Menu>
    </Grid>
  );
};
