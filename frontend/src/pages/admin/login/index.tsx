import { useContext, useEffect, useLayoutEffect } from 'react';
import { AuthContext } from 'services/auth';
import { useNavigate } from 'react-router-dom';
import LoginForm from 'forms/login-form';

type FormValues = { username: string; password: string };

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);

  const onSubmit = (formValues: FormValues) => {
    login(formValues);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin', { replace: true });
    }
  }, [isLoggedIn]);

  useLayoutEffect(() => {
    document.title = 'Login | Applifting Blog';
  }, []);

  return (
    <div>
      <h1>Log in</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
