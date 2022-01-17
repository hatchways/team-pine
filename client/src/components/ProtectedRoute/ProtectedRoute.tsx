import React, { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }: RouteProps) : JSX.Element  => {
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) {
    // show progress circule until we have some value for user
    return <CircularProgress />;
  }
  if (!loggedInUser) {
    // redirect if user is not authenticated
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: routeProps.location,
          },
        }}
      />
    );
  }

  return (
    return <Route {... rest} render={(props) => (loggedInUser ? <Component {...props} /> : <Redirect to="/login" />)} />;
      {...routeProps}
      render={(props: RouteComponentProps) => {
        if (loggedInUser) {
          // render protected component on valid user
          if (component) {
            return React.createElement(component, props);
          }
          if (render) {
            return render(props);
          }
        }
      }}
    />
  );
};

export default ProtectedRoute;
