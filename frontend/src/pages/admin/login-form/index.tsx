import { useContext, useEffect, useLayoutEffect } from 'react';
import { AuthContext } from 'services/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormValues = { username: string; password: string };

const LoginForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);

  const methods = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { handleSubmit, register } = methods;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="text" {...register('username')} />
        <label>Password</label>
        <input type="password" {...register('password')} />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
