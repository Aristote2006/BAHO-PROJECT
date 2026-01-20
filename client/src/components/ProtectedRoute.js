import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // You can return a loading spinner or similar here
    return <div>Loading...</div>;
  }

  // Temporarily bypassing authentication for testing
  return children;
  // return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;