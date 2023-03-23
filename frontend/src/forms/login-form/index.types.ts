import { UseFormReturn } from 'react-hook-form';

export type LoginFormValues = { username: string; password: string };

export type LoginFormProps = {
  onSubmit: (
    formValues: LoginFormValues,
    methods: UseFormReturn<LoginFormValues>
  ) => void;
  isLoggingIn?: boolean;
};
