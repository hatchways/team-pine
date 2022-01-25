import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Menu, List, Badge, Button } from '@mui/material';
import { useStyles } from './useStyles';
import getNotifications from '../../helpers/APICalls/getNotifications';
import NotificationInterface from '../../interface/Notification';
import { useSnackBar } from '../../context/useSnackbarContext';
import CircularProgress from '@mui/material/CircularProgress';
import Notification from './Notification/Notification';

type Notifications = NotificationInterface[];

export const NotificationMenu: React.FC = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState<Notifications>([]);
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setSubmitting] = useState(false);

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
    setSubmitting(true);

    getNotifications().then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        const notifications = data.success.notifications;
        setNotifications(notifications);

        const unreadNotifications = notifications.filter(
          (notification: NotificationInterface) => notification.read !== true,
        );

        setUnreadNotificationCount(unreadNotifications.length);
        setSubmitting(false);
      } else {
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  }, [updateSnackBarMessage]);

  return (
    <Grid xs={2} item>
      {isSubmitting ? (
        <CircularProgress style={{ color: 'white' }} />
      ) : (
        <Button
          id="notification-menu"
          aria-label="Notification Menu"
          aria-controls="notifications"
          arais-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
          className={classes.navbarItem}
        >
          {'Notifications'}
          <Badge
            invisible={unreadNotificationCount !== 0 ? false : true}
            badgeContent={unreadNotificationCount}
            className={classes.badge}
          ></Badge>
        </Button>
      )}

      <Menu
        id="notification-menu"
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
          {notifications.map((notification) => (
            <Fragment key={notification._id}>
              <Notification notification={notification} />
            </Fragment>
          ))}
        </List>
      </Menu>
    </Grid>
  );
};
