import './App.css';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Bookings from './pages/Bookings/Bookings';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';
import SendPasswordReset from './pages/SendPasswordReset/SendPasswordReset';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { Navbar } from './components/Navbar/Navbar';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import ProfileListing from './pages/Profiles/ProfileListings/ProfileListing';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <CssBaseline />
              <Navbar />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute path="/bookings" component={Bookings} />
                <Route path="/profile/settings" component={Settings} />
                <Route path="/profile/list-profiles/:availability/:location/" component={ProfileListing} />
                <ProtectedRoute path="/profile/:profileId" component={ProfileDetails} />
                <Route exact path="/profile-listings/" component={ProfileListing} />
                <Route path="/send-password-reset" component={SendPasswordReset} />
                <Route path="/password-reset/:email/:token" component={PasswordReset} />
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
