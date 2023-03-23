import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';

import { AuthContext } from 'services/auth';

import { FormValues } from './index.types';

import LoginForm from 'forms/login-form';

import styles from './index.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { isLoggedIn, login } = useContext(AuthContext);

  const onSubmit = (
    formValues: FormValues,
    { setError }: UseFormReturn<FormValues>
  ) => {
    setIsLoggingIn(true);
    login(formValues, {
      onSettled: () => {
        setIsLoggingIn(false);
      },
      onError: () => {
        setError('root.serverError', {
          type: 'custom',
          message: 'Username or password is not correct.',
        });
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
