import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { LoginFormProps, LoginFormValues } from './index.types';

import { Message } from 'components/form';
import Form from 'features/form';
import Spinner from 'components/spinner';

import styles from './index.module.scss';

const LoginForm = ({ onSubmit, isLoggingIn, isLoginError }: LoginFormProps) => {
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
  } = methods;

  const [username, password] = watch(['username', 'password']);

  useEffect(() => {
    clearErrors('root.serverError');
  }, [username, password]);

  return (
    <Form
      {...methods}
      onSubmit={handleSubmit((formValues) => onSubmit(formValues, methods))}
    >
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
      {errors?.root?.serverError && (
        <Message variant="error" className={styles['login-error-message']}>
          {errors?.root?.serverError?.message}
        </Message>
      )}
      <Form.Button
        disabled={isLoggingIn}
        className={styles['submit-button']}
        type="submit"
      >
        {isLoggingIn ? (
          <Spinner className={styles['submit-spinner']} size="xs" />
        ) : (
          'Log in'
        )}
      </Form.Button>
    </Form>
  );
};

export default LoginForm;
