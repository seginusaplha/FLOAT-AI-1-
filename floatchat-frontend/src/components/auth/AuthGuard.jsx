import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  // TODO: Replace with actual auth state from store
  const isAuthenticated = true; // Temporary for development
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default AuthGuard;