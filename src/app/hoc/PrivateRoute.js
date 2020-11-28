import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...privateRouteProps }) => {
  return (
    <Route
      {...privateRouteProps}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute;
