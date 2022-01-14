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
} from '@mui/material';
import { FetchOptions } from '../../interface/FetchOptions';
import { useStyles } from './useStyles';
import { NavLink } from 'react-router-dom';

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
    const getData = async () => {
      const fetchOptions: FetchOptions = {
        method: 'GET',
        credentials: 'include',
      };
      const fetchdata = await fetch(`/notification/all`, fetchOptions)
        .then((res) => res.json())
        .then((res) => {
          const notifications = res.success.notifications;
          setNotifications(notifications);
          let count = 0;

          for (const notification of notifications) {
            if (!notification.read) {
              count++;
            }
          }
          setUnreadNotificationCount(count);
        })
        .catch(() => ({
          error: { message: 'Unable to connect to server. Please try again' },
        }));
    };
    getData();
  }, []);

  return (
    <Grid xs={2} item>
      <Badge badgeContent={unreadNotificationCount} color={unreadNotificationCount > 0 ? 'success' : 'error'}>
        <IconButton
          aria-label="Notification Menu"
          aria-controls="menu-navbar"
          arais-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
          className={classes.navbarItem}
        >
          {'Notifications'}
        </IconButton>
      </Badge>

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
              sx={{ bgcolor: notification.read ? 'text.disabled' : 'background.paper' }}
              key={index}
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
                      {`${notification.updatedAt}`}
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
