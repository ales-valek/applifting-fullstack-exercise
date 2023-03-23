import { useContext, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from 'services/auth';

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname !== '/admin') return;
    if (isLoggedIn) {
      navigate('/admin/articles', { replace: true });
    } else {
      navigate('/admin/login', { replace: true });
    }
  }, [isLoggedIn, location]);

  return <Outlet />;
};

export default AdminPage;
