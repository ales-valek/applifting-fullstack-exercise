import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthContext } from 'services/auth';
import { useNavigate } from 'react-router-dom';
import LoginForm from 'forms/login-form';

import styles from './index.module.scss';

type FormValues = { username: string; password: string };

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { isLoggedIn, login } = useContext(AuthContext);

  const onSubmit = (formValues: FormValues) => {
    setIsLoggingIn(true);
    login(formValues, {
      onSettled: () => {
        setIsLoggingIn(false);
      },
    });
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
    <div className={styles['wrapper']}>
      <h1 className={styles['heading']}>Log in</h1>
      <LoginForm onSubmit={onSubmit} isLoggingIn={isLoggingIn} />
    </div>
  );
};

export default LoginPage;