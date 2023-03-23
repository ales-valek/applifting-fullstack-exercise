import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from 'services/auth';

import { RequireAuthProps } from './index.types';

const RequireAuth = ({ to }: RequireAuthProps) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Outlet /> : <Navigate to={to} replace />;
};

export default RequireAuth;
