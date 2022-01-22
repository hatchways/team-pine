import React from 'react';
import { useAuth } from '../../context/useAuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}
const ProtectedRoute = ({ component: Component, ...rest }: ProtectedRouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) {
    return <CircularProgress />;
  }

  return <Route {...rest} render={(props) => (loggedInUser ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default ProtectedRoute;
