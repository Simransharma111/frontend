import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check for token
  const location = useLocation(); // Get the current location

  console.log('Is Authenticated:', isAuthenticated); // Debugging

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
