import { cloneElement } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Box, CircularProgress, Grid, Link } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import { makeStyles } from '@mui/styles';
import SettingsWrapper from '../../components/SettingsWrapper/SettingsWrapper';
import EditProfile from './EditProfile/EditProfile';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import ProfilePhoto from './ProfilePhoto/ProfilePhoto';
import Payment from './Payment/Payment';
import Availability from './Availability/Availability';

const settingsMenu = [
  {
    name: 'Edit profile',
    to: '/profile/settings/edit-profile',
    component: <EditProfile header="Edit Profile" />,
  },
  {
    name: 'Profile photo',
    to: '/profile/settings/profile-photo',
    component: <ProfilePhoto header="Profile Photo" />,
  },
  {
    name: 'Availability',
    to: '/profile/settings/availability',
    component: <Availability header="Availability" />,
  },
  {
    name: 'Payment methods',
    to: '/profile/settings/payment-methods',
    component: <Payment header="Payment Methods" />,
  },
];

const useStyles = makeStyles({
  activeLink: {
    fontWeight: 700,
    color: '#000',
  },
});

export default function Settings(): JSX.Element {
  const { loggedInUser, loggedInUserProfile } = useAuth();
  const classes = useStyles();

  if (loggedInUserProfile === undefined) {
    return <CircularProgress />;
  }

  return (
    <PageContainer>
      <Grid sx={{ width: '90%', margin: '0 auto' }} container>
        <Grid xs={12} md={3} item>
          {settingsMenu.map((item) => (
            <Box
              sx={{
                margin: '20px 0',
              }}
              key={item.name}
            >
              <Link
                sx={{
                  fontSize: 20,
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 100ms ease-in-out',
                  '&:hover': {
                    color: '#000',
                  },
                }}
                component={NavLink}
                activeClassName={classes.activeLink}
                to={item.to}
              >
                {item.name}
              </Link>
            </Box>
          ))}
        </Grid>
        <Grid xs={12} md={9} item>
          <Switch>
            <Route exact path="/profile/settings">
              <Redirect to="/profile/settings/edit-profile" />
            </Route>
            <SettingsWrapper>
              {settingsMenu.map((item) => (
                <Route
                  key={item.name}
                  path={item.to}
                  render={(props) =>
                    cloneElement(item.component, {
                      ...props,
                      currentUser: loggedInUser,
                      currentProfile: loggedInUserProfile,
                    })
                  }
                />
              ))}
            </SettingsWrapper>
            <Route path="*">
              <Redirect to="/not-found" />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
