import { useForm, UseFormReturn } from 'react-hook-form';
import Form from 'features/form';

import styles from './index.module.scss';
import Spinner from 'components/spinner';

type LoginFormValues = { username: string; password: string };

type LoginFormProps = {
  onSubmit: (
    formValues: LoginFormValues,
    methods: UseFormReturn<LoginFormValues>
  ) => void;
  isLoggingIn?: boolean;
};

const LoginForm = ({ onSubmit, isLoggingIn }: LoginFormProps) => {
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

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
