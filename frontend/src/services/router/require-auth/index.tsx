import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'services/auth';

const RequireAuth = ({ to }: { to: string }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Outlet /> : <Navigate to={to} replace />;
};

export default RequireAuth;
