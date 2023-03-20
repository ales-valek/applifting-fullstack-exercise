import { useContext, useEffect, useLayoutEffect } from 'react';
import { AuthContext } from 'services/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Form from 'features/form';

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

  const { handleSubmit } = methods;

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
      <Form {...methods} onSubmit={handleSubmit(onSubmit)}>
        <Form.InputField
          label="Username"
          name="username"
          rules={{
            required: { value: true, message: 'Username is required' },
            minLength: { value: 3, message: 'Username is required' },
          }}
        />
        <Form.InputField
          label="Password"
          name="password"
          type="password"
          rules={{
            required: { value: true, message: 'Password is required' },
          }}
        />
        <Form.Button type="submit">Log in</Form.Button>
      </Form>
    </div>
  );
};

export default LoginForm;
