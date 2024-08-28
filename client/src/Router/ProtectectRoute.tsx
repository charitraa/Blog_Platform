import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../useHook/Hook';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Render child components if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
