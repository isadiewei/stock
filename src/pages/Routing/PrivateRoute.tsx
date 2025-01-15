import { Route, Navigate } from 'react-router-dom';

// PrivateRoute component for protecting routes
const PrivateRoute = ({ element, isAuthenticated, ...rest }: any) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;